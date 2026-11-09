
/* =========================================
   THE FÁILTE LETTERS
   Interactive letter archive
========================================= */

const counties = [
    "Antrim", "Armagh", "Carlow", "Cavan",
    "Clare", "Cork", "Derry", "Donegal",
    "Down", "Dublin", "Fermanagh", "Galway",
    "Kerry", "Kildare", "Kilkenny", "Laois",
    "Leitrim", "Limerick", "Longford", "Louth",
    "Mayo", "Meath", "Monaghan", "Offaly",
    "Roscommon", "Sligo", "Tipperary", "Tyrone",
    "Waterford", "Westmeath", "Wexford", "Wicklow"
];

const categories = [
    {
        id: "home",
        title: "If you've left home behind",
        description: "Letters for anyone missing home, carrying memories or finding their feet somewhere new."
    },
    {
        id: "welcome",
        title: "If someone has made you feel unwelcome",
        description: "Letters of kindness, solidarity and reassurance for anyone who has felt they don't belong."
    },
    {
        id: "hope",
        title: "If you need hope today",
        description: "A collection of encouragement, optimism and reminders that difficult days can pass."
    },
    {
        id: "friend",
        title: "If you'd like a friend",
        description: "Letters from people across Ireland offering friendship, connection and a listening ear."
    }
];

/* DEMONSTRATION LETTERS
   Replace these with approved contributions.
*/

const letters = [
    {
        title: "A little reminder",
        author: "A friend in Ireland",
        county: "Galway",
        category: "hope",
        body: "Wherever you have come from, and wherever you are going, remember that you deserve kindness. You deserve to feel safe, valued and welcome. There are people here who want to see you thrive."
    },
    {
        title: "You are not alone",
        author: "Someone who cares",
        county: "Dublin",
        category: "welcome",
        body: "Sometimes a new place can feel unfamiliar and overwhelming. I hope you meet people who make you feel at home. Please remember that your presence matters."
    },
    {
        title: "Home travels with you",
        author: "A friend",
        county: "Cork",
        category: "home",
        body: "You can miss the place you came from and still build a beautiful life somewhere new. You do not have to leave your memories behind to find a new home."
    },
    {
        title: "A new friendship",
        author: "A neighbour",
        county: "Mayo",
        category: "friend",
        body: "If you ever feel like the world is a little too quiet, I hope someone reaches out. A conversation, a cup of tea or a simple hello can make all the difference."
    }
];

/* ARCHIVE STATE */

let selectedCounty = "All counties";
let selectedCategory = "all";
let currentLetter = null;

/* OPEN AND CLOSE BOOK */

function openBook() {
    const book = document.querySelector(".book-shell");

    if (!book) return;

    book.classList.add("is-open");

    showHome();
}

/* RETURN TO HOME */

function showHome() {
    currentLetter = null;
    selectedCounty = "All counties";
    selectedCategory = "all";

    renderHome();
}

/* ABOUT THE ARCHIVE */

function showAbout() {
    currentLetter = null;

    const left = document.getElementById("leftContent");
    const right = document.getElementById("rightContent");

    left.innerHTML = `
        <h1>About the archive</h1>

        <p>
            The Fáilte Letters is a growing collection of letters
            from people connected to Ireland, written for those
            who have arrived here, are finding their feet or
            simply need a little kindness.
        </p>

        <p>
            Every letter is an invitation to feel welcome,
            valued and part of a community.
        </p>
    `;

    right.innerHTML = `
        <h2>A place for everyone</h2>

        <p>
            This archive celebrates the kindness that can exist
            between strangers and the connections that make
            a place feel like home.
        </p>

        <p>
            Letters are personally curated for this collection.
            Each contribution helps create a lasting record
            of welcome and belonging in Ireland.
        </p>

        <button class="archive-button" onclick="showHome()">
            Return to the archive
        </button>
    `;
}

/* MAIN ARCHIVE PAGE */

