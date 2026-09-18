import { Resend } from "resend";
import { siteGegevens } from "@/components/layout/Footer";

// Initialize Resend only if the API key is provided
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendAdminNotification({ subject, content }) {
  if (!resend) {
    console.log("No RESEND_API_KEY found, skipping email notification. Content was:", subject);
    return;
  }

  try {
    const { error } = await resend.emails.send({
      // We use a default from address, but you can configure a custom domain in Resend later
      from: "NEM Motors Notificaties <onboarding@resend.dev>",
      to: "semihozyurek25@gmail.com",
      subject: subject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 8px;">
          <h2 style="color: #0a0a0a; margin-top: 0;">Nieuwe aanvraag via website</h2>
          <p style="color: #525252; font-size: 14px;">Je hebt een nieuwe aanvraag ontvangen. Hieronder staan de details:</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 6px; margin: 20px 0; color: #171717;">
            ${content}
          </div>
          <p style="color: #525252; font-size: 12px; margin-bottom: 0;">Log in op je <a href="${process.env.NEXT_PUBLIC_SITE_URL}/beheer/aanvragen" style="color: #000;">beheerpaneel</a> om deze te bekijken of af te handelen.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Fout bij versturen email:", error);
    }
  } catch (error) {
    console.error("Onverwachte fout bij versturen email:", error);
  }
}

