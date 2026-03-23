import "dotenv/config";
import { getCommits } from "./github.js";
import { cleanCommits } from "./utils.js";
import { generateChangelog } from "./ai.js";
import { sendEmail } from "./email.js";

async function main() {
    const commits = await getCommits();
    const cleaned = cleanCommits(commits);

    const changelog = await generateChangelog(cleaned);

    console.log(changelog);

    await sendEmail(changelog);
}

main();