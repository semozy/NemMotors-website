import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase";
import { sendAdminNotification } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Te veel aanvragen. Probeer het later opnieuw." }, { status: 429 });
    }

    const data = await request.json();
    
    if (data.bot_field) {
      // Spam honeypot filled, silently accept
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const { name, email, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Alle velden zijn verplicht." }, { status: 400 });
    }

    const supabase = createAdminSupabaseClient();
    const { error } = await supabase
      .from("contact_requests")
      .insert({ name, email, message });

    if (error) {
      console.error("Contact request error:", error);
      return NextResponse.json({ error: "Er is een fout opgetreden bij het verzenden." }, { status: 500 });
    }

    await sendAdminNotification({
      subject: `Contactaanvraag van ${name}`,
      replyTo: email,
      content: `
        <strong>Naam:</strong> ${name}<br>
        <strong>E-mailadres:</strong> ${email}<br><br>
        <strong>Bericht:</strong><br>
        ${message.replace(/\n/g, "<br>")}
      `
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Onbekende fout." }, { status: 500 });
  }
}

