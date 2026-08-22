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
    {
        slug: "how-to-avoid-phishing",
        title: "How to avoid phishing and spoofing",
        description:
            "What is phishing/spoofing and how to avoid it and keep your private info and alcb account safe!",
        category: "security",

        content: `
           phishing security hacked account spoofing virus malicious
        `
    }
];


/*
 * Search all support articles.
 *
 * Searches through:
 * - title
 * - description
 * - category
 * - article content
 *
 * Results are ranked so better matches appear first.
 */

function searchArticles(query) {

    const normalizedQuery = String(query)
        .toLowerCase()
        .trim();

    if (!normalizedQuery) {
        return [];
    }


    /*
     * Split searches into individual words.
     *
     * Example:
     *
     * "game problem"
     *
     * becomes:
     *
     * ["game", "problem"]
     */

    const terms = normalizedQuery
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


            const searchableText = `
                ${title}
                ${description}
                ${category}
                ${content}
            `.toLowerCase();


            let score = 0;


            for (const term of terms) {

                /*
                 * Title matches are the most important.
                 */

                if (title.includes(term)) {
                    score += 10;
                }


                /*
                 * Category matches are also useful.
                 */

                if (category.includes(term)) {
                    score += 6;
                }


                /*
                 * Description matches.
                 */

                if (description.includes(term)) {
                    score += 4;
                }


                /*
                 * General article-content matches.
                 */

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


        /*
         * Only return articles that actually matched.
         */

        .filter(result => result.score > 0)


        /*
         * Highest relevance first.
         */

        .sort((a, b) => b.score - a.score)


        /*
         * Return the actual article objects.
         */

        .map(result => result.article);

}


/*
 * Escape text before inserting it into HTML.
 *
 * This prevents article data from accidentally
 * being interpreted as HTML.
 */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}
