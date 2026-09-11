document.addEventListener("DOMContentLoaded", async () => {
    const input = document.getElementById("article-search");
    const results = document.getElementById("article-search-results");
    const status = document.getElementById("article-search-status");
    if (!input || !results || !status) return;
    document.getElementById("article-search-controls").hidden = false;
    const normalise = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    let articles;
    try {
        const response = await fetch("/assets/article-index.json");
        if (!response.ok) throw new Error("Article index unavailable");
        articles = await response.json();
    } catch {
        status.textContent = "Search is unavailable. Browse the articles below.";
        input.disabled = true;
        return;
    }
    const search = () => {
        const terms = normalise(input.value.trim()).split(/\s+/).filter(Boolean);
        results.replaceChildren();
        results.hidden = terms.length === 0;
        if (!terms.length) {
            status.textContent = "Type to search the article collection.";
            return;
        }
        const matches = articles.filter((article) => {
            const text = normalise(`${article.title} ${article.description}`);
            return terms.every((term) => text.includes(term));
        });
        status.textContent = matches.length ? `${matches.length} article${matches.length === 1 ? "" : "s"} found.` : "No matching articles. Try a destination or a shorter search.";
        matches.forEach((article) => {
            const item = document.createElement("li");
            const link = document.createElement("a");
            link.href = article.url;
            link.className = "text-yellow-400 underline font-semibold";
            link.textContent = article.title;
            const description = document.createElement("p");
            description.className = "text-gray-300 mt-1";
            description.textContent = article.description;
            item.append(link, description);
            results.append(item);
        });
    };
    input.addEventListener("input", search);
    search();
});
