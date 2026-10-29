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
        carName: 'MERCEDES-AMG F1 W16',
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
        carName: 'SCUDERIA FERRARI SF-25',
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
        carName: 'MCLAREN F1 MCL39',
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
        carName: 'RED BULL RACING RB21',
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
        carName: 'VISA CASH APP RB02',
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
        carName: 'BWT ALPINE F1 A525',
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
        carName: 'MONEYGRAM HAAS VF-25',
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

    // Sync with Garage section
    const garageSection = document.querySelector('#garage');
    const garageCarImg = document.querySelector('#garageCarImg');
    const garageCarName = document.querySelector('#garageCarName');

    if (garageSection && teamInfo.color) {
        garageSection.style.setProperty('--team-color', teamInfo.color);
    }
    if (garageCarImg && teamInfo.car) {
        garageCarImg.src = teamInfo.car;
    }
    if (garageCarName && teamInfo.carName) {
        garageCarName.textContent = teamInfo.carName;
    }

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
            budgetDisplay.innerHTML = `<a href="#garage">CAR TUNING &rarr;</a>`;
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

// Handle smooth scroll when "CAR TUNING" button is clicked
if (budgetDisplay) {
    budgetDisplay.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link) {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetSec = document.querySelector(targetId);
                if (targetSec) {
                    e.preventDefault();
                    smoothScrollTo(targetSec.offsetTop, 1000);
                }
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

// ==========================================
// GARAGE & CAR TUNING LOGIC
// ==========================================
const sliderAero = document.getElementById('sliderAero');
const sliderDiff = document.getElementById('sliderDiff');
const sliderBrake = document.getElementById('sliderBrake');

const valAero = document.getElementById('valAero');
const valDiff = document.getElementById('valDiff');
const valBrake = document.getElementById('valBrake');
const valTyre = document.getElementById('valTyre');

const statTopSpeed = document.getElementById('statTopSpeed');
const statDownforce = document.getElementById('statDownforce');
const statGrip = document.getElementById('statGrip');
const statTyreLife = document.getElementById('statTyreLife');

const deltaVal = document.getElementById('deltaVal');
const radarPolygon = document.getElementById('radarPolygon');
const lockSetupBtn = document.getElementById('lockSetupBtn');

const presetButtons = document.querySelectorAll('.preset_btn');
const tyreButtons = document.querySelectorAll('.tyre_btn');

let currentTyre = 'medium';

const presets = {
    low: {
        aero: 22,
        diff: 85,
        brake: 54,
        tyre: 'soft'
    },
    balanced: {
        aero: 50,
        diff: 70,
        brake: 56,
        tyre: 'medium'
    },
    high: {
        aero: 85,
        diff: 58,
        brake: 58,
        tyre: 'soft'
    }
};

const tyreLabels = {
    soft: 'SOFT (C4)',
    medium: 'MEDIUM (C3)',
    hard: 'HARD (C2)'
};

function updateGarageTelemetry() {
    if (!sliderAero || !sliderDiff || !sliderBrake) return;

    const aero = parseInt(sliderAero.value, 10);
    const diff = parseInt(sliderDiff.value, 10);
    const brake = parseInt(sliderBrake.value, 10);

    // 1. Update numerical displays for tuning controls
    if (valAero) valAero.textContent = `${aero}%`;
    if (valDiff) valDiff.textContent = `${diff}%`;
    if (valBrake) valBrake.textContent = `${brake}% FRONT`;
    if (valTyre) valTyre.textContent = tyreLabels[currentTyre] || 'MEDIUM (C3)';

    // 2. Compute dynamic telemetry values
    // Top Speed (KM/H): Higher aero creates induced drag, reducing top speed
    const topSpeed = Math.round(360 - (aero * 0.44) + ((diff - 70) * 0.08));
    if (statTopSpeed) statTopSpeed.innerHTML = `${topSpeed} <small>KM/H</small>`;

    // Downforce (KG @ 250km/h): Directly scales with aero wing angle
    const downforce = Math.round(480 + (aero * 5.8));
    if (statDownforce) statDownforce.innerHTML = `${downforce} <small>KG</small>`;

    // Lateral Grip (G): Aero downforce + compound grip coefficient
    const tyreGripBonus = currentTyre === 'soft' ? 0.45 : currentTyre === 'medium' ? 0.25 : 0.05;
    const grip = (3.6 + (aero * 0.016) + tyreGripBonus).toFixed(1);
    if (statGrip) statGrip.innerHTML = `${grip} <small>G</small>`;

    // Tyre Life (Laps): Softer compounds and aggressive loads degrade quicker
    const baseLaps = currentTyre === 'soft' ? 18 : currentTyre === 'medium' ? 28 : 42;
    const tyreLife = Math.max(8, Math.round(baseLaps - ((aero - 50) * 0.08) - ((diff - 70) * 0.05)));
    if (statTyreLife) statTyreLife.innerHTML = `${tyreLife} <small>LAPS</small>`;

    // Theoretical Lap Delta vs standard baseline simulation
    const deltaSeconds = ((50 - aero) * 0.0035) - ((diff - 70) * 0.0025) - (tyreGripBonus * 0.7);
    if (deltaVal) {
        if (deltaSeconds <= 0) {
            deltaVal.textContent = `-${Math.abs(deltaSeconds).toFixed(3)}s`;
            deltaVal.style.color = '#00ff88';
        } else {
            deltaVal.textContent = `+${deltaSeconds.toFixed(3)}s`;
            deltaVal.style.color = '#ffaa00';
        }
    }

    // 3. Compute SVG Performance Radar polygon points
    // Center is (100, 100), maximum radius is 75px
    // Axis 1: Top (Speed score: 0 to 100)
    const speedScore = Math.min(95, Math.max(20, Math.round(100 - (aero * 0.8) + 12)));
    const topY = 100 - (speedScore / 100 * 75);

    // Axis 2: Right (Cornering score: 0 to 100)
    const cornerScore = Math.min(95, Math.max(20, Math.round((aero * 0.75) + (currentTyre === 'soft' ? 22 : currentTyre === 'medium' ? 14 : 5))));
    const rightX = 100 + (cornerScore / 100 * 75);

    // Axis 3: Bottom (Acceleration score: 0 to 100)
    const accelScore = Math.min(95, Math.max(20, Math.round((diff * 0.7) + (brake * 0.35))));
    const bottomY = 100 + (accelScore / 100 * 75);

    // Axis 4: Left (Tyre Life score: 0 to 100)
    const baseTyreScore = currentTyre === 'hard' ? 90 : currentTyre === 'medium' ? 65 : 40;
    const tyreScore = Math.min(95, Math.max(20, Math.round(baseTyreScore - ((aero - 50) * 0.15))));
    const leftX = 100 - (tyreScore / 100 * 75);

    if (radarPolygon) {
        radarPolygon.setAttribute('points', `100,${topY.toFixed(1)} ${rightX.toFixed(1)},100 100,${bottomY.toFixed(1)} ${leftX.toFixed(1)},100`);
    }
}

function applyPreset(presetKey) {
    const config = presets[presetKey];
    if (!config) return;

    presetButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.preset === presetKey);
    });

    if (sliderAero) sliderAero.value = config.aero;
    if (sliderDiff) sliderDiff.value = config.diff;
    if (sliderBrake) sliderBrake.value = config.brake;

    setTyreCompound(config.tyre);
}

function setTyreCompound(tyre) {
    currentTyre = tyre;
    tyreButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tyre === tyre);
    });
    updateGarageTelemetry();
}

// Attach slider input listeners
[sliderAero, sliderDiff, sliderBrake].forEach(slider => {
    if (slider) {
        slider.addEventListener('input', () => {
            // When user custom adjusts sliders, un-highlight preset buttons
            presetButtons.forEach(btn => btn.classList.remove('active'));
            updateGarageTelemetry();
        });
    }
});

// Attach preset button clicks
presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const presetKey = btn.dataset.preset;
        applyPreset(presetKey);
    });
});

// Attach tyre compound buttons
tyreButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const tyre = btn.dataset.tyre;
        setTyreCompound(tyre);
    });
});

// Lock Setup button handler
if (lockSetupBtn) {
    lockSetupBtn.addEventListener('click', (e) => {
        const originalText = lockSetupBtn.textContent;
        lockSetupBtn.textContent = 'SETUP CONFIRMED ✓';
        lockSetupBtn.style.backgroundColor = '#00ff88';
        lockSetupBtn.style.color = '#000';
        lockSetupBtn.style.boxShadow = '0 0 25px rgba(0, 255, 136, 0.8)';

        setTimeout(() => {
            lockSetupBtn.textContent = originalText;
            lockSetupBtn.style.backgroundColor = '';
            lockSetupBtn.style.color = '';
            lockSetupBtn.style.boxShadow = '';
        }, 1800);
    });
}

// Initial telemetry calculation on load
updateGarageTelemetry();

// ==========================================
// CIRCUIT SELECTION LOGIC (FIGMA DESIGN)
// ==========================================
const circuitDetails = {
    sepang: {
        name: 'SEPANG',
        location: 'SEPANG INTERNATIONAL CIRCUIT, MALAYSIA',
        bg: 'Assets/Circuits/Sepang.jpg',
        svg: 'Assets/Global/Sepang_Circuit.svg',
        scaleClass: 'scale_default'
    },
    marina_bay: {
        name: 'MARINA BAY',
        location: 'MARINA BAY STREET CIRCUIT, SINGAPORE',
        bg: 'Assets/Circuits/Marina_Bay.jpg',
        svg: 'Assets/Global/MarinaBay_Circuit.svg',
        scaleClass: 'scale_default'
    },
    baku: {
        name: 'BAKU',
        location: 'BAKU CITY CIRCUIT, AZERBAIJAN',
        bg: 'Assets/Circuits/Baku.jpg',
        svg: 'Assets/Global/Baku_Circuit.svg',
        scaleClass: 'scale_baku'
    },
    monza: {
        name: 'MONZA',
        location: 'AUTODROMO NAZIONALE MONZA, ITALY',
        bg: 'Assets/Circuits/Monza.jpg',
        svg: 'Assets/Global/Monza_Circuit.svg',
        scaleClass: 'scale_monza'
    },
    monaco: {
        name: 'MONACO',
        location: 'CIRCUIT DE MONACO, MONTE CARLO',
        bg: 'Assets/Circuits/Monaco.jpg',
        svg: 'Assets/Global/Monaco_Circuit.svg',
        scaleClass: 'scale_monaco'
    },
    hungaroring: {
        name: 'HUNGARORING',
        location: 'HUNGARORING CIRCUIT, HUNGARY',
        bg: 'Assets/Circuits/Hungaroring.jpg',
        svg: 'Assets/Global/Hungaroring_Circuit.svg',
        scaleClass: 'scale_hungaroring'
    },
    bahrain: {
        name: 'BAHRAIN',
        location: 'BAHRAIN INTERNATIONAL CIRCUIT, SAKHIR',
        bg: 'Assets/Circuits/Bahrain.jpg',
        svg: 'Assets/Global/Bahrain_Circuit.svg',
        scaleClass: 'scale_bahrain'
    }
};

