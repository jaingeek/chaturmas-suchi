const searchBox = document.getElementById("searchBox");
const results = document.getElementById("results");
const suggestions = document.getElementById("searchSuggestions");
let currentFilter = "All";
let data = [];

// Show loading message
results.innerHTML = "<p>Loading data...</p>";

// Fetch Google Sheet data
loadAllMaharaj()
    .then(json => {

        data = json;

        updateStats(data);
        renderPopularCities(data);
        results.innerHTML = "<p>Data loaded. Start searching...</p>";

    })
    .catch(err => {

        results.innerHTML = "<p>Error loading data</p>";

        console.error(err);

    });


// Search logic
searchBox.addEventListener("input", () => {
    const value = searchBox.value.trim().toLowerCase();

    results.innerHTML = "";

    // If empty input
    if (value === "") {
        document.getElementById("resultCount").textContent = "";
        suggestions.innerHTML = "";
        suggestions.style.display = "none";
        results.innerHTML = "";
        return;
    }
    const filtered = searchData(data, value, currentFilter);

    suggestions.innerHTML = "";
    filtered.slice(0, 5).forEach(item => {

        const div = document.createElement("div");

        div.className = "suggestion-item";

        div.textContent = item["Saint Name"];

        div.addEventListener("click", () => {

            window.location.href = `maharaj.html?id=${item["ID"]}`;

        });

        suggestions.appendChild(div);

    });
    suggestions.style.display =
        filtered.length ? "block" : "none";

    document.getElementById("resultCount").textContent =
        `${filtered.length} result(s) found`;

    renderResults(results, filtered, value);
});
