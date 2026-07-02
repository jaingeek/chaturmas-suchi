function renderPopularCities(data) {

    const container = document.getElementById("popularCities");

    const cityCounts = {};

    data.forEach(item => {

        const city = (item["Location"] || "").split(",")[0].trim();

        if (!city) return;

        cityCounts[city] = (cityCounts[city] || 0) + 1;

    });

    const popularCities = Object.entries(cityCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8);

    container.innerHTML = "";

    popularCities.forEach(([city, count]) => {

        const chip = document.createElement("button");

        chip.className = "city-chip";

        chip.textContent = `${city} (${count})`;

        chip.addEventListener("click", () => {

            searchBox.value = city;

            searchBox.focus();

            searchBox.dispatchEvent(new Event("input"));

            window.scrollTo({
                top: searchBox.offsetTop - 20,
                behavior: "smooth"
            });

        });

        container.appendChild(chip);

    });

}