const circuitBgActive = document.querySelector('.circuit_bg_active');
const circuitBgNext = document.querySelector('.circuit_bg_next');
const circuitTitle = document.getElementById('circuitTitle');
const circuitSubtitle = document.getElementById('circuitSubtitle');
const circuitTrackImg = document.getElementById('circuitTrackImg');
const circuitCards = document.querySelectorAll('.circuit_card');
const prevCircuitBtn = document.getElementById('prevCircuitBtn');
const nextCircuitBtn = document.getElementById('nextCircuitBtn');
const circuitCarouselContainer = document.getElementById('circuitCarouselContainer');
const raceHereBtn = document.getElementById('raceHereBtn');

let currentCircuitKey = 'sepang';

function selectCircuit(card, isInitial = false) {
    if (!card) return;
    const circuitKey = card.dataset.circuit;
    const info = circuitDetails[circuitKey];
    if (!info) return;

    if (!isInitial && currentCircuitKey === circuitKey) return;
    currentCircuitKey = circuitKey;

    // 1. Highlight active card
    circuitCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    // Scroll active card into view within the horizontal container
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

    // 2. Smooth crossfade background
    if (circuitBgActive && circuitBgNext && info.bg) {
        const newBg = `url("${info.bg}")`;
        if (isInitial) {
            circuitBgActive.style.backgroundImage = newBg;
            circuitBgNext.style.opacity = '0';
        } else {
            circuitBgNext.style.backgroundImage = newBg;
            circuitBgNext.style.opacity = '1';
            setTimeout(() => {
                circuitBgActive.style.backgroundImage = newBg;
                circuitBgNext.style.opacity = '0';
            }, 600);
        }
    }

    // 3. Smooth fade transition for title & subtitle
    if (circuitTitle && circuitSubtitle) {
        if (isInitial) {
            circuitTitle.textContent = info.name;
            circuitSubtitle.textContent = info.location;
        } else {
            circuitTitle.style.opacity = '0';
            circuitSubtitle.style.opacity = '0';
            setTimeout(() => {
                circuitTitle.textContent = info.name;
                circuitSubtitle.textContent = info.location;
                circuitTitle.style.opacity = '1';
                circuitSubtitle.style.opacity = '1';
            }, 200);
        }
    }

    // 4. Update track SVG image (with circuit scale compensation)
    if (circuitTrackImg && info.svg) {
        circuitTrackImg.className = 'circuit_track_img ' + (info.scaleClass || 'scale_default');
        if (isInitial) {
            circuitTrackImg.src = info.svg;
        } else {
            circuitTrackImg.style.opacity = '0';
            setTimeout(() => {
                circuitTrackImg.src = info.svg;
                circuitTrackImg.style.opacity = '1';
            }, 200);
        }
    }
}

// Attach click listeners to circuit cards
circuitCards.forEach(card => {
    card.addEventListener('click', () => selectCircuit(card));
});

// Arrow navigation buttons
if (prevCircuitBtn) {
    prevCircuitBtn.addEventListener('click', () => {
        const cardsArray = Array.from(circuitCards);
        const currentIndex = cardsArray.findIndex(c => c.classList.contains('active'));
        const prevIndex = (currentIndex - 1 + cardsArray.length) % cardsArray.length;
        selectCircuit(cardsArray[prevIndex]);
    });
}

if (nextCircuitBtn) {
    nextCircuitBtn.addEventListener('click', () => {
        const cardsArray = Array.from(circuitCards);
        const currentIndex = cardsArray.findIndex(c => c.classList.contains('active'));
        const nextIndex = (currentIndex + 1) % cardsArray.length;
        selectCircuit(cardsArray[nextIndex]);
    });
}

// ==========================================================================
// FORMULA 1 RACE SIMULATION ENGINE (V2 SPEC)
// Manual Start, 5-Red-Light Countdown, WebAudio & Commentator, Lap Selector (3,5,7),
// Intense Slipstream/Overtake Swerves, Dedicated Full-Page Podium with User Stats
// ==========================================================================

