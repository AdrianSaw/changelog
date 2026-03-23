import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(content) {
    await resend.emails.send({
        from: "onboarding@resend.dev", // testowy sender
        to: process.env.EMAIL_USER,   // Twój email
        subject: "📊 AI Changelog",
        html: `
  <h2>📊 Changelog</h2>
  <div style="font-family: Arial;">
    ${content.replace(/\n/g, "<br>")}
  </div>
`
    });
}