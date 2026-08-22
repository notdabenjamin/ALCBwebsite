const articles = [
    {
        slug: "getting-started",
        title: "Getting Started with ALCB Games",
        description:
            "Everything you need to know before jumping into an ALCB Games project.",
        category: "Getting Started",

        content: `
            welcome getting started alcb games support center
            games problem troubleshooting issue help
            reporting issue contact support
        `
    }
];


/*
 * Search articles.
 *
 * Searches:
 * - title
 * - description
 * - category
 * - article content
 *
 * Results are ranked so title matches appear first.
 */

function searchArticles(query) {

    const normalizedQuery =
        query
            .toLowerCase()
            .trim();

    if (!normalizedQuery) {
        return [];
    }


    const terms =
        normalizedQuery
            .split(/\s+/)
            .filter(Boolean);


    return articles
        .map(article => {

            const title =
                article.title.toLowerCase();

            const description =
                article.description.toLowerCase();

            const category =
                article.category.toLowerCase();

            const content =
                article.content.toLowerCase();


            const searchableText =
                `${title} ${description} ${category} ${content}`;


            let score = 0;


            for (const term of terms) {

                if (title.includes(term)) {
                    score += 10;
                }

                if (category.includes(term)) {
                    score += 6;
                }

                if (description.includes(term)) {
                    score += 4;
                }

                if (content.includes(term)) {
                    score += 2;
                }

            }


            return {
                article,
                score,
                searchableText
            };

        })

        .filter(result => result.score > 0)

        .sort((a, b) => b.score - a.score)

        .map(result => result.article);

}


/*
 * Safely insert text into HTML.
 */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}