const CIRCUIT_TRACK_DATA = {
    sepang: {
        name: 'SEPANG INTERNATIONAL CIRCUIT',
        country: 'MALAYSIA',
        bg: 'Assets/Circuits/Sepang.jpg',
        viewBox: '0 0 749.19068 614.31634',
        d: 'm351.3 6.7633c-6.8626-0.28675-22.481 6.293-80.975 30.637-24.619 10.246-56.562 22.697-70.984 27.67-14.422 4.9727-33.198 11.478-41.723 14.455-8.525 2.9773-20.067 6.761-25.648 8.4082-52.86 15.6-82.828 49.747-87.797 100.04-4.3882 44.417 0.03301 60.873 23.746 88.404 19.222 22.317 10.9 40.954-13.439 30.102-24.792-11.054-36.699-9.2741-44.955 6.7207-6.9046 13.376-0.78742 24.508 13.75 29.971 2.0052 1.0075 4.1746 1.666 6.4512 1.916 6.8375 1.5658 14.959 2.1192 24.082 1.4062 26.651-2.0827 125.69-10.496 141.31-12.006 10.307-0.99584 64.365-5.4245 73.5-6.0215 5.225-0.34144 13.1-1.0361 17.5-1.543 6.3818-0.73523 60.167-4.9817 145-11.447 3.85-0.29343 13.525-0.98038 21.5-1.5273 13.605-0.93308 92.457-7.1657 132.5-10.473 45.109-3.7254 61.193 2.6455 55.633 22.033-4.479 15.617-5.6662 16.157-54.918 24.975-20.193 3.6151-45.265 8.1066-55.715 9.9824s-30.7 5.4714-45 7.9902-28.925 5.2445-32.5 6.0566c-7.2057 1.637-27.9 5.4701-59 10.926-11.275 1.9779-22.525 4.0205-25 4.541-2.475 0.52047-27.45 5.0451-55.5 10.055-222.02 39.653-221.94 39.636-228.72 46.732-23.594 24.68 28.844 76.231 76.389 75.098 21.167-0.50464 27.062-2.2273 56.479-16.506 57.577-27.947 40.228-34.589 150.51 57.615 16.775 14.025 32.009 26.625 33.854 28 1.8445 1.375 6.9342 5.3036 11.311 8.7305 5.1006 3.994 9.2532 6.4466 11.568 6.832 1.9864 0.33069 3.9774 0.6853 4.4238 0.78906 15.747 3.6601 44.614-42.254 49.213-78.275 5.0862-39.836-2.1236-55.092-37.025-78.352-18.342-12.223-27.823-19.754-28.697-24.838-0.0117-0.78725 0.0672-1.563 0.24219-2.3086 1.7183-3.8471 10.181-6.0551 25.262-8.1758 83.647-11.762 80.638-11.439 160.69-17.369 42.756-3.1673 87.125-6.5822 98-7.5449 20.357-1.8022 22.746-3.7735 30.572-25.201 1.8504-5.0666 5.0164-12.492 7.0352-16.5 13.63-27.063 18.32-17.947-48.531-94.287-73.233-83.628-70.809-81.018-80.551-86.748-9.4272-5.545-24.221-9.8946-31.525-9.2676-3.025 0.25966-8.0559 0.69725-11.18 0.9707-12.676 1.1096-31.595 12.66-42.422 25.9-34.43 42.11-100.77 34.93-122.1-13.23-4.43-10.01-12.15-41.79-18.86-77.63-10.83-57.903-12.42-66.866-12.42-70.054-0.01-3.823-4.7-11.347-9.24-14.815-2.05-1.5623-3.4-2.7255-6.08-2.8377z',
        strokeWidth: 13.5,
        scale: 1.0
    },
    marina_bay: {
        name: 'MARINA BAY STREET CIRCUIT',
        country: 'SINGAPORE',
        bg: 'Assets/Circuits/Marina_Bay.jpg',
        viewBox: '0 0 919.9754 616.13269',
        d: 'm791.8 7.5007c-2.7435 0.036122-5.6028 1.2785-9.0274 3.5469-7.5862 5.0249-9.1617 10.044-10.9 34.719-2.3657 33.574-2.3604 33.609 17.818 97.752 17.455 55.484 20.43 91.368 8.6602 104.46-12.416 13.81-16.25 14.216-94.637 10.027-10.02-0.54-48.59-2.55-85.71-4.48-83.415-4.3297-79.842-4.0301-95.262-8.0293-25.008-6.486-42.472-16.45-172.72-98.545-28.216-17.784-34.614-18.317-42.611-3.5547-1.5254 2.8157-8.6803 15.469-15.9 28.119-7.22 12.65-18.724 33.739-25.564 46.865-18.82 36.115-11.012 38.713-77.938-25.922-22.612-21.838-29.195-24.703-44.594-19.414-0.25968 0.0892-0.48898 0.17701-0.74219 0.26562-1.0048 0.29088-2.0109 0.65321-3.0176 1.1133-0.0139 0.008-0.0271 0.0172-0.041 0.0254-13.393 5.293-18.208 12.812-44.65 62.443-12.783 23.993-36.17 66.123-51.971 93.623-37.559 65.33-35.085 60.19-35.314 73.34l-0.18555 10.654 4.6836 7.5273c5.2719 8.4716 7.294 10.265 24.633 21.859 12.937 8.651 19.728 12.107 23.787 12.107 3.2593 0 4.0198 2.1817 5.3965 15.5 3.7093 35.883 4.5412 37.564 29.266 59.174 6.1792 5.4008 11.684 10.301 12.234 10.889 0.55 0.58762 5.3283 4.7644 10.619 9.2832 11.839 10.112 14.53 13.286 29.369 34.654 15.219 21.916 14.677 21.203 17.012 22.367 6.0713 3.0261 10.398-0.64515 13.395-11.367 1.0661-3.8149 13.967-75.437 21.615-120 20.276-118.14 35.299-189.12 43.18-204 7.7524-14.637 13.512-12.666 41.811 14.309 43.81 41.761 92.519 76.914 111.21 80.262 19.456 3.4844 25.736 5.1091 29.463 7.6211 4.3916 2.9604 3.9275 1.8686 9.2773 21.852 9.0477 33.796 6.9638 32.853 84.047 37.984l53 3.5293 6.1426-2.5957c8.1607-3.4474 9.7622-6.6614 15.404-30.92 6.3022-27.097 4.4331-26.12 44.723-23.389 41.077 2.7844 44.156 4.6191 44.213 26.348 0.0585 22.301 14.838 30.508 57.559 31.965 10.428 0.35572 25.709 1.0404 33.959 1.5215 112.24 6.5453 105.87 7.8395 124.84-25.371 18.631-32.619 18.522-22.916 1.5625-139.51-10.03-68.93-21.65-166.6-24.51-205.99-1.4-19.239-7.82-27.04-21.08-25.619-15.76 1.688-33.13-7.105-44.93-22.752-7.54-9.989-12.36-14.317-17.59-14.248z',
        strokeWidth: 15,
        scale: 1.0
    },
    baku: {
        name: 'BAKU CITY CIRCUIT',
        country: 'AZERBAIJAN',
        bg: 'Assets/Circuits/Baku.jpg',
        viewBox: '0 0 973.76811 286.25468',
        d: 'm956.56 48.501c-8.2205-4.4287-22.017-6.7374-43.835-8.4645-3.3134-0.26228-15.094-1.7509-26.179-3.3079-36.71-5.1562-65.822-8.739-82.953-10.21-9.3047-0.79872-35.087-3.0189-57.293-4.934-35.361-3.0496-78.508-6.4931-103.7-8.2767-4.411-0.31225-11.185-0.88992-15.055-1.283-9.5348-0.96864-16.661 1.179-19.218 5.7907-1.2916 2.3298-3.7245 16.12-7.4719 42.351-3.0563 21.393-6.1506 39.967-6.8762 41.276-1.9621 3.539-3.683 3.634-33.684 1.8505-35.003-2.0808-53.245-2.1776-78.594-0.41405-28.903 2.0109-28.2 1.6546-29.433 14.936-0.93441 10.058-1.415 10.657-10.16 12.655-7.8784 1.7999-71.467 11.969-100.47 16.067-9.276 1.3105-21.869 3.5903-27.984 5.0667-23.846 5.7575-23.626 6.3398-15.087-40.04 7.0413-38.244 6.9975-36.869 1.3223-41.055-2.5323-1.8679-5.2015-4.9194-6.5033-7.4354-1.9263-3.723-3.1616-4.8207-9.6919-8.6003-10.246-5.9299-10.427-6.3524-7.8897-18.441 3.5371-16.851 2.1111-18.172-25.047-23.21-22.602-4.1929-71.237-6.9189-103.87-5.821-38.462 1.2939-37.792 0.95876-75.688 38.045-27.732 27.14-23.441 20.62-47.081 71.545-22.256 47.942-21.67 42.135-6.5625 65.004 5.7338 8.6796 15.807 24.171 22.385 34.425 16.811 26.206 31.747 50.851 41.325 59.359 2.5381 2.2545 3.0157 2.4858 7.2107 3.493 8.6771 2.0832 13.757 0.1561 32.911-12.487 35.133-23.191 37.032-24.118 61.144-29.777 84.747-19.891 76.062-16.119 95.197-41.336 19.368-25.524 18.531-25.059 55.334-30.677 122.06-18.634 115.11-18.091 164.22-12.811 13.596 1.4619 34.354 3.4628 46.129 4.448s43.314 4.0419 70.089 6.7914 58.122 5.7141 69.659 6.5886c11.537 0.87453 36.22 3.2221 54.85 5.2164s56.029 5.8898 83.109 8.6566 50.981 5.306 53.113 5.6425c5.0058 0.78995 65.001 6.4012 70.449 6.589 12.803 0.44158 16.658-19.776 19.435-81.698 0.74306-16.568 1.859-34.586 2.4804-40.042 1.4476-12.712-0.70571-20.455-10.022-25.474z',
        strokeWidth: 14,
        scale: 1.1
    },
    monza: {
        name: 'AUTODROMO NAZIONALE MONZA',
        country: 'ITALY',
        bg: 'Assets/Circuits/Monza.jpg',
        viewBox: '0 0 516.65662 263.83853',
        d: 'm4.1168 29.337c0.31529 7.0558 4.5029 17.045 11.051 32.041 5.5664 12.748 11.227 26.92 12.581 31.494l2.4617 8.3161 4.9113 1.8458c3.6733 1.3807 4.9623 2.4052 5.1167 4.0668 1.4707 15.824 14.607 90.607 17.266 98.292 13.174 38.07 37.939 53.878 83.405 53.242 8.5475-0.11959 15.777-0.10051 16.066 0.0419 0.89783 0.44296 16.804-3.6907 25.946-6.7417 10.262-3.4247 11.317-3.2977 11.731 1.404 0.4861 5.5195-10.851 4.979 107.36 5.1105 18.222 0.0203 53.258 0.31975 77.858 0.66418l44.727 0.62532 26.813-3.3104c41.557-5.1328 54.488-12.178 59.87-32.614 2.5346-9.6255 1.5217-13.709-5.1803-20.862-4.7926-5.1156-7.924-5.7604-29.609-6.1076-10.622-0.17006-56.324-0.87618-101.56-1.5688-104.09-1.5937-99.307-1.2621-104.12-7.2232-5.3784-6.6565-14.936-9.4315-25.946-7.532-8.6364 1.4899-5.0705 3.9952-35.389-24.849-88.19-83.874-79.74-74.371-119-133.8-13.676-20.684-10.76-19.425-35.3-15.25-38.153 6.49-51.665 9.267-51.063 22.737z',
        strokeWidth: 8.5,
        scale: 1.0
    },
    monaco: {
        name: 'CIRCUIT DE MONACO',
        country: 'MONTE CARLO',
        bg: 'Assets/Circuits/Monaco.jpg',
        viewBox: '0 0 411.72235 343.69802',
        d: 'm352.8 4.1504c-13.81 0.8243-23.48 12.177-34.76 18.75-15.132 10.842-32.937 19.166-44.42 34.236-3.8081 11.918 7.2143 21.834 7.6992 33.469 2.3799 12.877-3.9727 27.691-17.039 31.797-21.608 7.9502-44.019-3.3155-66.164-0.58398-15.249 1.2564-30.576 4.4208-45.71 1.0769-13.872-2.7824-28.009-3.0697-42.061-3.0837-20.279-0.65526-40.401-4.4655-60.107-8.5499-9.8358 3.4808-9.1748 16.051-15.302 23.046-9.2645 14.858-16.918 30.931-19.749 48.338-10.382 42.601-16.335 87.914-5.9935 131.09 2.9845 6.9487-1.9927 16.823 5.5254 21.516 8.5182 5.6162 19.511 4.4647 29.15 4.5723 6.3627-3.221 3.5124-12.152-0.89324-15.875-6.8457-7.1679-11.759-15.961-14.144-25.596-4.1818-13.935-6.0953-29.779-0.05469-43.404 4.8274-5.2939 10.31-10.783 10.423-18.477 2.5399-11.575 5.598-24.511-0.11424-35.558-6.7172-18.477 1.3628-38.363 12.014-53.545 5.3451-6.2228 10.439-14.267 18.566-16.574 12.2-1.5865 24.011 3.4785 36.021 4.8867 20.127 4.04 40.985 5.4105 60.521 11.713 5.4989 3.2393 13.36 5.9094 18.477 0.5171 10.835-5.0042 22.484 1.5092 33.75 0.85938 45.376 3.648 94.373-5.7234 129.19-36.775 23.603-21.125 44.441-46.111 58.145-74.801 3.2737-6.3889 3.6047-17.129-4.7976-19.494-8.795-2.811-18.662-1.7299-27.287 1.0391-6.7679 3.5504-5.7201 12.534-1.7773 17.836 2.2246 4.0916 6.7494 10.278 2.7715 14.559-5.2639 1.897-12.792-1.8673-11.882-8.136-1.2118-9.6578-5.9329-20.115-0.9949-29.337 1.655-3.8575-0.53501-8.6517-4.8828-9.2363 2.5888 1.5696-3.0196-1.1724-4.1191-0.27539z',
        strokeWidth: 8.2,
        scale: 1.0
    },
    hungaroring: {
        name: 'HUNGARORING CIRCUIT',
        country: 'HUNGARY',
        bg: 'Assets/Circuits/Hungaroring.jpg',
        viewBox: '0 0 437.73771 461.30649',
        d: 'm387.82 2.658c-1.3976 0.13788-3.0121 0.73034-4.5684 1.7734-6.4971 4.3546-7.8488 8.7029-9.3379 30.086-2.0267 29.091-2.0222 29.121 15.266 84.697 14.954 48.077 17.502 79.17 7.4199 90.514-10.637 11.966-13.922 12.318-81.082 8.6875-8.5843-0.46789-41.628-2.2096-73.43-3.8828-71.464-3.7516-68.404-3.4921-81.613-6.957-21.425-5.6199-36.387-14.253-147.97-85.385-24.173-15.409-29.655-15.871-36.506-3.0781-1.3068 2.4398-7.4367 13.404-13.623 24.365-6.1856 10.961-16.041 29.234-21.902 40.607-16.124 31.293-9.4342 33.544-66.771-22.461-19.372-18.922-25.012-21.405-38.205-16.822-0.22247 0.0773-0.41892 0.15338-0.63477 0.23047-0.86083 0.25204-1.7228 0.56598-2.5859 0.96484-0.01191 0.0069-0.02322 0.01491-0.03516 0.02148-11.474 4.5863-15.6 11.102-38.252 54.105-10.952 20.79-30.987 57.295-44.523 81.123-32.178 56.607-30.059 52.153-30.256 63.547l-0.1582 9.2324 4.0137 6.5234c4.5165 7.3404 6.2489 8.8943 21.104 18.939 11.083 7.4958 16.901 10.49 20.379 10.49 2.7923 0 3.4439 1.8897 4.623 13.43 3.1778 31.092 3.8906 32.548 25.074 51.271 5.2938 4.6797 10.01 8.9254 10.48 9.4355 0.4712 0.50916 4.5649 4.1282 9.0977 8.0449 10.143 8.7618 12.448 11.512 25.162 30.027 13.038 18.99 12.574 18.372 14.574 19.381 5.2014 2.622 8.908-0.559 11.477-9.8496 0.91335-3.3055 11.966-65.364 18.518-103.98 17.371-102.37 30.241-163.87 36.992-176.76 6.6417-12.683 11.576-10.975 35.82 12.398 37.533 36.185 79.262 66.644 95.277 69.545 16.668 3.0191 22.049 4.4269 25.242 6.6035 3.7624 2.5651 3.3647 1.6191 7.9492 18.934 7.7513 29.283 5.966 28.466 72.006 32.912l45.406 3.0586 5.2617-2.248c6.9915-2.9871 8.3635-5.772 13.197-26.791 5.3992-23.479 3.7979-22.632 38.314-20.266 35.191 2.4126 37.829 4.0023 37.879 22.828 0.0501 19.323 12.712 26.434 49.311 27.697 8.9339 0.30822 22.025 0.90148 29.094 1.3184 96.158 5.6713 90.702 6.7928 106.95-21.982 15.962-28.264 15.868-19.856 1.3379-120.88-8.5929-59.726-18.548-144.35-21.002-178.48-1.1994-16.67-6.6996-23.429-18.061-22.197-13.502 1.4626-28.383-6.1564-38.492-19.715-6.4597-8.6552-10.589-12.405-15.068-12.346z',
        strokeWidth: 9.5,
        scale: 1.0
    },
    bahrain: {
        name: 'BAHRAIN INTERNATIONAL CIRCUIT',
        country: 'SAKHIR',
        bg: 'Assets/Circuits/Bahrain.jpg',
        viewBox: '0 0 431.76266 282.2795',
        d: 'm406.84 274.65c-20.91-1.07-56.12-2.31-78.25-2.76-22.12-0.45-70.36-1.57-107.19-2.5-36.83-0.93-97.39-2.22-134.58-2.87-57.067-1-68.566-1.57-73.491-3.64-7.469-3.13-10.455-7.79-11.237-17.52-0.5699-7.09 1.109-12.63 7.828-26.04 7.643-15.26 9.689-20.94 14.802-41.09 5.864-23.11 8.877-38.2 13.918-70 2.259-14.24 3.097-15.65 9.071-15.27 4.09 0.27 12.82 2.82 23.36 6.84 22.88 8.74 38.64 13.88 47.93 15.62 13.15 2.47 16.29 1.34 22.38-8.03 2.1-3.23 7.62-13.56 12.26-22.95 10.37-20.96 11.23-22.28 17.55-26.83 5.48-3.94 8.73-4.57 23.51-4.52 14.77 0.06 18.29 0.81 24.36 5.2 6.55 4.73 8.32 8.01 18.3 33.87 8.3 21.5 9.47 23.63 15.93 28.91 8.24 6.74 15.42 8.75 30.65 8.57 6.42-0.08 17.06-0.34 23.64-0.59 13.25-0.48 24.58-2.18 31.81-4.74 3.96-1.4 12.72-6.52 16.55-9.67 1.83-1.5 2.15-1.5 6.08 0 8.35 3.2 12.86 3.19 19.34-0.02 5.6-2.79 7.21-4.49 14.39-15.21 4.76-7.1 8.91-12.91 9.23-12.91 0.32 0 3.06 3.73 6.09 8.28 9.01 13.57 12.72 17.76 19.78 22.25 7.15 4.54 13.85 6.64 23.56 7.37 9.8 0.74 11.83 1.25 15.11 3.79 4.96 3.86 6.71 8.53 7.6 20.25 1.52 20.08 1.48 27.27-0.31 49-2.07 25.13-2.06 25.21 3.52 30.34 2.8 2.58 3.59 3.99 3.59 6.45 0 2.21-1.37 4.57-4.14 7.15-5.96 5.53-24.89 25.75-26.68 28.52-2.73 4.22-7.53 6.35-18.73 8.29-6.3 1.1-23.71 1.23-53.72 0.39z',
        strokeWidth: 10,
        scale: 1.0
    }
};

