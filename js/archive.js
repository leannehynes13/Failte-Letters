
const counties = [
    "Antrim", "Armagh", "Carlow", "Cavan", "Clare", "Cork", "Derry", "Donegal",
    "Down", "Dublin", "Fermanagh", "Galway", "Kerry", "Kildare", "Kilkenny", "Laois",
    "Leitrim", "Limerick", "Longford", "Louth", "Mayo", "Meath", "Monaghan", "Offaly",
    "Roscommon", "Sligo", "Tipperary", "Tyrone", "Waterford", "Westmeath", "Wexford", "Wicklow"
];

const categories = [
    {
        icon: "◉",
        title: "If you've left home behind",
        desc: "Letters acknowledging the courage it takes to build a life somewhere new."
    },
    {
        icon: "♥",
        title: "If someone has made you feel unwelcome",
        desc: "Messages of solidarity, kindness and understanding."
    },
    {
        icon: "☼",
        title: "If you need hope today",
        desc: "Sometimes people don't need advice. They just need hope."
    },
    {
        icon: "☕",
        title: "If you'd like a friend",
        desc: "People sharing what they'd say if they met you over a cup of tea."
    }
];

// Sample content is illustrative. Replace with approved submissions when ready.
const sampleLetters = {
    "If you've left home behind": [
        {
            title: "A note for a new beginning",
            from: "A reader in Galway",
            body: "Leaving somewhere familiar takes courage. There is so much you carry with you: the language, the food, the people and the memories that made you who you are.\n\nI hope that, with time, this place becomes somewhere you can make new memories too. You do not have to leave one home behind to make room for another.\n\nThere is room for you here.",
            sign: "With warmth, someone in Ireland"
        },
        {
            title: "You can belong in more than one place",
            from: "A reader in Cork",
            body: "You can miss home and still be happy here. You can feel grateful and lonely at the same time. None of those feelings cancel the others out.\n\nI hope you find people who make ordinary days feel a little easier.",
            sign: "A friend you haven't met yet"
        }
    ],

    "If someone has made you feel unwelcome": [
        {
            title: "You deserve kindness",
            from: "A reader in Dublin",
            body: "I am sorry if somebody has made you feel that you do not belong. Their actions do not define your worth, and they do not speak for everyone.\n\nYou deserve to feel safe, respected and welcome in the places where you live, work and spend your days.",
            sign: "With solidarity"
        },
        {
            title: "There is room for everyone",
            from: "A reader in Mayo",
            body: "A place becomes better when people look after one another. I hope you meet many people who show you that through small, everyday acts of kindness.",
            sign: "Someone wishing you well"
        }
    ],

    "If you need hope today": [
        {
            title: "One day at a time",
            from: "A reader in Waterford",
            body: "You do not have to figure everything out today. Take the small good moments when they come. A friendly face, a warm cup of tea, a place to rest.\n\nI hope tomorrow is gentler.",
            sign: "Thinking of you"
        }
    ],

    "If you'd like a friend": [
        {
            title: "Tea is always a good start",
            from: "A reader in Limerick",
            body: "If we met, I would put the kettle on. We could talk about where you have been, what you miss, what makes you laugh, or absolutely nothing at all.\n\nYou are welcome at the table.",
            sign: "A friend in Ireland"
        }
    ]
};

let selectedCounty = "Mayo";
let currentCategory = "";
let currentLetter = null;
let pageNumber = 1;


// OPEN THE BOOK
function openBook() {
    const cover = document.getElementById("openBookButton");
    const inside = document.querySelector(".inside");

    if (cover) {
        cover.classList.add("open");
    }

    if (inside) {
        inside.classList.add("archive-open");
    }

    renderHome();
}


// CLOSE THE BOOK
function closeBook() {
    const cover = document.getElementById("openBookButton");
    const inside = document.querySelector(".inside");

    if (cover) {
        cover.classList.remove("open");
    }

    if (inside) {
        inside.classList.remove("archive-open");
    }
}


