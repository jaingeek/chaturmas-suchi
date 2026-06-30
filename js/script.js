const searchBox = document.getElementById("searchBox");
const results = document.getElementById("results");
const suggestions = document.getElementById("searchSuggestions");
const filterButtons = document.querySelectorAll(".filter-btn");
let currentFilter = "All";
let data = [];

// Show loading message
results.innerHTML = "<p>Loading data...</p>";

// Fetch Google Sheet data
fetch(`https://opensheet.elk.sh/${CONFIG.SHEET_ID}/${CONFIG.SHEET_NAME}`)
    .then(res => res.json())
    .then(json => {
        data = json;
        document.getElementById("saintCount").textContent = data.length;

        const locations = new Set(
            data.map(item => item["Location"]).filter(Boolean)
        );

        document.getElementById("locationCount").textContent = locations.size;

        const designations = new Set(
            data.map(item => item["Designation"]).filter(Boolean)
        );

        document.getElementById("designationCount").textContent = designations.size;
        results.innerHTML = "<p>Data loaded. Start searching...</p>";
        console.log("Data loaded:", data);
    })
    .catch(err => {
        results.innerHTML = "<p>Error loading data</p>";
        console.error(err);
    });
function highlight(text, search) {
    if (!text) return "";

    const regex = new RegExp(`(${search})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
}
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

    const filtered = data.filter(item => {

        const matchesSearch =
            (item["Saint Name"] || "").toLowerCase().includes(value) ||
            (item["Location"] || "").toLowerCase().includes(value) ||
            (item["Designation"] || "").toLowerCase().includes(value) ||
            (item["Address"] || "").toLowerCase().includes(value);

        const matchesFilter =
            currentFilter === "All" ||
            (item["Designation"] || "").toLowerCase().includes(currentFilter.toLowerCase());

        return matchesSearch && matchesFilter;

    });
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

    if (filtered.length === 0) {
        results.innerHTML = `
        
<div class="card">
    <h3>No Results Found</h3>
    <p>Try searching by Maharaj Ji name, city or location.</p>
</div>
`;
        return;
    }

    filtered.forEach(item => {
        const div = document.createElement("div");
        div.className = "card";
        div.style.cursor = "pointer";

        div.addEventListener("click", () => {
            window.location.href = `maharaj.html?id=${item["ID"]}`;
        });
        div.innerHTML = `
    <h3>${highlight(item["Saint Name"] || "No Name", value)}</h3>

    <p class="designation">${item["Designation"] || ""}</p>

   <p>
<strong>📍 Location:</strong>
${highlight(item["Location"] || "N/A", value)}
</p>

<a class="map-btn"
href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item["Address"] || item["Location"])}"
target="_blank">
Open in Google Maps
</a>

    <p><strong>👥 Saints:</strong> ${item["Total Saints in Group"] || "N/A"}</p>

    <p><strong>📞 Contact:</strong> ${item["Contact Person"] || ""}</p>

    <button class="details-btn">View Details</button>
`;
        results.appendChild(div);
    });
});

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        searchBox.dispatchEvent(new Event("input"));

    });

});