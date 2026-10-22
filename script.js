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

// TRAINING ELEMENTS
const trainingSection = document.querySelector('#training');
const driver1Img = document.querySelector('.driver1 img');
const driver2Img = document.querySelector('.driver2 img');
const driver1NameH1 = document.querySelector('.driver_name1 h1');
const driver1CountryH2 = document.querySelector('.driver_name1 h2');
const driver2NameH1 = document.querySelector('.driver_name2 h1');
const driver2CountryH2 = document.querySelector('.driver_name2 h2');
const teamLogoImg = document.querySelector('.drivers_name img');
const driversNameContainer = document.querySelector('.drivers_name');

const teamDetails = {
    mercedes: {
        bg: 'Assets/Mercedes/Mercedes_BG.png',
        color: 'var(--petronas)',
        car: 'Assets/Mercedes/Mercedes_Car.png',
        logo: 'Assets/Mercedes/Mercedes_Logo.webp',
        driver1: {
            name: 'George <span class="highlight">Russell</span> | 63',
            country: 'United Kingdom',
            img: 'Assets/Mercedes/George.webp'
        },
        driver2: {
            name: 'Kimi <span class="highlight">Antonelli</span> | 12',
            country: 'Italy',
            img: 'Assets/Mercedes/Kimi.webp'
        }
    },
    ferrari: {
        bg: 'Assets/Ferrari/Ferrari_BG.png',
        color: 'var(--ferrari)',
        car: 'Assets/Ferrari/Ferrari_Car.png',
        logo: 'Assets/Ferrari/Ferrari_Logo.png',
        driver1: {
            name: 'Charles <span class="highlight">Leclerc</span> | 16',
            country: 'Monaco',
            img: 'Assets/Ferrari/Charles.webp'
        },
        driver2: {
            name: 'Lewis <span class="highlight">Hamilton</span> | 44',
            country: 'United Kingdom',
            img: 'Assets/Ferrari/Lewis.webp'
        }
    },
    mclaren: {
        bg: 'Assets/Mclaren/Mclaren_BG.png',
        color: 'var(--mclaren)',
        car: 'Assets/Mclaren/Mclaren_Car.png',
        logo: 'Assets/Mclaren/Mclaren_Logo.svg',
        driver1: {
            name: 'Lando <span class="highlight">Norris</span> | 4',
            country: 'United Kingdom',
            img: 'Assets/Mclaren/Lando.webp'
        },
        driver2: {
            name: 'Oscar <span class="highlight">Piastri</span> | 81',
            country: 'Australia',
            img: 'Assets/Mclaren/Oscar.webp'
        }
    },
    red_bulls: {
        bg: 'Assets/Red_Bulls/RedBulls_BG.png',
        color: 'var(--red_bulls)',
        car: 'Assets/Red_Bulls/RedBulls_Car.png',
        logo: 'Assets/Red_Bulls/Red_Bulls_Logo.svg',
        driver1: {
            name: 'Max <span class="highlight">Verstappen</span> | 1',
            country: 'Netherlands',
            img: 'Assets/Red_Bulls/Max.webp'
        },
        driver2: {
            name: 'Isack <span class="highlight">Hadjar</span> | 6',
            country: 'France',
            img: 'Assets/Red_Bulls/Isack.webp'
        }
    },
    racing_bulls: {
        bg: 'Assets/Racing_Bulls/RacingBulls_BG.png',
        color: 'var(--racing-bulls)',
        car: 'Assets/Racing_Bulls/RacingBulls_Car.png',
        logo: 'Assets/Racing_Bulls/Racing_Bulls_Logo.svg',
        driver1: {
            name: 'Liam <span class="highlight">Lawson</span> | 30',
            country: 'New Zealand',
            img: 'Assets/Racing_Bulls/Liam.webp'
        },
        driver2: {
            name: 'Arvid <span class="highlight">Lindblad</span> | 17',
            country: 'United Kingdom',
            img: 'Assets/Racing_Bulls/Arvid.webp'
        }
    },
    alpine: {
        bg: 'Assets/Alpine/Alpine_BG.png',
        color: 'var(--alpine)',
        car: 'Assets/Alpine/Alpine_Car.png',
        logo: 'Assets/Alpine/Alpine_Logo.svg',
        driver1: {
            name: 'Pierre <span class="highlight">Gasly</span> | 10',
            country: 'France',
            img: 'Assets/Alpine/Pierre.webp'
        },
        driver2: {
            name: 'Franco <span class="highlight">Colapinto</span> | 43',
            country: 'Argentina',
            img: 'Assets/Alpine/Franco.webp'
        }
    },
    haas: {
        bg: 'Assets/Haas/Haas_BG.png',
        color: 'var(--haas)',
        car: 'Assets/Haas/Haas_Car.png',
        logo: 'Assets/Haas/Haas_Logo.svg',
        driver1: {
            name: 'Esteban <span class="highlight">Ocon</span> | 31',
            country: 'France',
            img: 'Assets/Haas/Esteban.webp'
        },
        driver2: {
            name: 'Oliver <span class="highlight">Bearman</span> | 87',
            country: 'United Kingdom',
            img: 'Assets/Haas/Oliver.webp'
        }
    }
};