const GRID_DRIVERS = [
    { id: 'ver', code: 'VER', name: 'Max Verstappen', team: 'red_bulls', teamName: 'RED BULL', color: '#3671C6', initial: 'V', tyre: 'M', photo: 'Assets/Red_Bulls/Max.webp', baseTier: 1 },
    { id: 'ant', code: 'ANT', name: 'Kimi Antonelli', team: 'mercedes', teamName: 'MERCEDES', color: '#27F4D2', initial: 'K', tyre: 'M', photo: 'Assets/Mercedes/Kimi.webp', baseTier: 2 },
    { id: 'ham', code: 'HAM', name: 'Lewis Hamilton', team: 'ferrari', teamName: 'FERRARI', color: '#E80020', initial: 'H', tyre: 'M', photo: 'Assets/Ferrari/Lewis.webp', baseTier: 1 },
    { id: 'lec', code: 'LEC', name: 'Charles Leclerc', team: 'ferrari', teamName: 'FERRARI', color: '#E80020', initial: 'L', tyre: 'M', photo: 'Assets/Ferrari/Charles.webp', baseTier: 1 },
    { id: 'had', code: 'HAD', name: 'Isack Hadjar', team: 'red_bulls', teamName: 'RED BULL', color: '#3671C6', initial: 'H', tyre: 'M', photo: 'Assets/Red_Bulls/Isack.webp', baseTier: 3 },
    { id: 'pia', code: 'PIA', name: 'Oscar Piastri', team: 'mclaren', teamName: 'MCLAREN', color: '#FF8000', initial: 'P', tyre: 'M', photo: 'Assets/Mclaren/Oscar.webp', baseTier: 1 },
    { id: 'law', code: 'LAW', name: 'Liam Lawson', team: 'racing_bulls', teamName: 'RACING BULLS', color: '#6692FF', initial: 'L', tyre: 'M', photo: 'Assets/Racing_Bulls/Liam.webp', baseTier: 3 },
    { id: 'alo', code: 'ALO', name: 'Fernando Alonso', team: 'aston_martin', teamName: 'ASTON MARTIN', color: '#229971', initial: 'A', tyre: 'M', photo: 'Assets/Global/F1.svg', baseTier: 2 },
    { id: 'nor', code: 'NOR', name: 'Lando Norris', team: 'mclaren', teamName: 'MCLAREN', color: '#FF8000', initial: 'N', tyre: 'M', photo: 'Assets/Mclaren/Lando.webp', baseTier: 1 },
    { id: 'lin', code: 'LIN', name: 'Arvid Lindblad', team: 'racing_bulls', teamName: 'RACING BULLS', color: '#6692FF', initial: 'L', tyre: 'M', photo: 'Assets/Racing_Bulls/Arvid.webp', baseTier: 4 },
    { id: 'hul', code: 'HUL', name: 'Nico Hülkenberg', team: 'sauber', teamName: 'SAUBER', color: '#52E252', initial: 'H', tyre: 'M', photo: 'Assets/Global/F1.svg', baseTier: 4 },
    { id: 'str', code: 'STR', name: 'Lance Stroll', team: 'aston_martin', teamName: 'ASTON MARTIN', color: '#229971', initial: 'S', tyre: 'M', photo: 'Assets/Global/F1.svg', baseTier: 3 },
    { id: 'col', code: 'COL', name: 'Franco Colapinto', team: 'alpine', teamName: 'ALPINE', color: '#FF87BC', initial: 'C', tyre: 'M', photo: 'Assets/Alpine/Franco.webp', baseTier: 4 },
    { id: 'bea', code: 'BEA', name: 'Oliver Bearman', team: 'haas', teamName: 'HAAS', color: '#E6002B', initial: 'B', tyre: 'S', photo: 'Assets/Haas/Oliver.webp', baseTier: 4 },
    { id: 'oco', code: 'OCO', name: 'Esteban Ocon', team: 'haas', teamName: 'HAAS', color: '#E6002B', initial: 'O', tyre: 'M', photo: 'Assets/Haas/Esteban.webp', baseTier: 3 },
    { id: 'gas', code: 'GAS', name: 'Pierre Gasly', team: 'alpine', teamName: 'ALPINE', color: '#FF87BC', initial: 'G', tyre: 'H', photo: 'Assets/Alpine/Pierre.webp', baseTier: 3 },
    { id: 'sai', code: 'SAI', name: 'Carlos Sainz', team: 'williams', teamName: 'WILLIAMS', color: '#64C4FF', initial: 'S', tyre: 'M', photo: 'Assets/Global/F1.svg', baseTier: 3 },
    { id: 'bor', code: 'BOR', name: 'Gabriel Bortoleto', team: 'sauber', teamName: 'SAUBER', color: '#52E252', initial: 'B', tyre: 'M', photo: 'Assets/Global/F1.svg', baseTier: 5 },
    { id: 'per', code: 'PER', name: 'Sergio Pérez', team: 'red_bulls', teamName: 'RED BULL', color: '#3671C6', initial: 'P', tyre: 'H', photo: 'Assets/Red_Bulls/Max.webp', baseTier: 2 },
    { id: 'rus', code: 'RUS', name: 'George Russell', team: 'mercedes', teamName: 'MERCEDES', color: '#27F4D2', initial: 'R', tyre: 'H', photo: 'Assets/Mercedes/George.webp', baseTier: 1 }
];

// Race Simulation State
let activeRaceCircuitKey = 'sepang';
let activeUserTeamKey = 'mercedes';
let raceSimSpeed = 1;
let isRaceRunning = false;
let isCountdownActive = false;
let raceAnimationReqId = null;
let raceLastFrameTime = 0;
let raceElapsedTime = 0;
let RACE_TOTAL_LAPS = 5; // Default 5 laps (Options: 3, 5, 7)
const RACE_LAP_SECONDS = 60; // Base 1 minute per lap
let raceCars = [];
let raceLeaderLap = 1;
let isRaceSessionFinished = false;
let raceCommentaryHistory = [];
let audioMuted = false;

