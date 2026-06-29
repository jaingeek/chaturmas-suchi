const searchBox = document.getElementById("searchBox");
const results = document.getElementById("results");

let data = [];

// Show loading message
results.innerHTML = "<p>Loading data...</p>";

// Fetch Google Sheet data
fetch("https://opensheet.elk.sh/1GiZA69JfSs-RDS4fsRqpp4kBBvraNJbxTqvbhOVl2Is/Table%201")
    .then(res => res.json())
    .then(json => {
        data = json;
        results.innerHTML = "<p>Data loaded. Start searching...</p>";
        console.log("Data loaded:", data);
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
        results.innerHTML = "<p>Start typing to search Maharaj Ji...</p>";
        return;
    }

    const filtered = data.filter(item =>
        Object.values(item)
            .join(" ")
            .toLowerCase()
            .includes(value)
    );

    if (filtered.length === 0) {
        results.innerHTML = "<p>No results found</p>";
        return;
    }

    filtered.forEach(item => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
      <h3>${item["Saint Name"] || "No Name"}</h3>
      <p><b>Location:</b> ${item["Location"] || "N/A"}</p>
      <p><b>Address:</b> ${item["Address"] || "N/A"}</p>
      <p><b>Year:</b> ${item["Year"] || "N/A"}</p>
      <p><b>Contact:</b> ${item["Contact Person"] || ""} - ${item["Contact Number"] || ""}</p>
    `;

        results.appendChild(div);
    });
});