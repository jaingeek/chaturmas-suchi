const SHEET_URL = "https://opensheet.elk.sh/1GiZA69JfSs-RDS4fsRqpp4kBBvraNJbxTqvbhOVl2Is/Table%201";

async function loadData() {
    try {
        const response = await fetch(SHEET_URL);
        const data = await response.json();

        console.log("Data loaded successfully!");
        console.log(data);
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

loadData();