// DOM Elements for Race Section
const raceSection = document.getElementById('race');
const raceBg = document.getElementById('raceBg');
const raceLiveDot = document.getElementById('raceLiveDot');
const raceStatusText = document.getElementById('raceStatusText');
const racePlayPauseBtn = document.getElementById('racePlayPauseBtn');
const racePlayIcon = document.getElementById('racePlayIcon');
const racePlayText = document.getElementById('racePlayText');
const raceRestartBtn = document.getElementById('raceRestartBtn');
const raceAudioBtn = document.getElementById('raceAudioBtn');
const audioIcon = document.getElementById('audioIcon');
const audioText = document.getElementById('audioText');
const speedBtns = document.querySelectorAll('.speed_btn');
const lapBtns = document.querySelectorAll('.lap_btn');

const raceLapCurrentEl = document.getElementById('raceLapCurrent');
const raceLapTotalEl = document.getElementById('raceLapTotal');
const raceTowerList = document.getElementById('raceTowerList');
const commentaryFeed = document.getElementById('commentaryFeed');

// Start Gantry Elements
const raceGantryOverlay = document.getElementById('raceGantryOverlay');
const gantryStatus = document.getElementById('gantryStatus');
const gantryLaunchBtn = document.getElementById('gantryLaunchBtn');
const gantryPods = [
    document.getElementById('light1'),
    document.getElementById('light2'),
    document.getElementById('light3'),
    document.getElementById('light4'),
    document.getElementById('light5')
];

const raceTrackSvg = document.getElementById('raceTrackSvg');
const raceTrackGlowPath = document.getElementById('raceTrackGlowPath');
const raceTrackPath = document.getElementById('raceTrackPath');
const raceFinishLine = document.getElementById('raceFinishLine');
const raceBubblesGroup = document.getElementById('raceBubblesGroup');

// Podium Elements
const podiumSection = document.getElementById('podium');
const podiumBg = document.getElementById('podiumBg');
const podiumCircuitInfo = document.getElementById('podiumCircuitInfo');
const p1DriverImg = document.getElementById('p1DriverImg');
const p1DriverName = document.getElementById('p1DriverName');
const p1DriverTeam = document.getElementById('p1DriverTeam');
const p2DriverImg = document.getElementById('p2DriverImg');
const p2DriverName = document.getElementById('p2DriverName');
const p2DriverTeam = document.getElementById('p2DriverTeam');
const p3DriverImg = document.getElementById('p3DriverImg');
const p3DriverName = document.getElementById('p3DriverName');
const p3DriverTeam = document.getElementById('p3DriverTeam');
const reportTeamTitle = document.getElementById('reportTeamTitle');
const reportPointsEarned = document.getElementById('reportPointsEarned');
const reportDriverFinishes = document.getElementById('reportDriverFinishes');

const metricReactions = document.getElementById('metricReactions');
const metricReactionsVal = document.getElementById('metricReactionsVal');
const metricPace = document.getElementById('metricPace');
const metricPaceVal = document.getElementById('metricPaceVal');
const metricStamina = document.getElementById('metricStamina');
const metricStaminaVal = document.getElementById('metricStaminaVal');
const metricFocus = document.getElementById('metricFocus');
const metricFocusVal = document.getElementById('metricFocusVal');

const reportDownforce = document.getElementById('reportDownforce');
const reportSuspension = document.getElementById('reportSuspension');
const reportGears = document.getElementById('reportGears');
const reportTyre = document.getElementById('reportTyre');
const reportDelta = document.getElementById('reportDelta');

const podiumRaceAgainBtn = document.getElementById('podiumRaceAgainBtn');
const podiumChangeTrackBtn = document.getElementById('podiumChangeTrackBtn');
const podiumLockedState = document.getElementById('podiumLockedState');
const podiumContent = document.getElementById('podiumContent');
const backToTopBtn = document.getElementById('backToTopBtn');

// ==========================================================================
// BROADCAST COMMENTARY AUDIO (LOOPING WITH LAST 3 SECONDS CUT)
// ==========================================================================
const commentaryAudio = new Audio('Assets/Global/Commentary.mp3');
commentaryAudio.preload = 'auto';
commentaryAudio.volume = 0.85;
commentaryAudio.loop = false; // Managed manually to remove the last 3 seconds

// Continuous loop cutting the last 3 seconds
commentaryAudio.addEventListener('timeupdate', () => {
    if (commentaryAudio.duration && commentaryAudio.currentTime >= commentaryAudio.duration - 3.0) {
        commentaryAudio.currentTime = 0;
        if (!commentaryAudio.paused) {
            commentaryAudio.play().catch(() => {});
        }
    }
});

function playCommentaryAudio() {
    if (audioMuted) return;
    commentaryAudio.play().catch(() => {});
}

function pauseCommentaryAudio() {
    commentaryAudio.pause();
}

function resetCommentaryAudio() {
    commentaryAudio.pause();
    commentaryAudio.currentTime = 0;
}

// ==========================================================================
// WEB AUDIO & COMMENTARY SYNTHESIZER
// ==========================================================================
let audioCtx = null;
let engineOsc1 = null;
let engineOsc2 = null;
let engineGain = null;

function getAudioContext() {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
            audioCtx = new AudioContextClass();
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

// 1. Play Gantry Beep
function playGantryBeep(freq = 540, duration = 0.22) {
    if (audioMuted) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch (e) {}
}

// 2. Play Launch Chime (Lights Out!)
function playLaunchChime() {
    if (audioMuted) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        [880, 1108, 1320].forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5 + idx * 0.1);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.6);
        });
    } catch (e) {}
}

// 3. Start Procedural F1 Engine Sound
function startEngineSound() {
    if (audioMuted || engineGain) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        engineOsc1 = ctx.createOscillator();
        engineOsc2 = ctx.createOscillator();
        engineGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        engineOsc1.type = 'sawtooth';
        engineOsc1.frequency.setValueAtTime(140, ctx.currentTime);

        engineOsc2.type = 'triangle';
        engineOsc2.frequency.setValueAtTime(70, ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(650, ctx.currentTime);

        engineGain.gain.setValueAtTime(0.04, ctx.currentTime);

        engineOsc1.connect(filter);
        engineOsc2.connect(filter);
        filter.connect(engineGain);
        engineGain.connect(ctx.destination);

        engineOsc1.start();
        engineOsc2.start();
    } catch (e) {}
}

// 4. Modulate Engine Sound dynamically based on race throttle
function modulateEngineSound(revRate = 1.0) {
    if (!engineOsc1 || !audioCtx || audioMuted) return;
    try {
        const targetFreq = 140 + revRate * 120 + Math.sin(Date.now() * 0.006) * 35;
        engineOsc1.frequency.setTargetAtTime(targetFreq, audioCtx.currentTime, 0.1);
    } catch (e) {}
}

// 5. Stop Procedural F1 Engine Sound
function stopEngineSound() {
    if (engineGain && audioCtx) {
        try {
            engineGain.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.15);
            setTimeout(() => {
                if (engineOsc1) { try { engineOsc1.stop(); } catch(e){} }
                if (engineOsc2) { try { engineOsc2.stop(); } catch(e){} }
                engineOsc1 = null;
                engineOsc2 = null;
                engineGain = null;
            }, 200);
        } catch(e) {}
    }
}

// 6. Commentator Voice (Removed per user request: only Commentary.mp3 audio plays in the background)
function speakCommentary(text) {
    // Disabled - only background commentary audio (Commentary.mp3) plays
}

// Toggle Audio Button
if (raceAudioBtn) {
    raceAudioBtn.addEventListener('click', () => {
        audioMuted = !audioMuted;
        if (audioMuted) {
            commentaryAudio.muted = true;
            pauseCommentaryAudio();
            stopEngineSound();
            if (window.speechSynthesis) window.speechSynthesis.cancel();
            if (audioIcon) audioIcon.textContent = '🔇';
            if (audioText) audioText.textContent = 'MUTED';
            raceAudioBtn.classList.add('muted');
        } else {
            commentaryAudio.muted = false;
            getAudioContext();
            if (isRaceRunning) {
                playCommentaryAudio();
                startEngineSound();
            }
            if (audioIcon) audioIcon.textContent = '🔊';
            if (audioText) audioText.textContent = 'SOUND ON';
            raceAudioBtn.classList.remove('muted');
        }
    });
}

// ==========================================================================
// SETUP CIRCUIT AND SVG TRACK
// ==========================================================================
function setupRaceCircuit(circuitKey) {
    if (!CIRCUIT_TRACK_DATA[circuitKey]) circuitKey = 'sepang';
    activeRaceCircuitKey = circuitKey;
    const data = CIRCUIT_TRACK_DATA[circuitKey];

    // Background
    if (raceBg) {
        raceBg.style.backgroundImage = `url('${data.bg}')`;
    }
    if (podiumBg) {
        podiumBg.style.backgroundImage = `url('${data.bg}')`;
    }

    // SVG Viewbox and Paths
    if (raceTrackSvg && raceTrackPath && raceTrackGlowPath) {
        raceTrackSvg.setAttribute('viewBox', data.viewBox);
        raceTrackPath.setAttribute('d', data.d);
        raceTrackGlowPath.setAttribute('d', data.d);

        // Standard SVG scaling without over-enlarging
        raceTrackSvg.style.transform = 'none';

        const sw = data.strokeWidth || 13;
        raceTrackPath.setAttribute('stroke-width', sw);
        raceTrackGlowPath.setAttribute('stroke-width', sw * 1.6);

        // Calculate and align Start/Finish perpendicular line
        try {
            const totalLen = raceTrackPath.getTotalLength();
            if (totalLen > 0) {
                const p0 = raceTrackPath.getPointAtLength(0);
                const p1 = raceTrackPath.getPointAtLength(Math.min(8, totalLen * 0.01));
                const dx = p1.x - p0.x;
                const dy = p1.y - p0.y;
                const len = Math.hypot(dx, dy) || 1;
                const nx = -dy / len;
                const ny = dx / len;
                const halfWidth = sw * 1.8;

                if (raceFinishLine) {
                    raceFinishLine.setAttribute('x1', p0.x - nx * halfWidth);
                    raceFinishLine.setAttribute('y1', p0.y - ny * halfWidth);
                    raceFinishLine.setAttribute('x2', p0.x + nx * halfWidth);
                    raceFinishLine.setAttribute('y2', p0.y + ny * halfWidth);
                }
            }
        } catch (e) {
            console.warn('SVG path measurement error:', e);
        }
    }

    buildDriverBubbles();
    initRaceSession();
}

function updateRaceUserTeam(teamKey) {
    if (!teamKey || !teamDetails[teamKey]) {
        teamKey = 'mercedes';
    }
    activeUserTeamKey = teamKey;
    initRaceSession();
}

