import "dotenv/config";
import { getCommits } from "./github.js";
import { cleanCommits } from "./utils.js";
import { generateChangelog } from "./ai.js";
import { sendEmail } from "./email.js";

import { getRepoName } from "./github.js";

async function main() {
    const repo =
        process.env.REPO || "AdrianSaw/angular-15-dynamic-forms-starter";

    const commits = await getCommits(repo);

    const cleaned = cleanCommits(commits);

    const changelog = await generateChangelog(cleaned);

    const repoName = await getRepoName(repo);

    await sendEmail(changelog, repo, repoName);
}

main();