function renderResults(resultsContainer, filtered, searchValue) {

    resultsContainer.innerHTML = "";

    if (filtered.length === 0) {

        resultsContainer.innerHTML = `
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
            <h3>${highlight(item["Saint Name"] || "No Name", searchValue)}</h3>

            <p class="designation">${item["Designation"] || ""}</p>

            <p>
                <strong>📍 Location:</strong>
                ${highlight(item["Location"] || "N/A", searchValue)}
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

        resultsContainer.appendChild(div);

    });

}