// Build SVG Bubbles for All 20 Cars
function buildDriverBubbles() {
    if (!raceBubblesGroup) return;
    raceBubblesGroup.innerHTML = '';

    GRID_DRIVERS.forEach(driver => {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', 'driver_bubble');
        g.setAttribute('data-id', driver.id);
        g.setAttribute('id', 'bubble_' + driver.id);

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '0');
        circle.setAttribute('cy', '0');
        circle.setAttribute('r', '13.5');
        circle.setAttribute('fill', driver.color);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dy', '4.2');
        text.textContent = driver.initial;

        const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        title.textContent = `${driver.name} (${driver.code}) - ${driver.teamName}`;

        g.appendChild(circle);
        g.appendChild(text);
        g.appendChild(title);

        raceBubblesGroup.appendChild(g);
    });
}

// ==========================================================================
// INITIALIZE RACE SESSION & WEIGHTED PODIUM PROBABILITY
// ==========================================================================
function initRaceSession() {
    isRaceRunning = false;
    isCountdownActive = false;
    if (raceAnimationReqId) cancelAnimationFrame(raceAnimationReqId);
    stopEngineSound();
    resetCommentaryAudio();

    // Reset podium to empty/pending state before race finishes
    if (podiumLockedState) podiumLockedState.style.display = 'flex';
    if (podiumContent) podiumContent.style.display = 'none';

    raceElapsedTime = 0;
    raceLeaderLap = 1;
    isRaceSessionFinished = false;
    raceCommentaryHistory = [];

    if (raceLapCurrentEl) raceLapCurrentEl.textContent = '1';
    if (raceLapTotalEl) raceLapTotalEl.textContent = RACE_TOTAL_LAPS;
    if (raceStatusText) raceStatusText.textContent = 'GRID FORMATION // READY TO START';
    if (raceLiveDot) raceLiveDot.className = 'live_dot stopped';
    if (racePlayIcon) racePlayIcon.innerHTML = '&#9654;';
    if (racePlayText) racePlayText.textContent = 'START RACE';
    if (commentaryFeed) commentaryFeed.innerHTML = '';

    // Reset Gantry pods
    gantryPods.forEach(p => { if (p) p.className = 'gantry_pod'; });
    if (gantryStatus) gantryStatus.textContent = 'PRESS START TO INITIATE 5-RED-LIGHT COUNTDOWN';
    if (raceGantryOverlay) raceGantryOverlay.classList.remove('hidden');

    // Identify user drivers
    const userDrivers = GRID_DRIVERS.filter(d => d.team === activeUserTeamKey);
    const primaryDriver = userDrivers[0] || GRID_DRIVERS.find(d => d.code === 'RUS');
    const secondaryDriver = userDrivers[1] || GRID_DRIVERS.find(d => d.code === 'ANT');

    // === USER REQUESTED WEIGHTED PODIUM PROBABILITY ===
    // Primary driver: 40% 1st, 30% 2nd, 20% 3rd, 10% other
    const r1 = Math.random();
    let primaryTarget;
    if (r1 < 0.40) {
        primaryTarget = 1; // 40%
    } else if (r1 < 0.70) {
        primaryTarget = 2; // 30%
    } else if (r1 < 0.90) {
        primaryTarget = 3; // 20%
    } else {
        primaryTarget = Math.floor(Math.random() * 3) + 4; // 10% P4-P6
    }

    // Secondary driver: high chance of joining on podium or top 6
    const availablePodium = [1, 2, 3].filter(p => p !== primaryTarget);
    const r2 = Math.random();
    let secondaryTarget;
    if (primaryTarget <= 3) {
        if (r2 < 0.35 && availablePodium.length > 0) {
            secondaryTarget = availablePodium[0];
        } else if (r2 < 0.65 && availablePodium.length > 1) {
            secondaryTarget = availablePodium[1];
        } else if (r2 < 0.85) {
            secondaryTarget = primaryTarget === 1 ? 2 : (primaryTarget === 2 ? 3 : 4);
        } else {
            secondaryTarget = Math.floor(Math.random() * 4) + 4; // P4-P7
        }
    } else {
        if (r2 < 0.40) secondaryTarget = 1;
        else if (r2 < 0.70) secondaryTarget = 2;
        else if (r2 < 0.90) secondaryTarget = 3;
        else secondaryTarget = 4;
    }

    // Build available target positions 1..20
    const assignedPositions = {};
    assignedPositions[primaryDriver.id] = primaryTarget;
    assignedPositions[secondaryDriver.id] = secondaryTarget;

    const usedPositions = new Set([primaryTarget, secondaryTarget]);
    const remainingPositions = [];
    for (let p = 1; p <= 20; p++) {
        if (!usedPositions.has(p)) remainingPositions.push(p);
    }

    // Sort other 18 drivers by base tier + random jitter
    const otherDrivers = GRID_DRIVERS.filter(d => d.id !== primaryDriver.id && d.id !== secondaryDriver.id);
    otherDrivers.sort((a, b) => (a.baseTier + Math.random() * 1.5) - (b.baseTier + Math.random() * 1.5));

    otherDrivers.forEach((driver, idx) => {
        assignedPositions[driver.id] = remainingPositions[idx] || (idx + 1);
    });

    // 1 DNF candidate for mid-race incident
    let dnfCandidate = otherDrivers[otherDrivers.length - 1];

    // Initialize cars on the starting grid
    raceCars = GRID_DRIVERS.map(driver => {
        const targetPos = assignedPositions[driver.id] || 10;
        const isUserTeam = driver.team === activeUserTeamKey;

        // Position staggered along starting straight
        const gridIndex = targetPos <= 3 ? (targetPos + Math.floor(Math.random() * 2)) : targetPos;
        const initialProgress = -0.015 * gridIndex;

        const speedFactor = 1.0 + (21 - targetPos) * 0.0035;
        const progressSpeed = (1 / RACE_LAP_SECONDS) * speedFactor;

        return {
            ...driver,
            targetPos,
            isUserTeam,
            progress: initialProgress,
            lap: 1,
            distance: initialProgress,
            speed: progressSpeed,
            baseSpeed: progressSpeed,
            laneOffset: (Math.random() * 1.4 - 0.7),
            isPassing: false,
            passTimer: 0,
            hasDRS: false,
            status: 'RUNNING',
            gap: '0.000',
            currentPos: targetPos,
            isDNF: driver.id === dnfCandidate.id,
            dnfLap: Math.max(2, RACE_TOTAL_LAPS - 1),
            hasDNFed: false,
            bubbleEl: document.getElementById('bubble_' + driver.id)
        };
    });

    renderTimingTower();
    alignCarsOnGrid();
}

// Align driver bubbles statically on starting grid
function alignCarsOnGrid() {
    let totalPathLength = 0;
    try {
        if (raceTrackPath) totalPathLength = raceTrackPath.getTotalLength();
    } catch(e) {}
    if (totalPathLength <= 0) return;

    raceCars.forEach(car => {
        if (car.bubbleEl) {
            const lapFraction = ((car.progress % 1.0) + 1.0) % 1.0;
            const trackDist = lapFraction * totalPathLength;
            try {
                const pt = raceTrackPath.getPointAtLength(trackDist);
                car.bubbleEl.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
            } catch(e) {}
        }
    });
}

// ==========================================================================
// 5 RED LIGHTS START GANTRY SEQUENCE (USER-INITIATED START)
// ==========================================================================
function triggerStartSequence() {
    if (isRaceRunning || isCountdownActive) return;
    isCountdownActive = true;
    getAudioContext();

    if (raceStatusText) raceStatusText.textContent = 'FORMATION GRID // 5 RED LIGHTS COUNTDOWN';
    if (gantryStatus) gantryStatus.textContent = 'WAITING FOR 5 RED LIGHTS...';
    if (gantryLaunchBtn) gantryLaunchBtn.style.display = 'none';

    let currentLight = 0;

    const lightInterval = setInterval(() => {
        if (currentLight < 5) {
            if (gantryPods[currentLight]) {
                gantryPods[currentLight].classList.add('lit');
            }
            playGantryBeep(520 + currentLight * 35, 0.22);
            currentLight++;
            if (gantryStatus) gantryStatus.textContent = `LIGHT ${currentLight} ON // HOLD REVS`;
        } else {
            clearInterval(lightInterval);

            // Random FIA delay between 0.8s and 1.6s
            const fiaDelay = 800 + Math.random() * 800;
            if (gantryStatus) gantryStatus.textContent = 'ALL 5 RED LIGHTS ON... WAITING FOR LIGHTS OUT!';

            setTimeout(() => {
                // LIGHTS OUT AND AWAY WE GO!
                gantryPods.forEach(p => {
                    if (p) {
                        p.classList.remove('lit');
                        p.classList.add('go');
                    }
                });

                playLaunchChime();
                speakCommentary("It's lights out and away we go!");
                addCommentaryEvent('LIGHTS OUT AND AWAY WE GO! 5 RED LIGHTS EXTINGUISHED!');

                if (gantryStatus) gantryStatus.textContent = 'GO! GO! GO! LIGHTS OUT!';
                if (raceLiveDot) raceLiveDot.className = 'live_dot';
                if (raceStatusText) raceStatusText.textContent = 'GREEN FLAG // SESSION LIVE';

                setTimeout(() => {
                    if (raceGantryOverlay) raceGantryOverlay.classList.add('hidden');
                    gantryPods.forEach(p => { if (p) p.className = 'gantry_pod'; });
                    if (gantryLaunchBtn) gantryLaunchBtn.style.display = '';
                    isCountdownActive = false;
                }, 900);

                // Start actual race simulation
                isRaceRunning = true;
                raceLastFrameTime = 0;
                startEngineSound();
                playCommentaryAudio();
                if (racePlayIcon) racePlayIcon.innerHTML = '&#10074;&#10074;';
                if (racePlayText) racePlayText.textContent = 'PAUSE';
                raceAnimationReqId = requestAnimationFrame(animateRace);
            }, fiaDelay);
        }
    }, 850);
}

