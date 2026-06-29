const SHEET_URL = "https://opensheet.elk.sh/1GiZA69JfSs-RDS4fsRqpp4kBBvraNJbxTqvbhOVl2Is/Table%201";

async function loadData() {
    const response = await fetch(SHEET_URL);
    const data = await response.json();

    console.log(data);

    document.getElementById("results").innerHTML =
        "<h2>Total Saints: " + data.length + "</h2>";
}

loadData();
