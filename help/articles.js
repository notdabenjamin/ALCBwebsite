```javascript
const ARTICLES = [
    {
        title: "Getting Started With ALCB Games",
        description:
            "A quick guide to installing, launching, and getting into an ALCB game.",
        slug: "/help/temparticle"
    }
];


const grid =
    document.getElementById("articles");

const input =
    document.getElementById("query");

const form =
    document.getElementById("articleSearch");

const count =
    document.getElementById("count");

const empty =
    document.getElementById("empty");


function render(term = "") {

    const query =
        term.trim().toLowerCase();


    const matches =
        ARTICLES.filter(article => {

            const searchable =
                (
                    article.title +
                    " " +
                    article.description
                ).toLowerCase();

            return searchable.includes(query);

        });


    grid.innerHTML =
        matches.map(article => `

            <a
                class="card"
                href="${article.slug}.html"
            >

                <span class="tag">
                    SUPPORT ARTICLE
                </span>

                <h3>
                    ${article.title}
                </h3>

                <p>
                    ${article.description}
                </p>

                <span class="arrow">
                    Read article →
                </span>

            </a>

        `).join("");


    count.textContent =
        `${matches.length} article${
            matches.length === 1 ? "" : "s"
        }${
            query
                ? ` matching "${term}"`
                : ""
        }`;


    empty.style.display =
        matches.length
            ? "none"
            : "block";
}


form.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        render(input.value);

    }
);


const params =
    new URLSearchParams(
        window.location.search
    );


input.value =
    params.get("q") || "";


render(input.value);
```
