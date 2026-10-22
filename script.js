// FORCE PAGE TO START AT HERO ON REFRESH
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
}
window.scrollTo(0, 0);

// SCROLL ANIMATION
function smoothScrollTo(targetY, duration = 1200) {
    const startY = window.scrollY;
    const difference = targetY - startY;
    let startTime = null;

    function step(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth ease-in-out curve
        const ease = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        window.scrollTo(0, startY + difference * ease);

        if (elapsed < duration) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

// Attach to all anchor links pointing to on-page sections (#)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId) return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            smoothScrollTo(target.offsetTop, 1000); // <-- Adjust speed here (higher = slower)
        }
    });
});


// NAVBAR HIGHLIGHT
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

const observerOptions = {
    root: null,
    // Triggers when a section passes the middle area of the viewport
    rootMargin: '-30% 0px -50% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));


// TEAM SELECTION IN GRID
const teamCards = document.querySelectorAll('.team_card');
const gridBgActive = document.querySelector('.grid_bg_active');
const gridBgNext = document.querySelector('.grid_bg_next');
const teamNameBox = document.querySelector('.team_name');
const teamNameH1 = document.querySelector('.team_name h1');
const teamNameH2 = document.querySelector('.team_name h2');
const teamNameBtn = document.querySelector('.team_name a');

const teamDetails = {
    mercedes: {
        bg: 'Assets/Mercedes/Mercedes_BG.png',
        color: 'var(--petronas)'
    },
    ferrari: {
        bg: 'Assets/Ferrari/Ferrari_BG.png',
        color: 'var(--ferrari)'
    },
    mclaren: {
        bg: 'Assets/Mclaren/Mclaren_BG.png',
        color: 'var(--mclaren)'
    },
    red_bulls: {
        bg: 'Assets/Red_Bulls/RedBulls_BG.png',
        color: 'var(--red_bulls)'
    },
    racing_bulls: {
        bg: 'Assets/Racing_Bulls/RacingBulls_BG.png',
        color: 'var(--racing-bulls)'
    },
    alpine: {
        bg: 'Assets/Alpine/Alpine_BG.png',
        color: 'var(--alpine)'
    },
    haas: {
        bg: 'Assets/Haas/Haas_BG.png',
        color: 'var(--haas)'
    }
};

let currentSelectedKey = '';

function selectTeam(card, isInitial = false) {
    // Identify selected team key from classes
    let selectedKey = '';
    for (const key of Object.keys(teamDetails)) {
        if (card.classList.contains(key)) {
            selectedKey = key;
            break;
        }
    }

    // Ignore click if this team is already active
    if (!selectedKey || (!isInitial && selectedKey === currentSelectedKey)) return;
    currentSelectedKey = selectedKey;

    // 1. Highlight selected team card on the left
    teamCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');

    const teamInfo = teamDetails[selectedKey] || {};
    const newBg = `linear-gradient(to right, var(--black), rgba(255, 255, 255, 0)), url("${teamInfo.bg}")`;

    // 2. Smooth ease-in-out crossfade for background image
    if (gridBgActive && gridBgNext && teamInfo.bg) {
        if (isInitial) {
            gridBgActive.style.backgroundImage = newBg;
            gridBgNext.style.opacity = '0';
        } else {
            // Set new image on next layer and fade it in
            gridBgNext.style.backgroundImage = newBg;
            gridBgNext.style.opacity = '1';

            // Once crossfade finishes, transfer to active layer and reset next layer
            setTimeout(() => {
                gridBgActive.style.backgroundImage = newBg;
                gridBgNext.style.opacity = '0';
            }, 600);
        }
    }

    // 3. Smooth ease-in-out fade transition for team name & driver details
    const cardTitle = card.querySelector('h1')?.textContent.trim() || '';
    const cardDriversHTML = card.querySelector('h2')?.innerHTML.trim() || '';

    if (isInitial) {
        if (teamNameH1) teamNameH1.textContent = cardTitle;
        if (teamNameH2) teamNameH2.innerHTML = cardDriversHTML;
        if (teamNameBtn) {
            teamNameBtn.textContent = `CHOOSE ${cardTitle.toUpperCase()}`;
            if (teamInfo.color) teamNameBtn.style.backgroundColor = teamInfo.color;
        }
    } else if (teamNameBox) {
        teamNameBox.classList.add('fade_out');
        setTimeout(() => {
            if (teamNameH1) teamNameH1.textContent = cardTitle;
            if (teamNameH2) teamNameH2.innerHTML = cardDriversHTML;
            if (teamNameBtn) {
                teamNameBtn.textContent = `CHOOSE ${cardTitle.toUpperCase()}`;
                if (teamInfo.color) teamNameBtn.style.backgroundColor = teamInfo.color;
            }
            teamNameBox.classList.remove('fade_out');
        }, 250);
    }
}

// Add click listeners to all team cards
teamCards.forEach(card => {
    card.addEventListener('click', () => selectTeam(card));
});

// Default to Mercedes (the first team card) on load
const defaultTeam = document.querySelector('.team_card.mercedes') || teamCards[0];
if (defaultTeam) {
    selectTeam(defaultTeam, true);
}

// ==========================================
// STATS & BUDGET LOGIC
// ==========================================
const TOTAL_BUDGET = 25;
let remainingBudget = TOTAL_BUDGET;

const budgetDisplay = document.querySelector('.budget_display');
const statsContainers = document.querySelectorAll('.stats_container');

function updateStatsUI() {
    // 1. Update budget badge text or show ready button
    if (budgetDisplay) {
        if (remainingBudget === 0) {
            budgetDisplay.classList.add('ready');
            budgetDisplay.innerHTML = `<a href="#circuit">SELECT CIRCUIT &rarr;</a>`;
        } else {
            budgetDisplay.classList.remove('ready');
            budgetDisplay.innerHTML = `<h1>BUDGET: <span class="highlight">$${remainingBudget}M</span> / $${TOTAL_BUDGET}M</h1>`;
        }
    }

    // 2. Update button states (disabled when at limits or out of budget)
    statsContainers.forEach(container => {
        const buttons = container.querySelectorAll('.stats_btn');
        const bars = container.querySelectorAll('.stats_bar');

        const d1Bar = bars[0];
        const d2Bar = bars[1];

        const d1Level = parseInt(d1Bar?.dataset.level || '0', 10);
        const d2Level = parseInt(d2Bar?.dataset.level || '0', 10);

        // Driver 1: buttons[0] = '+', buttons[1] = '-'
        if (buttons[0]) buttons[0].disabled = (remainingBudget === 0 || d1Level >= 5);
        if (buttons[1]) buttons[1].disabled = (d1Level <= 0);

        // Driver 2: buttons[2] = '+', buttons[3] = '-'
        if (buttons[2]) buttons[2].disabled = (remainingBudget === 0 || d2Level >= 5);
        if (buttons[3]) buttons[3].disabled = (d2Level <= 0);
    });
}

function modifyStat(bar, delta) {
    if (!bar) return;
    const currentLevel = parseInt(bar.dataset.level || '0', 10);
    const targetLevel = currentLevel + delta;

    // Check bounds: 0 to 5 bars
    if (targetLevel < 0 || targetLevel > 5) return;

    // If adding, ensure budget is available
    if (delta > 0 && remainingBudget <= 0) return;

    // Update state
    bar.dataset.level = targetLevel;
    bar.style.setProperty('--level', targetLevel);
    remainingBudget -= delta;

    updateStatsUI();
}

// Attach event listeners to all stat controllers
statsContainers.forEach(container => {
    const buttons = container.querySelectorAll('.stats_btn');
    const bars = container.querySelectorAll('.stats_bar');

    const d1Bar = bars[0];
    const d2Bar = bars[1];

    if (d1Bar) {
        d1Bar.dataset.level = '0';
        d1Bar.style.setProperty('--level', 0);
    }
    if (d2Bar) {
        d2Bar.dataset.level = '0';
        d2Bar.style.setProperty('--level', 0);
    }

    // Driver 1: [0] = +, [1] = -
    if (buttons[0]) buttons[0].addEventListener('click', () => modifyStat(d1Bar, 1));
    if (buttons[1]) buttons[1].addEventListener('click', () => modifyStat(d1Bar, -1));

    // Driver 2: [2] = +, [3] = -
    if (buttons[2]) buttons[2].addEventListener('click', () => modifyStat(d2Bar, 1));
    if (buttons[3]) buttons[3].addEventListener('click', () => modifyStat(d2Bar, -1));
});

// Handle smooth scroll when "SELECT CIRCUIT" button is clicked
if (budgetDisplay) {
    budgetDisplay.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.getAttribute('href') === '#circuit') {
            const circuitSection = document.querySelector('#circuit');
            if (circuitSection) {
                e.preventDefault();
                smoothScrollTo(circuitSection.offsetTop, 1000);
            }
        }
    });
}

// Run initial UI state setup
updateStatsUI();