// Render Timing Tower (20 rows)
function renderTimingTower() {
    if (!raceTowerList) return;

    const sorted = [...raceCars].sort((a, b) => {
        if (a.status === 'DNF' && b.status !== 'DNF') return 1;
        if (b.status === 'DNF' && a.status !== 'DNF') return -1;
        return b.distance - a.distance;
    });

    const leader = sorted[0] || { distance: 0 };

    let html = '';
    sorted.forEach((car, index) => {
        car.currentPos = index + 1;
        const isUser = car.isUserTeam ? 'user_team' : '';

        let gapStr = '';
        if (car.status === 'DNF') {
            gapStr = '<span class="row_gap dnf">DNF</span>';
        } else if (index === 0) {
            gapStr = '<span class="row_gap">Leader</span>';
        } else {
            const timeDiff = Math.max(0.12, (leader.distance - car.distance) * RACE_LAP_SECONDS);
            gapStr = `<span class="row_gap">+${timeDiff.toFixed(3)}s</span>`;
        }

        const tyreClass = car.tyre === 'S' ? 'tyre_s' : (car.tyre === 'H' ? 'tyre_h' : 'tyre_m');

        html += `
            <div class="tower_row ${isUser}">
                <span class="row_pos">${index + 1}</span>
                <span class="row_team_bar" style="background-color: ${car.color};"></span>
                <span class="row_driver">${car.code}</span>
                ${gapStr}
                <span class="row_tyre ${tyreClass}">${car.tyre}</span>
            </div>
        `;
    });

    raceTowerList.innerHTML = html;
}

// Add Live Commentary Notification
function addCommentaryEvent(text) {
    if (!commentaryFeed) return;
    if (raceCommentaryHistory.includes(text)) return;
    raceCommentaryHistory.push(text);

    const item = document.createElement('div');
    item.className = 'commentary_item';
    item.textContent = text;
    commentaryFeed.appendChild(item);

    while (commentaryFeed.children.length > 4) {
        commentaryFeed.removeChild(commentaryFeed.firstChild);
    }
}

// ==========================================================================
// MAIN INTENSE ANIMATION LOOP
// Dynamic Slipstream, Overtake Cuts, Lateral Swerves, Sound Modulation
// ==========================================================================
function animateRace(timestamp) {
    if (!isRaceRunning) return;

    if (!raceLastFrameTime) raceLastFrameTime = timestamp;
    const deltaMs = Math.min(100, timestamp - raceLastFrameTime);
    raceLastFrameTime = timestamp;

    const deltaSec = (deltaMs / 1000) * raceSimSpeed;
    raceElapsedTime += deltaSec;

    let totalPathLength = 0;
    try {
        if (raceTrackPath) totalPathLength = raceTrackPath.getTotalLength();
    } catch (e) {}

    let maxDistance = -999;
    const TOTAL_SESSION_SECONDS = RACE_TOTAL_LAPS * RACE_LAP_SECONDS;

    // Modulate engine sound with race speed & random gear-shifts
    modulateEngineSound((raceElapsedTime % 8) / 8);

    // Sort running cars to calculate slipstreams and overtaking cuts
    const runningSorted = [...raceCars].filter(c => c.status !== 'DNF').sort((a, b) => b.distance - a.distance);

    raceCars.forEach(car => {
        if (car.status === 'DNF') return;

        // Lap DNF trigger check
        if (car.isDNF && !car.hasDNFed && car.distance >= (car.dnfLap - 0.45)) {
            car.hasDNFed = true;
            car.status = 'DNF';
            addCommentaryEvent(`${car.code} (${car.teamName}) OUT OF THE RACE // MECHANICAL FAILURE`);
            speakCommentary(`Disaster for ${car.name}! He has retired with mechanical trouble!`);
            return;
        }

        // Find car directly ahead for slipstream & overtaking dynamics
        const carIndexInRunning = runningSorted.indexOf(car);
        let slipstreamBoost = 1.0;
        let isChasing = false;

        if (carIndexInRunning > 0) {
            const carAhead = runningSorted[carIndexInRunning - 1];
            const gapToAhead = carAhead.distance - car.distance;

            // Slipstream detection (< 0.04 lap distance ~ 1.5 seconds)
            if (gapToAhead > 0.002 && gapToAhead < 0.038) {
                slipstreamBoost = 1.08 + Math.sin(raceElapsedTime * 3) * 0.04;
                isChasing = true;
                car.hasDRS = true;

                // Trigger Overtaking "Cut" Maneuver if car's targetPos is better
                if (car.targetPos < carAhead.targetPos && !car.isPassing) {
                    car.isPassing = true;
                    car.passTimer = 0;
                    // Swing out to inside/outside lane
                    car.laneOffset = (car.laneOffset > 0 ? -1.2 : 1.2);

                    if (Math.random() < 0.35) {
                        addCommentaryEvent(`${car.code} DIVES DOWN THE INSIDE OF ${carAhead.code}!`);
                        speakCommentary(`${car.code} makes a bold move down the inside!`);
                    }
                }
            } else {
                car.hasDRS = false;
            }
        }

        // Manage Passing Timer (smooth cut across after overtake)
        if (car.isPassing) {
            car.passTimer += deltaSec;
            if (car.passTimer > 3.5) {
                car.isPassing = false;
                car.laneOffset = (Math.random() * 0.8 - 0.4); // return toward racing line
            }
        }

        const dynamicBoost = Math.sin(raceElapsedTime * 1.8 + car.targetPos) * 0.003;
        const currentSpeed = (car.baseSpeed + dynamicBoost) * slipstreamBoost;

        car.progress += currentSpeed * deltaSec;
        car.distance = car.progress;
        if (car.distance > maxDistance) maxDistance = car.distance;

        // Position bubble along the SVG Path with intense lateral motion
        if (totalPathLength > 0 && car.bubbleEl) {
            const lapFraction = ((car.progress % 1.0) + 1.0) % 1.0;
            const trackDist = lapFraction * totalPathLength;

            try {
                const pt = raceTrackPath.getPointAtLength(trackDist);

                const nextDist = (trackDist + 4) % totalPathLength;
                const nextPt = raceTrackPath.getPointAtLength(nextDist);
                const dx = nextPt.x - pt.x;
                const dy = nextPt.y - pt.y;
                const len = Math.hypot(dx, dy) || 1;
                const nx = -dy / len;
                const ny = dx / len;

                // Lateral offset in pixels (intense cuts up to 14px)
                const lateralOffset = car.laneOffset * 10;

                const posX = pt.x + nx * lateralOffset;
                const posY = pt.y + ny * lateralOffset;

                car.bubbleEl.setAttribute('transform', `translate(${posX}, ${posY})`);

                // Visual class for overtaking / DRS
                if (car.isPassing) {
                    car.bubbleEl.classList.add('overtaking');
                    car.bubbleEl.classList.remove('drs_active');
                } else if (car.hasDRS) {
                    car.bubbleEl.classList.add('drs_active');
                    car.bubbleEl.classList.remove('overtaking');
                } else {
                    car.bubbleEl.classList.remove('overtaking');
                    car.bubbleEl.classList.remove('drs_active');
                }
            } catch (err) {}
        }
    });

    // Update Leader Lap & Counter
    const currentLeaderLap = Math.min(RACE_TOTAL_LAPS, Math.max(1, Math.floor(maxDistance) + 1));
    if (currentLeaderLap !== raceLeaderLap) {
        raceLeaderLap = currentLeaderLap;
        if (raceLapCurrentEl) raceLapCurrentEl.textContent = raceLeaderLap;

        if (raceLeaderLap === 2) {
            addCommentaryEvent('DRS HAS BEEN ENABLED ACROSS ALL DETECTION ZONES');
            speakCommentary('DRS has been enabled! High closing speeds down the straight!');
        } else if (raceLeaderLap === Math.ceil(RACE_TOTAL_LAPS / 2)) {
            addCommentaryEvent('MID-RACE BATTLES HEATING UP // TYRE WEAR INCREASING');
        } else if (raceLeaderLap === RACE_TOTAL_LAPS) {
            addCommentaryEvent('FINAL LAP! THE DRIVERS ARE GIVING IT EVERYTHING!');
            speakCommentary('Final lap of the race! Everything on the line for victory!');
        }
    }

    renderTimingTower();

    // Check for Race Finish (all requested laps completed)
    if (maxDistance >= RACE_TOTAL_LAPS && !isRaceSessionFinished) {
        finishRaceSession();
        return;
    }

    if (isRaceRunning) {
        raceAnimationReqId = requestAnimationFrame(animateRace);
    }
}

