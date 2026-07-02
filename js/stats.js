function updateStats(data) {

    document.getElementById("saintCount").textContent = data.length;

    const locations = new Set(
        data.map(item => item["Location"]).filter(Boolean)
    );

    document.getElementById("locationCount").textContent = locations.size;

    const designations = new Set(
        data.map(item => item["Designation"]).filter(Boolean)
    );

    document.getElementById("designationCount").textContent = designations.size;

}