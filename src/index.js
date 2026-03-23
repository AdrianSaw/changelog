import "dotenv/config";
import { getCommits } from "./github.js";
import { cleanCommits } from "./utils.js";
import { generateChangelog } from "./ai.js";
import { sendEmail } from "./email.js";

const repo =
    process.env.REPO || "AdrianSaw/angular-15-dynamic-forms-starter";

async function main() {
    console.log("Repo:", repo);

    const commits = await getCommits(repo);

    const cleaned = cleanCommits(commits);

    const changelog = await generateChangelog(cleaned);

    console.log(changelog);

    await sendEmail(changelog);
}

main();