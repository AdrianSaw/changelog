export function cleanCommits(commits) {
    return commits.filter(c => {
        if (!c.message) return false;

        const message = c.message.toLowerCase();

        return (
            !message.startsWith("merge") &&
            !message.includes("bump")
        );
    });
}