// UPDATE THE TWO BOOK PAGES
function setPages(left, right, leftNum = "1", rightNum = "2") {
    const leftContent = document.getElementById("leftContent");
    const rightContent = document.getElementById("rightContent");
    const leftFooter = document.getElementById("leftFooter");
    const rightFooter = document.getElementById("rightFooter");

    if (leftContent) leftContent.innerHTML = left;
    if (rightContent) rightContent.innerHTML = right;

    if (leftFooter) leftFooter.textContent = leftNum;
    if (rightFooter) rightFooter.textContent = rightNum;
}


// ILLUSTRATED MAP OF IRELAND
function mapSVG() {
    return `<svg class="ireland-map" viewBox="0 0 300 330" role="img" aria-label="Illustrated outline map of Ireland">
    <defs>
        <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
            <stop stop-color="#a9a879"/>
            <stop offset="1" stop-color="#687653"/>
        </linearGradient>
    </defs>

    <path d="M155 12 L181 23 190 43 215 48 224 67 244 78 239 98 256 116 244 136 250 154 233 169 239 190 220 207 218 228 201 239 198 260 180 273 166 297 143 307 127 292 108 293 97 275 78 268 72 247 52 234 59 215 42 199 53 181 42 165 57 149 49 130 65 116 68 95 85 85 91 63 111 53 116 34 138 29 Z"
        fill="url(#land)" stroke="#526344" stroke-width="3"/>

    <path d="M155 12 L181 23 190 43 215 48 224 67 244 78 239 98 256 116 244 136 250 154 233 169 239 190 220 207 218 228 201 239 198 260 180 273 166 297 143 307 127 292 108 293 97 275 78 268 72 247 52 234 59 215 42 199 53 181 42 165 57 149 49 130 65 116 68 95 85 85 91 63 111 53 116 34 138 29 Z"
        fill="none" stroke="#e0d0a9" stroke-width="1.2" stroke-dasharray="2 3"/>

    <path d="M92 80 L135 95 178 87 222 103 M65 150 L111 157 151 145 203 157 243 148 M54 201 L104 196 148 208 215 198 M78 251 L125 239 179 255"
        fill="none" stroke="#e1d2ad" stroke-width="1.5" opacity=".75"/>

    <g fill="#f1e5c8" font-family="Georgia,serif" font-size="9" text-anchor="middle">
        <text x="155" y="62">ULSTER</text>
        <text x="146" y="139">CONNACHT</text>
        <text x="153" y="196">LEINSTER</text>
        <text x="122" y="260">MUNSTER</text>
    </g>

    <circle cx="188" cy="181" r="4" fill="#d9b66f" stroke="#fff1ce" stroke-width="1.5"/>
    </svg>`;
}


// MAIN ARCHIVE HOME PAGE
function renderHome() {
    currentCategory = "";
    currentLetter = null;

    const left = `
        <div class="eyebrow">A collection of voices</div>
        <h2>Where in Ireland?</h2>
        <p class="page-intro">Choose a county to discover letters from people connected to that part of Ireland.</p>
        <div class="ornament">❧ ✧ ❧</div>
        <div class="map-wrap">${mapSVG()}</div>
        <p class="map-caption">Every letter. Every county. Every voice matters.</p>
        <div class="county-grid">
            ${counties.map(c => `<button class="${c === selectedCounty ? 'active' : ''}" onclick="selectCounty('${c}')">${c}</button>`).join("")}
        </div>
    `;

    const right = `
        <div class="eyebrow">County ${selectedCounty}</div>
        <h2>Letters from ${selectedCounty}</h2>
        <p class="page-intro">Choose a page that speaks to you. There is no right place to begin.</p>
        <div class="ornament">✧</div>
        <div class="category-list">
            ${categories.map(c => `
                <button class="category-card" onclick="showCategory('${c.title.replace(/'/g, "\\'")}')">
                    <span class="category-icon">${c.icon}</span>
                    <span>
                        <strong>${c.title}</strong>
                        <small>${c.desc}</small>
                    </span>
                    <span class="chevron">›</span>
                </button>
            `).join("")}
        </div>
        <p class="notice">This archive is being built with care. The sample letters shown here are illustrative, not real submissions.</p>
    `;

    setPages(left, right, "1", "2");
}


