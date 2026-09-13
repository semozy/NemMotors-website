import { NextResponse } from "next/server";

const RESEND_URL = "https://api.resend.com/emails";
const MAX_REQUESTS = 5;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_TOTAL_SIZE = 20 * 1024 * 1024;
const ALLOWED_FILE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const requests = new Map<string, number[]>();

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (requests.get(ip) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) return true;
  requests.set(ip, [...recent, now]);
  return false;
}

async function sendEmail(subject: string, fields: Record<string, string>, attachments: { filename: string; content: string }[] = []) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!apiKey || !to || !from) throw new Error("CONTACT_NOT_CONFIGURED");

  const rows = Object.entries(fields).filter(([, value]) => value.trim()).map(([label, value]) => `<tr><th style="text-align:left;padding:8px;border-bottom:1px solid #ddd">${escapeHtml(label)}</th><td style="padding:8px;border-bottom:1px solid #ddd;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join("");
  const response = await fetch(RESEND_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject, html: `<h1>${escapeHtml(subject)}</h1><table style="border-collapse:collapse">${rows}</table>`, attachments }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error("EMAIL_PROVIDER_ERROR");
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) return NextResponse.json({ error: "Te veel aanvragen. Probeer het over enkele minuten opnieuw." }, { status: 429 });

  try {
    const fields: Record<string, string> = {};
    const attachments: { filename: string; content: string }[] = [];
    if ((request.headers.get("content-type") ?? "").includes("multipart/form-data")) {
      const formData = await request.formData();
      let totalSize = 0;
      for (const [key, value] of formData.entries()) {
        if (value instanceof File && value.size > 0) {
          if (!ALLOWED_FILE_TYPES.has(value.type) || value.size > MAX_FILE_SIZE) return NextResponse.json({ error: "Gebruik JPG, PNG of WebP-afbeeldingen van maximaal 5 MB per bestand." }, { status: 400 });
          totalSize += value.size;
          if (totalSize > MAX_TOTAL_SIZE) return NextResponse.json({ error: "De foto's mogen samen maximaal 20 MB zijn." }, { status: 400 });
          attachments.push({ filename: value.name, content: Buffer.from(await value.arrayBuffer()).toString("base64") });
        } else if (typeof value === "string") fields[key] = value.trim().slice(0, 4000);
      }
    } else {
      const body = (await request.json()) as Record<string, unknown>;
      for (const [key, value] of Object.entries(body)) if (typeof value === "string") fields[key] = value.trim().slice(0, 4000);
    }

    if (fields.website) return NextResponse.json({ ok: true });
    if (!fields.naam || !fields.email || !fields.telefoon) return NextResponse.json({ error: "Naam, e-mailadres en telefoonnummer zijn verplicht." }, { status: 400 });
    const subject = fields.type === "waardebepaling" ? "Nieuwe aanvraag voor waardebepaling" : `Nieuw contactbericht: ${fields.onderwerp || "Algemene vraag"}`;
    await sendEmail(subject, fields, attachments);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message === "CONTACT_NOT_CONFIGURED") return NextResponse.json({ error: "De berichtendienst is nog niet geconfigureerd. Neem voorlopig telefonisch of via WhatsApp contact op." }, { status: 503 });
    console.error("Contact request failed", message);
    return NextResponse.json({ error: "Verzenden is mislukt. Probeer opnieuw of neem telefonisch contact op." }, { status: 502 });
  }
}