// ==========================================================================
// CONCLUDE RACE & DISPLAY DEDICATED PODIUM SECTION WITH USER STATS
// ==========================================================================
function finishRaceSession() {
    isRaceSessionFinished = true;
    isRaceRunning = false;
    if (raceAnimationReqId) cancelAnimationFrame(raceAnimationReqId);
    stopEngineSound();
    pauseCommentaryAudio();

    // Reveal populated podium section and hide locked/empty state
    if (podiumLockedState) podiumLockedState.style.display = 'none';
    if (podiumContent) podiumContent.style.display = 'flex';

    if (raceStatusText) raceStatusText.textContent = '🏁 CHEQUERED FLAG // RACE FINISHED';
    if (raceLiveDot) raceLiveDot.className = 'live_dot stopped';
    if (racePlayIcon) racePlayIcon.innerHTML = '&#9654;';
    if (racePlayText) racePlayText.textContent = 'RACE COMPLETED';

    const sorted = [...raceCars].sort((a, b) => {
        if (a.status === 'DNF' && b.status !== 'DNF') return 1;
        if (b.status === 'DNF' && a.status !== 'DNF') return -1;
        return b.distance - a.distance;
    });

    const p1 = sorted[0] || GRID_DRIVERS[0];
    const p2 = sorted[1] || GRID_DRIVERS[1];
    const p3 = sorted[2] || GRID_DRIVERS[2];

    addCommentaryEvent(`CHEQUERED FLAG! ${p1.name.toUpperCase()} WINS AT ${activeRaceCircuitKey.toUpperCase()}!`);
    speakCommentary(`Chequered flag! What an outstanding victory for ${p1.name} and ${p1.teamName}!`);

    // Populate Dedicated Podium Section
    const circuitInfo = CIRCUIT_TRACK_DATA[activeRaceCircuitKey];
    if (podiumCircuitInfo && circuitInfo) {
        podiumCircuitInfo.textContent = `${circuitInfo.name} // ${RACE_TOTAL_LAPS} LAPS COMPLETED`;
    }

    // P1 Winner
    if (p1DriverImg) p1DriverImg.src = p1.photo;
    if (p1DriverName) p1DriverName.textContent = p1.name.toUpperCase();
    if (p1DriverTeam) {
        p1DriverTeam.textContent = p1.teamName;
        p1DriverTeam.style.color = p1.color;
    }

    // P2
    if (p2DriverImg) p2DriverImg.src = p2.photo;
    if (p2DriverName) p2DriverName.textContent = p2.name.toUpperCase();
    if (p2DriverTeam) {
        p2DriverTeam.textContent = p2.teamName;
        p2DriverTeam.style.color = p2.color;
    }

    // P3
    if (p3DriverImg) p3DriverImg.src = p3.photo;
    if (p3DriverName) p3DriverName.textContent = p3.name.toUpperCase();
    if (p3DriverTeam) {
        p3DriverTeam.textContent = p3.teamName;
        p3DriverTeam.style.color = p3.color;
    }

    // Populate User Final Training & Garage Stats in Post-Race Debrief
    populateUserPodiumDebrief(sorted);

    // Smooth scroll down to dedicated Podium Section after 1.2s
    setTimeout(() => {
        if (podiumSection) {
            podiumSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 1200);
}

// Read actual user selected training stats & garage setup and render into Debrief card
function populateUserPodiumDebrief(sortedFinalCars) {
    if (reportTeamTitle) {
        reportTeamTitle.textContent = `${activeUserTeamKey.replace('_', ' ').toUpperCase()} // POST-RACE TELEMETRY REPORT`;
    }

    // 1. Training metrics (read actual levels from DOM if calibrated)
    const statBars = document.querySelectorAll('.stats_container .stats_bar');
    let reactionVal = 82;
    let paceVal = 86;
    let staminaVal = 88;
    let focusVal = 80;

    if (statBars.length >= 8) {
        // Driver 1 levels
        const l0 = parseInt(statBars[0]?.dataset.level || '3', 10);
        const l1 = parseInt(statBars[2]?.dataset.level || '3', 10);
        const l2 = parseInt(statBars[4]?.dataset.level || '4', 10);
        const l3 = parseInt(statBars[6]?.dataset.level || '3', 10);

        paceVal = Math.min(99, 70 + l0 * 5);
        staminaVal = Math.min(99, 72 + l1 * 5);
        reactionVal = Math.min(99, 70 + l2 * 6);
        focusVal = Math.min(99, 68 + l3 * 6);
    }

    if (metricReactions) metricReactions.style.width = reactionVal + '%';
    if (metricReactionsVal) metricReactionsVal.textContent = reactionVal;
    if (metricPace) metricPace.style.width = paceVal + '%';
    if (metricPaceVal) metricPaceVal.textContent = paceVal;
    if (metricStamina) metricStamina.style.width = staminaVal + '%';
    if (metricStaminaVal) metricStaminaVal.textContent = staminaVal;
    if (metricFocus) metricFocus.style.width = focusVal + '%';
    if (metricFocusVal) metricFocusVal.textContent = focusVal;

    // 2. Garage setup specs (read from garage sliders)
    const aero = sliderAero ? sliderAero.value : '50';
    const diff = sliderDiff ? sliderDiff.value : '70';
    const brake = sliderBrake ? sliderBrake.value : '56';
    const tyreName = (typeof currentTyre === 'string') ? currentTyre.toUpperCase() : 'MEDIUM';
    const delta = (deltaVal && deltaVal.textContent) ? deltaVal.textContent : '-0.245s';

    if (reportDownforce) reportDownforce.textContent = Math.round(aero / 10) + ' / 10 (' + aero + '%)';
    if (reportSuspension) reportSuspension.textContent = Math.round(diff / 10) + ' / 10 (' + diff + '%)';
    if (reportGears) reportGears.textContent = Math.round(brake / 10) + ' / 10 (' + brake + '%)';
    if (reportTyre) reportTyre.textContent = tyreName + ' COMPOUND';
    if (reportDelta) reportDelta.textContent = delta;

    // 3. User Driver Finishes & Points calculation
    const userCars = sortedFinalCars.filter(c => c.isUserTeam);
    const d1 = userCars[0] || { currentPos: 1, name: 'Driver 1' };
    const d2 = userCars[1] || { currentPos: 2, name: 'Driver 2' };

    const getPoints = (pos) => {
        const pts = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
        return pts[pos - 1] || 0;
    };

    const d1Pts = d1.status === 'DNF' ? 0 : getPoints(d1.currentPos);
    const d2Pts = d2.status === 'DNF' ? 0 : getPoints(d2.currentPos);
    const totalPts = d1Pts + d2Pts;

    if (reportPointsEarned) reportPointsEarned.textContent = `+${totalPts}`;

    if (reportDriverFinishes) {
        const getPillClass = (pos, status) => {
            if (status === 'DNF') return 'finish_pill';
            if (pos === 1) return 'finish_pill p1';
            if (pos === 2) return 'finish_pill p2';
            if (pos === 3) return 'finish_pill p3';
            return 'finish_pill points';
        };

        const d1StatusStr = d1.status === 'DNF' ? 'DNF (0 PTS)' : `P${d1.currentPos} (+${d1Pts} PTS)`;
        const d2StatusStr = d2.status === 'DNF' ? 'DNF (0 PTS)' : `P${d2.currentPos} (+${d2Pts} PTS)`;

        reportDriverFinishes.innerHTML = `
            <span class="${getPillClass(d1.currentPos, d1.status)}">${d1.name.toUpperCase()}: ${d1StatusStr}</span>
            <span class="${getPillClass(d2.currentPos, d2.status)}">${d2.name.toUpperCase()}: ${d2StatusStr}</span>
        `;
    }
}

// ==========================================================================
// CONTROLS & EVENT LISTENERS
// ==========================================================================
// Start / Pause Race Button
if (racePlayPauseBtn) {
    racePlayPauseBtn.addEventListener('click', () => {
        if (!isRaceRunning && !isCountdownActive) {
            triggerStartSequence();
        } else if (isRaceRunning) {
            // Pause
            isRaceRunning = false;
            stopEngineSound();
            pauseCommentaryAudio();
            if (raceAnimationReqId) cancelAnimationFrame(raceAnimationReqId);
            if (racePlayIcon) racePlayIcon.innerHTML = '&#9654;';
            if (racePlayText) racePlayText.textContent = 'RESUME';
            if (raceStatusText) raceStatusText.textContent = 'YELLOW FLAG // RACE PAUSED';
            if (raceLiveDot) raceLiveDot.className = 'live_dot stopped';
        } else {
            // Resume
            isRaceRunning = true;
            raceLastFrameTime = 0;
            startEngineSound();
            playCommentaryAudio();
            if (racePlayIcon) racePlayIcon.innerHTML = '&#10074;&#10074;';
            if (racePlayText) racePlayText.textContent = 'PAUSE';
            if (raceStatusText) raceStatusText.textContent = 'GREEN FLAG // SESSION LIVE';
            if (raceLiveDot) raceLiveDot.className = 'live_dot';
            raceAnimationReqId = requestAnimationFrame(animateRace);
        }
    });
}

// Start Gantry Launch Button
if (gantryLaunchBtn) {
    gantryLaunchBtn.addEventListener('click', () => {
        triggerStartSequence();
    });
}

// Restart Button
if (raceRestartBtn) {
    raceRestartBtn.addEventListener('click', () => {
        initRaceSession();
    });
}

// Lap Count Selection on Circuit Map Section (3, 5, 7)
function updateLapSelection(laps) {
    RACE_TOTAL_LAPS = laps;
    if (raceLapTotalEl) raceLapTotalEl.textContent = laps;

    const cLapBtns = document.querySelectorAll('.circuit_lap_btn');
    cLapBtns.forEach(b => {
        if (parseInt(b.dataset.laps, 10) === laps) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });

    if (podiumCircuitInfo) {
        const cData = CIRCUIT_TRACK_DATA[activeRaceCircuitKey];
        podiumCircuitInfo.textContent = `${cData ? cData.name : 'CIRCUIT'} // ${RACE_TOTAL_LAPS} LAPS COMPLETED`;
    }

    if (!isRaceRunning && !isCountdownActive) {
        initRaceSession();
    }
}

const circuitLapBtns = document.querySelectorAll('.circuit_lap_btn');
circuitLapBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const laps = parseInt(btn.dataset.laps, 10) || 5;
        updateLapSelection(laps);
    });
});

// Back to Top Button
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Speed Control Toggles (1x, 2x, 5x, 10x)
speedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        speedBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const spd = parseFloat(btn.dataset.speed) || 1;
        raceSimSpeed = spd;
    });
});

// Podium Action Buttons
if (podiumRaceAgainBtn) {
    podiumRaceAgainBtn.addEventListener('click', () => {
        initRaceSession();
        const raceTarget = document.getElementById('race');
        if (raceTarget) {
            raceTarget.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Synchronize circuit selection from Circuit Section
const originalSelectCircuit = selectCircuit;
selectCircuit = function(card, isInitial = false) {
    originalSelectCircuit(card, isInitial);
    const circuitKey = card.dataset.circuit;
    if (circuitKey) {
        setupRaceCircuit(circuitKey);
    }
};

// Hook into team selection from Grid
const teamCardsList = document.querySelectorAll('.team_card');
teamCardsList.forEach(card => {
    card.addEventListener('click', () => {
        const teamKey = card.classList[1];
        if (teamKey && teamDetails[teamKey]) {
            updateRaceUserTeam(teamKey);
        }
    });
});

// "RACE HERE" Button in Circuit Section: smooth scroll to #race (ready for start)
if (raceHereBtn) {
    raceHereBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const originalText = raceHereBtn.textContent;
        raceHereBtn.textContent = 'CIRCUIT LOCKED 🏁';
        raceHereBtn.style.background = '#ffffff';
        raceHereBtn.style.color = '#000000';

        setTimeout(() => {
            raceHereBtn.textContent = originalText;
            raceHereBtn.style.background = '';
            raceHereBtn.style.color = '';

            const raceTarget = document.getElementById('race');
            if (raceTarget) {
                raceTarget.scrollIntoView({ behavior: 'smooth' });
            }
        }, 400);
    });
}

// Initialize on Page Load (Grid formation, wait for user start)
function initPageAndRace() {
    const defaultCircuitCard = document.querySelector('.circuit_card[data-circuit="sepang"]') || (typeof circuitCards !== 'undefined' ? circuitCards[0] : null);
    if (defaultCircuitCard && typeof selectCircuit === 'function') {
        selectCircuit(defaultCircuitCard, true);
    }
    setupRaceCircuit('sepang');
    updateRaceUserTeam(currentSelectedKey || 'mercedes');
}

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initPageAndRace);
} else {
    initPageAndRace();
}