function renderHome() {

    const left = document.getElementById("leftContent");
    const right = document.getElementById("rightContent");

    if (!left || !right) return;

    left.innerHTML = `
        <h1>The Fáilte Letters</h1>

        <p><em>Letters from Ireland, for everyone.</em></p>

        <p>
            A collection of words, stories and messages
            written to remind you that you belong.
        </p>

        <h2>Explore Ireland</h2>

        <p>
            Discover letters from across the island.
            Select a county to explore its contributions.
        </p>

        <select class="county-select"
            id="countySelect"
            onchange="selectCounty(this.value)">

            <option value="All counties">All counties</option>

            ${counties.map(county => `
                <option value="${county}"
                    ${selectedCounty === county ? "selected" : ""}>
                    ${county}
                </option>
            `).join("")}

        </select>

        <p class="letter-meta">
            A living collection of letters and kindness.
        </p>
    `;

    right.innerHTML = `
        <h2>Find a letter</h2>

        <p>What would you like to read today?</p>

        <div class="category-list">

            ${categories.map(category => `
                <button
                    class="category-button ${selectedCategory === category.id ? "active" : ""}"
                    onclick="selectCategory('${category.id}')">

                    ${category.title}

                </button>
            `).join("")}

            <button
                class="category-button ${selectedCategory === "all" ? "active" : ""}"
                onclick="selectCategory('all')">

                All letters

            </button>

        </div>

        <div id="letterResults"></div>
    `;

    renderLetters();
}

/* COUNTY FILTER */

function selectCounty(county) {
    selectedCounty = county;
    currentLetter = null;
    renderHome();
}

/* CATEGORY FILTER */

function selectCategory(category) {
    selectedCategory = category;
    currentLetter = null;
    renderHome();
}

/* DISPLAY LETTERS */

function renderLetters() {

    const results = document.getElementById("letterResults");

    if (!results) return;

    const filteredLetters = letters.filter(letter => {

        const countyMatches =
            selectedCounty === "All counties" ||
            letter.county === selectedCounty;

        const categoryMatches =
            selectedCategory === "all" ||
            letter.category === selectedCategory;

        return countyMatches && categoryMatches;
    });

    if (filteredLetters.length === 0) {

        results.innerHTML = `
            <p>
                There are no published letters in this selection yet.
                This collection will continue to grow.
            </p>
        `;

        return;
    }

    results.innerHTML = filteredLetters.map((letter, index) => `
        <div class="letter-card"
            onclick="openLetter(${letters.indexOf(letter)})">

            <h3>${escapeHTML(letter.title)}</h3>

            <p class="letter-meta">
                ${escapeHTML(letter.author)} ·
                ${escapeHTML(letter.county)}
            </p>

            <span>Read letter →</span>

        </div>
    `).join("");
}

/* OPEN INDIVIDUAL LETTER */

function openLetter(index) {

    const letter = letters[index];

    if (!letter) return;

    currentLetter = index;

    const left = document.getElementById("leftContent");
    const right = document.getElementById("rightContent");

    left.innerHTML = `
        <p class="letter-meta">
            ${escapeHTML(letter.county)}, Ireland
        </p>

        <h1>${escapeHTML(letter.title)}</h1>

        <p>
            ${escapeHTML(letter.body)}
        </p>

        <p><em>With kindness,</em></p>

        <p>${escapeHTML(letter.author)}</p>
    `;

    right.innerHTML = `
        <h2>A little more kindness</h2>

        <p>
            Every letter in this archive is a reminder
            that small acts of kindness can make a
            meaningful difference.
        </p>

        <p>
            Thank you for taking the time to read.
        </p>

        <button class="archive-button"
            onclick="renderHome()">

            Back to letters

        </button>
    `;
}

/* SAFE TEXT DISPLAY */

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}

/* STARTUP */

document.addEventListener("DOMContentLoaded", () => {

    const cover = document.getElementById("cover");

    if (cover) {
        cover.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openBook();
            }
        });
    }

});
