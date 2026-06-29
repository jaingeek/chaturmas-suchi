const SHEET_URL = "https://opensheet.elk.sh/1GiZA69JfSs-RDS4fsRqpp4kBBvraNJbxTqvbhOVl2Is/Table%201";

async function loadData() {
    const response = await fetch(SHEET_URL);
    const data = await response.json();

    const results = document.getElementById("results");
    results.innerHTML = "";

    data.forEach(item => {
        results.innerHTML += `
            <div class="card">
                <h3>${item["Saint Name"]}</h3>
                <p><strong>Location:</strong> ${item["Location"]}</p>
            </div>
        `;
    });
}

loadData();
