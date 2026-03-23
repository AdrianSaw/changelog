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