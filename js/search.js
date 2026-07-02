function searchData(data, value, currentFilter) {

    value = value.trim().toLowerCase();

    return data.filter(item => {

        const matchesSearch =
            (item["Saint Name"] || "").toLowerCase().includes(value) ||
            (item["Location"] || "").toLowerCase().includes(value) ||
            (item["Designation"] || "").toLowerCase().includes(value) ||
            (item["Address"] || "").toLowerCase().includes(value);

        const matchesFilter =
            currentFilter === "All" ||
            (item["Designation"] || "")
                .toLowerCase()
                .includes(currentFilter.toLowerCase());

        return matchesSearch && matchesFilter;

    });

}