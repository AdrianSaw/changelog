import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function generateChangelog(commits) {
    const formatted = commits.map(c => `
Commit:
${c.message}

Files:
${c.files.join("\n")}
`).join("\n---\n");

    const prompt = `
You are a product manager writing release notes for end users (non-technical audience).

Your goal is to explain what changed in a simple, clear, and user-friendly way.

CATEGORIES:
- Features: new things users can do
- Fixes: bugs that were resolved
- Improvements: enhancements that make the app better

RULES:
- DO NOT use technical jargon (no file names, no code terms)
- Focus on user impact, not implementation
- Rewrite everything in plain language
- Merge similar changes into one point
- Keep it short and easy to read
- If something is internal only, skip it

TONE:
- Friendly and clear
- Like a product update from a SaaS company

OUTPUT FORMAT:

## 🚀 New Features
- ...

## 🐛 Bug Fixes
- ...

## ✨ Improvements
- ...

If a section is empty, write:
- No noticeable changes for users

DATA:
${formatted}
`;

    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
}