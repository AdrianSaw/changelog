export async function getCommits(repo) {
    const res = await fetch(
        `https://api.github.com/repos/${repo}/commits`
    );

    const data = await res.json();

    if (!Array.isArray(data)) {
        console.error("GitHub API error:", data);
        return [];
    }

    const detailed = await Promise.all(
        data.slice(0, 5).map(async (c) => {
            const detailsRes = await fetch(c.url);
            const details = await detailsRes.json();

            return {
                message: c.commit.message,
                files: details.files?.map(f => f.filename) || [],
            };
        })
    );

    return detailed;
}

export async function getRepoName(repo) {
    try {
        const res = await fetch(
            `https://api.github.com/repos/${repo}/contents/package.json`
        );

        const data = await res.json();

        if (!data.content) return null;

        // GitHub zwraca base64
        const decoded = Buffer.from(data.content, "base64").toString("utf-8");

        const json = JSON.parse(decoded);

        return json.name || null;
    } catch (err) {
        console.error("Cannot fetch package.json:", err);
        return null;
    }
}