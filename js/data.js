async function loadAllMaharaj() {

    const response = await fetch(
        `https://opensheet.elk.sh/${CONFIG.SHEET_ID}/${CONFIG.SHEET_NAME}`
    );

    return await response.json();

}

async function getMaharajById(id) {

    const data = await loadAllMaharaj();

    return data.find(item => item["ID"] === id);

}

async function searchMaharaj(keyword) {

    const data = await loadAllMaharaj();

    keyword = keyword.toLowerCase();

    return data.filter(item =>
        Object.values(item)
            .join(" ")
            .toLowerCase()
            .includes(keyword)
    );

}