// SELECT A COUNTY
function selectCounty(county) {
    selectedCounty = county;
    renderHome();
}


// SHOW A LETTER CATEGORY
function showCategory(title) {
    currentCategory = title;
    currentLetter = null;

    const entries = sampleLetters[title] || [];

    const left = `
        <div class="eyebrow">The archive · ${selectedCounty}</div>
        <h2>${title}</h2>
        <div class="ornament">❧</div>
        <p class="page-intro">A collection of messages written to remind people that they are seen, valued and welcome.</p>
        <div class="empty-note">
            ${entries.length ? `${entries.length} example letters in this preview.` : "New letters for this section will appear here as the archive grows."}
        </div>
        <button class="back-button" onclick="renderHome()">← Back to the county map</button>
    `;

    const right = entries.length ? `
        <div class="eyebrow">Turn the page</div>
        <h2>Choose a letter</h2>
        <div class="letter-list">
            ${entries.map((l, i) => `
                <div class="letter-row">
                    <button onclick="readLetter(${i})">
                        <strong>${l.title}</strong>
                        <small>${l.from} &nbsp; · &nbsp; Read letter ›</small>
                    </button>
                </div>
            `).join("")}
        </div>
        <p class="notice">These preview letters are examples only. Real contributions will be published only with the writer's permission.</p>
    ` : `
        <div class="eyebrow">A page waiting to be written</div>
        <h2>Your words belong here</h2>
        <p class="empty-note">As people contribute to the archive, their letters will find a home on these pages.</p>
    `;

    setPages(left, right, "3", "4");
}


// OPEN AN INDIVIDUAL LETTER
function readLetter(index) {
    const l = (sampleLetters[currentCategory] || [])[index];

    if (!l) return;

    currentLetter = l;

    const left = `
        <div class="eyebrow">${selectedCounty} · From the archive</div>
        <h2>${l.title}</h2>
        <div class="ornament">❧</div>
        <p class="page-intro">${l.from}</p>
        <div class="letter-body">${l.body}</div>
        <div class="letter-signoff">${l.sign}</div>
        <button class="back-button" onclick="showCategory('${currentCategory.replace(/'/g, "\\'")}')">← Back to letters</button>
    `;

    const right = `
        <div class="eyebrow">A message for you</div>
        <h2>Take these words with you</h2>
        <p class="empty-note">Every letter is a small act of connection. Thank you for taking the time to read this one.</p>
        <div class="ornament">✧ ☘ ✧</div>
        <button class="back-button" onclick="showCategory('${currentCategory.replace(/'/g, "\\'")}')">Read another letter</button>
    `;

    setPages(left, right, "5", "6");
}


// ABOUT THE FÁILTE LETTERS
function showAbout() {
    const left = `
        <div class="eyebrow">The story behind the pages</div>
        <h2>About this archive</h2>
        <div class="ornament">❧</div>
        <p class="letter-body">The Fáilte Letters is a growing collection of letters and messages from people across Ireland and around the world.</p>
        <p class="letter-body">It is a place for people to offer kindness, share encouragement and remind others that they deserve to feel welcome.</p>
    `;

    const right = `
        <div class="eyebrow">A living collection</div>
        <h2>Every voice matters</h2>
        <p class="letter-body">The archive will grow through contributions from individuals, schools, families and communities.</p>
        <p class="letter-body">Our hope is to preserve these words and share them with anyone who might need to read them.</p>
        <div class="ornament">✧</div>
        <p class="page-intro">Letters from Ireland · Litreacha ó Éirinn</p>
        <button class="back-button" onclick="renderHome()">← Return to the book</button>
    `;

    setPages(left, right, "About", "About");
}


// RETURN TO THE ARCHIVE HOME PAGE
function showHome() {
    renderHome();
}