let currentSelectedKey = '';

function updateTrainingSection(teamInfo, isInitial = false) {
    if (!trainingSection || !teamInfo) return;

    // Apply training background with team car and radial glow of team color
    trainingSection.style.backgroundImage = `radial-gradient(circle at 50% 45%, color-mix(in srgb, ${teamInfo.color} 50%, transparent) 0%, rgba(0, 0, 0, 0.85) 70%), url("${teamInfo.car}")`;
    trainingSection.style.setProperty('--team-color', teamInfo.color);

    if (isInitial) {
        if (driver1Img && teamInfo.driver1) driver1Img.src = teamInfo.driver1.img;
        if (driver2Img && teamInfo.driver2) driver2Img.src = teamInfo.driver2.img;
        if (teamLogoImg && teamInfo.logo) teamLogoImg.src = teamInfo.logo;
        if (driver1NameH1 && teamInfo.driver1) driver1NameH1.innerHTML = teamInfo.driver1.name;
        if (driver1CountryH2 && teamInfo.driver1) driver1CountryH2.textContent = teamInfo.driver1.country;
        if (driver2NameH1 && teamInfo.driver2) driver2NameH1.innerHTML = teamInfo.driver2.name;
        if (driver2CountryH2 && teamInfo.driver2) driver2CountryH2.textContent = teamInfo.driver2.country;
    } else {
        // Fade out drivers and names briefly for smooth ease-in-out transition
        if (driver1Img) driver1Img.style.opacity = '0';
        if (driver2Img) driver2Img.style.opacity = '0';
        if (driversNameContainer) driversNameContainer.style.opacity = '0';

        setTimeout(() => {
            if (driver1Img && teamInfo.driver1) driver1Img.src = teamInfo.driver1.img;
            if (driver2Img && teamInfo.driver2) driver2Img.src = teamInfo.driver2.img;
            if (teamLogoImg && teamInfo.logo) teamLogoImg.src = teamInfo.logo;
            if (driver1NameH1 && teamInfo.driver1) driver1NameH1.innerHTML = teamInfo.driver1.name;
            if (driver1CountryH2 && teamInfo.driver1) driver1CountryH2.textContent = teamInfo.driver1.country;
            if (driver2NameH1 && teamInfo.driver2) driver2NameH1.innerHTML = teamInfo.driver2.name;
            if (driver2CountryH2 && teamInfo.driver2) driver2CountryH2.textContent = teamInfo.driver2.country;

            if (driver1Img) driver1Img.style.opacity = '1';
            if (driver2Img) driver2Img.style.opacity = '1';
            if (driversNameContainer) driversNameContainer.style.opacity = '1';
        }, 200);

        if (typeof resetStats === 'function') {
            resetStats();
        }
    }
}

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

    // 2. Smooth ease-in-out crossfade for background image in Grid
    if (gridBgActive && gridBgNext && teamInfo.bg) {
        if (isInitial) {
            gridBgActive.style.backgroundImage = newBg;
            gridBgNext.style.opacity = '0';
        } else {
            gridBgNext.style.backgroundImage = newBg;
            gridBgNext.style.opacity = '1';

            setTimeout(() => {
                gridBgActive.style.backgroundImage = newBg;
                gridBgNext.style.opacity = '0';
            }, 600);
        }
    }

    // 3. Smooth ease-in-out fade transition for team name & driver details in Grid
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

    // 4. Smoothly update Training section to match the selected team
    updateTrainingSection(teamInfo, isInitial);
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
const resetBtn = document.querySelector('#resetBtn');
const randomBtn = document.querySelector('#randomBtn');
const statsContainers = document.querySelectorAll('.stats_container');

