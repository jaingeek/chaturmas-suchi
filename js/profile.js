const profile = document.getElementById("profile");

// Get ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

profile.innerHTML = "<p>Loading profile...</p>";

fetch(`https://opensheet.elk.sh/${CONFIG.SHEET_ID}/${CONFIG.SHEET_NAME}`)
    .then(res => res.json())
    .then(data => {

        const maharaj = data.find(item => item["ID"] === id);

        if (!maharaj) {
            profile.innerHTML = "<h2>Maharaj Ji not found.</h2>";
            return;
        }

        profile.innerHTML = `
<div class="profile-card">

    <div class="profile-photo">
        <img
        src="${maharaj["Photo"] || CONFIG.DEFAULT_PHOTO}"
        alt="${maharaj["Saint Name"]}"
    >
    </div>

    <h2>${maharaj["Saint Name"]}</h2>

    <h3>${maharaj["Designation"]}</h3>

    <hr>

    <div class="info">
        <strong>📍 Current Chaturmas</strong>
        <p>${maharaj["Location"]}</p>
    </div>

    <div class="info">
        <strong>🏠 Address</strong>
        <p>${maharaj["Address"]}</p>
    </div>

    <div class="info">
        <strong>👥 Sangh Size</strong>
        <p>${maharaj["Total Saints in Group"]}</p>
    </div>

    <div class="info">
        <strong>📞 Contact Person</strong>
        <p>${maharaj["Contact Person"]}</p>
    </div>

  <div class="contact-box">

    <span>${maharaj["Contact Number"]}</span>

    <div class="contact-actions">

        <a
            href="tel:${(maharaj["Contact Number"] || "").split(",")[0].trim()}"
            class="call-btn">
            Call
        </a>

        <button id="copyNumber">
            Copy
        </button>

    </div>

</div>
    </div>

    <a class="map-btn"
    href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(maharaj["Address"] || maharaj["Location"])}"
    target="_blank">
    Open Google Maps
    </a>
        <button class="share-btn" id="shareProfile">
    Share Profile
</button>
</div>
`;

        const related = data
            .filter(item => item["ID"] !== maharaj["ID"])
            .slice(0, 3);

        const relatedHTML = related.map(item => `
    <div class="card related-card" data-id="${item["ID"]}">
        <h4>${item["Saint Name"]}</h4>
        <p>${item["Location"] || "Location not available"}</p>
    </div>
`).join("");

        profile.innerHTML += `
    <h2 style="margin-top:40px;">Related Maharaj Ji</h2>
    <div id="relatedContainer">
        ${relatedHTML}
    </div>
`;

        document.querySelectorAll(".related-card").forEach(card => {

            card.addEventListener("click", () => {

                const id = card.dataset.id;

                window.location.href = `maharaj.html?id=${id}`;

            });

        });


        const shareBtn = document.getElementById("shareProfile");

        shareBtn.addEventListener("click", async () => {

            if (navigator.share) {

                await navigator.share({
                    title: maharaj["Saint Name"],
                    text: `View ${maharaj["Saint Name"]}'s profile`,
                    url: window.location.href
                });

            } else {

                await navigator.clipboard.writeText(window.location.href);
                alert("Profile link copied!");

            }

        });

        const copyBtn = document.getElementById("copyNumber");

        copyBtn.addEventListener("click", async () => {

            await navigator.clipboard.writeText(maharaj["Contact Number"]);

            copyBtn.textContent = "Copied!";

            setTimeout(() => {
                copyBtn.textContent = "Copy";
            }, 2000);

        });
    })
    .catch(() => {
        profile.innerHTML = "<h2>Error loading profile.</h2>";

    });