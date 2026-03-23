import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(content, repo, repoName) {
    const displayName = repoName || repo;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: process.env.EMAIL_USER,
        subject: `📊 ${displayName} — Changelog`,
        html: `
      <h2>📊 ${displayName}</h2>
      <p>
        <strong>Repository:</strong>
        <a href="https://github.com/${repo}">
          ${repo}
        </a>
      </p>
      <hr/>
      <div style="font-family: Arial;">
        ${content.replace(/\n/g, "<br>")}
      </div>
    `,
    });
}