function updateStatsUI() {
    // 1. Update budget badge text or show ready button
    if (budgetDisplay) {
        if (remainingBudget === 0) {
            budgetDisplay.classList.add('ready');
            budgetDisplay.innerHTML = `<a href="#circuit">CAR TUNING &rarr;</a>`;
        } else {
            budgetDisplay.classList.remove('ready');
            budgetDisplay.innerHTML = `<h1>BUDGET: <span class="highlight">$${remainingBudget}M</span> / $${TOTAL_BUDGET}M</h1>`;
        }
    }

    // 2. Update reset button state
    if (resetBtn) {
        resetBtn.disabled = (remainingBudget === TOTAL_BUDGET);
    }

    // 3. Update button states (disabled when at limits or out of budget)
    statsContainers.forEach(container => {
        const buttons = container.querySelectorAll('.stats_btn');
        const bars = container.querySelectorAll('.stats_bar');

        const d1Bar = bars[0];
        const d2Bar = bars[1];

        const d1Level = parseInt(d1Bar?.dataset.level || '0', 10);
        const d2Level = parseInt(d2Bar?.dataset.level || '0', 10);

        // Driver 1: buttons[0] = '+', buttons[1] = '-'
        if (buttons[1]) buttons[1].disabled = (remainingBudget === 0 || d1Level >= 5);
        if (buttons[0]) buttons[0].disabled = (d1Level <= 0);

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
    if (buttons[1]) buttons[1].addEventListener('click', () => modifyStat(d1Bar, 1));
    if (buttons[0]) buttons[0].addEventListener('click', () => modifyStat(d1Bar, -1));

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

function resetStats() {
    remainingBudget = TOTAL_BUDGET;
    statsContainers.forEach(container => {
        const bars = container.querySelectorAll('.stats_bar');
        bars.forEach(bar => {
            bar.dataset.level = '0';
            bar.style.setProperty('--level', 0);
        });
    });
    updateStatsUI();
}

// Reset button click handler
if (resetBtn) {
    resetBtn.addEventListener('click', resetStats);
}

// Random button click handler: randomly distributes all $25M across 10 stats
if (randomBtn) {
    randomBtn.addEventListener('click', () => {
        // Collect all 10 bars
        const allBars = [];
        statsContainers.forEach(container => {
            container.querySelectorAll('.stats_bar').forEach(bar => allBars.push(bar));
        });

        if (allBars.length === 0) return;

        // Initialize 10 levels at 0
        const levels = new Array(allBars.length).fill(0);
        let budgetPool = TOTAL_BUDGET; // 25

        // Distribute points randomly until budget is fully exhausted
        while (budgetPool > 0) {
            const availableIndices = [];
            for (let i = 0; i < levels.length; i++) {
                if (levels[i] < 5) availableIndices.push(i);
            }

            if (availableIndices.length === 0) break;

            const chosenIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
            levels[chosenIndex]++;
            budgetPool--;
        }

        // Apply randomized levels to bars
        allBars.forEach((bar, idx) => {
            const lvl = levels[idx];
            bar.dataset.level = lvl;
            bar.style.setProperty('--level', lvl);
        });

        remainingBudget = budgetPool;
        updateStatsUI();
    });
}

// Run initial UI state setup
updateStatsUI();