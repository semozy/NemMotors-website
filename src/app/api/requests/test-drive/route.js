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
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const { vehicle_id, name, email, phone, date, time, message } = data;

    if (!vehicle_id || !name || !email || !phone || !date || !time) {
      return NextResponse.json({ error: "Vul de verplichte velden in." }, { status: 400 });
    }

    const supabase = createAdminSupabaseClient();

    // Dubbele boekingen voorkomen (zelfde wagen, zelfde datum en tijd, niet geannuleerd)
    const { data: existing } = await supabase
      .from("test_drive_requests")
      .select("id")
      .eq("vehicle_id", vehicle_id)
      .eq("date", date)
      .eq("time", time)
      .neq("status", "geannuleerd")
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: "Dit tijdstip is helaas al bezet voor deze wagen. Kies een ander moment." }, { status: 409 });
    }

    const { error } = await supabase
      .from("test_drive_requests")
      .insert({ vehicle_id, name, email, phone, date, time, message });

    if (error) {
      console.error("Test drive request error:", error);
      return NextResponse.json({ error: "Er is een fout opgetreden bij het verzenden." }, { status: 500 });
    }
    
    // We fetch the car name for the email
    const { data: vehicle } = await supabase.from("vehicles").select("brand, model, trim").eq("id", vehicle_id).single();
    const carName = vehicle ? `${vehicle.brand} ${vehicle.model}` : `Voertuig #${vehicle_id}`;

    // Bericht naar NEM Motors (Admin)
    await sendAdminNotification({
      subject: `Nieuwe proefrit aanvraag: ${name} (${carName})`,
      content: `
        <strong>Naam:</strong> ${name}<br>
        <strong>E-mailadres:</strong> ${email}<br>
        <strong>Telefoon:</strong> ${phone}<br><br>
        <strong>Voertuig:</strong> ${carName}<br>
        <strong>Voorkeursmoment:</strong> ${date} om ${time}<br><br>
        <strong>Bericht:</strong><br>
        ${message ? message.replace(/\n/g, "<br>") : "Geen opmerking"}
      `
    });

    // Bevestigingsmail naar klant (Customer)
    const { Resend } = await import("resend");
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "NEM Motors <onboarding@resend.dev>", // TODO: Verander naar eigen domein
        to: email,
        subject: "Bevestiging proefrit aanvraag - NEM Motors",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Beste ${name},</h2>
            <p>Bedankt voor uw interesse in de <strong>${carName}</strong>.</p>
            <p>We hebben uw voorkeursmoment voor een proefrit goed ontvangen:</p>
            <ul>
              <li><strong>Datum:</strong> ${date}</li>
              <li><strong>Tijdstip:</strong> ${time}</li>
            </ul>
            <p><strong>Let op:</strong> Dit is een voorkeursmoment. Wij nemen zo snel mogelijk contact met u op (via telefoon of e-mail) om deze afspraak definitief te bevestigen.</p>
            <br/>
            <p>Met vriendelijke groet,</p>
            <p><strong>NEM Motors</strong><br>Ambachtslaan 5/10, 3665 As</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Onbekende fout." }, { status: 500 });
  }
}

