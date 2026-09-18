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

    const formData = await request.formData();
    
    if (formData.get("bot_field")) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const brand = formData.get("brand");
    const model = formData.get("model");
    const registration = formData.get("registration");
    const mileageStr = formData.get("mileage");
    const price = formData.get("price") || null;
    const message = formData.get("message") || "";
    
    // registration is 'MM / JJJJ' or 'YYYY', let's just parse the last 4 digits as year
    const yearMatch = registration ? registration.match(/\d{4}$/) : null;
    const year = yearMatch ? Number(yearMatch[0]) : new Date().getFullYear();
    const mileage = mileageStr ? Number(mileageStr.replace(/[^0-9]/g, "")) : 0;

    if (!name || !email || !phone || !brand || !model || !registration || !mileageStr) {
      return NextResponse.json({ error: "Vul alle verplichte velden in." }, { status: 400 });
    }

    const supabase = createAdminSupabaseClient();
    const { data: requestData, error: requestError } = await supabase
      .from("sell_requests")
      .insert({
        name, email, phone, brand, model,
        year: Number(year),
        mileage: Number(mileage),
        price: price ? Number(price) : null,
        message
      })
      .select()
      .single();

    if (requestError) {
      console.error("Sell request error:", requestError);
      return NextResponse.json({ error: "Er is een fout opgetreden." }, { status: 500 });
    }

    const files = formData.getAll("files");
    for (const file of files) {
      if (file && file.size > 0) {
        const ext = file.name.split(".").pop();
        const filename = `${requestData.id}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("sell-images")
          .upload(filename, file, { contentType: file.type });
        
        if (!uploadError && uploadData) {
          const { data: publicUrlData } = supabase.storage
            .from("sell-images")
            .getPublicUrl(uploadData.path);
          
          await supabase.from("sell_request_images").insert({
            sell_request_id: requestData.id,
            storage_path: uploadData.path,
            public_url: publicUrlData.publicUrl
          });
        }
      }
    }
    
    await sendAdminNotification({
      subject: `Verkoopaanvraag van ${name} (${brand} ${model})`,
      content: `
        <strong>Naam:</strong> ${name}<br>
        <strong>E-mailadres:</strong> ${email}<br>
        <strong>Telefoon:</strong> ${phone}<br><br>
        <strong>Inruilwagen:</strong> ${brand} ${model}<br>
        <strong>Bouwjaar:</strong> ${year}<br>
        <strong>Kilometerstand:</strong> ${mileage.toLocaleString("nl-BE")} km<br>
        <strong>Gewenste prijs:</strong> ${price ? `€ ${price.toLocaleString("nl-BE")}` : "Niet opgegeven"}<br><br>
        <strong>Opmerking:</strong><br>
        ${message ? message.replace(/\n/g, "<br>") : "Geen"}
      `
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Onbekende fout bij het uploaden." }, { status: 500 });
  }
}
