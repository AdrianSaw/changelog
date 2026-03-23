export async function getCommits() {
    const repo = "AdrianSaw/angular-15-dynamic-forms-starter";

    const res = await fetch(
        `https://api.github.com/repos/${repo}/commits`
    );

    const data = await res.json();

    if (!Array.isArray(data)) return [];

    // dla każdego commita pobierz szczegóły
    const detailed = await Promise.all(
        data.slice(0, 5).map(async (c) => {
            const detailsRes = await fetch(c.url);
            const details = await detailsRes.json();

            const files = details.files?.map(f => f.filename) || [];

            return {
                message: c.commit.message,
                files,
            };
        })
    );

    return detailed;
}