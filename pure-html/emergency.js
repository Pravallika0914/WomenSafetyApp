// ========================================
// Emergency Module - Women Safety App
// ========================================

// State helplines data for Indian states
const stateHelplines = {
    "Andhra Pradesh": { police: "100", women: "181", ambulance: "108", fire: "101" },
    "Arunachal Pradesh": { police: "100", women: "181", ambulance: "108", fire: "101" },
    "Assam": { police: "100", women: "181", ambulance: "108", fire: "101" },
    "Bihar": { police: "100", women: "181", ambulance: "108", fire: "101" },
    "Chhattisgarh": { police: "100", women: "1091", ambulance: "108", fire: "101" },
    "Delhi": { police: "100", women: "1091", ambulance: "102", fire: "101" },
    "Goa": { police: "100", women: "1091", ambulance: "108", fire: "101" },
    "Gujarat": { police: "100", women: "181", ambulance: "108", fire: "101" },
    "Haryana": { police: "100", women: "1091", ambulance: "108", fire: "101" },
    "Himachal Pradesh": { police: "100", women: "1091", ambulance: "108", fire: "101" },
    "Jharkhand": { police: "100", women: "181", ambulance: "108", fire: "101" },
    "Karnataka": { police: "100", women: "1091", ambulance: "108", fire: "101" },
    "Kerala": { police: "100", women: "1091", ambulance: "108", fire: "101" },
    "Madhya Pradesh": { police: "100", women: "1091", ambulance: "108", fire: "101" },
    "Maharashtra": { police: "100", women: "103", ambulance: "108", fire: "101" },
    "Manipur": { police: "100", women: "181", ambulance: "108", fire: "101" },
    "Meghalaya": { police: "100", women: "181", ambulance: "108", fire: "101" },
    "Mizoram": { police: "100", women: "181", ambulance: "108", fire: "101" },
    "Nagaland": { police: "100", women: "181", ambulance: "108", fire: "101" },
    "Odisha": { police: "100", women: "181", ambulance: "108", fire: "101" },
    "Punjab": { police: "100", women: "1091", ambulance: "108", fire: "101" },
    "Rajasthan": { police: "100", women: "1091", ambulance: "108", fire: "101" },
    "Sikkim": { police: "100", women: "181", ambulance: "108", fire: "101" },
    "Tamil Nadu": { police: "100", women: "1091", ambulance: "108", fire: "101" },
    "Telangana": { police: "100", women: "181", ambulance: "108", fire: "101" },
    "Tripura": { police: "100", women: "181", ambulance: "108", fire: "101" },
    "Uttar Pradesh": { police: "100", women: "1090", ambulance: "108", fire: "101" },
    "Uttarakhand": { police: "100", women: "1091", ambulance: "108", fire: "101" },
    "West Bengal": { police: "100", women: "1091", ambulance: "108", fire: "101" },
};

const states = Object.keys(stateHelplines);

// Safety tips for different situations
const safetyTips = {
    "Night Travel": [
        "Always inform someone about your travel plans and expected arrival time",
        "Keep your phone fully charged and carry a power bank",
        "Sit near the driver or in well-lit areas of public transport",
        "Avoid wearing headphones to stay alert to surroundings",
        "Share your live location with trusted contacts",
        "Keep emergency numbers on speed dial",
        "Trust your instincts - if something feels wrong, move to a safer location",
        "Carry a personal safety alarm or whistle",
    ],
    "Public Transport": [
        "Wait for transport in well-lit, populated areas",
        "Note the vehicle registration number and share it with someone",
        "Avoid empty compartments or buses",
        "Keep your belongings close and be aware of pickpockets",
        "Use verified transport apps and share ride details",
        "Sit near other women or families when possible",
        "Know the emergency exits and panic buttons",
        "Avoid engaging with strangers who make you uncomfortable",
    ],
    "Workplace": [
        "Know your company's sexual harassment policy and reporting procedures",
        "Document any incidents of harassment with dates and details",
        "Report concerns to HR or a trusted supervisor",
        "Know your rights under workplace harassment laws",
        "Maintain professional boundaries with colleagues",
        "Use buddy system when working late hours",
        "Keep evidence of any inappropriate communications",
        "Seek support from women's groups or counseling services",
    ],
    "Isolated Areas": [
        "Avoid walking alone in isolated areas, especially at night",
        "Stay on main roads and well-lit paths",
        "Walk confidently and be aware of your surroundings",
        "Keep your phone ready but not distracted by it",
        "Know the nearest safe places like shops or police stations",
        "Carry self-defense tools like pepper spray where legal",
        "Make noise and draw attention if threatened",
        "Learn basic self-defense techniques",
    ],
    "Online Safety": [
        "Never share personal information with strangers online",
        "Use strong, unique passwords for all accounts",
        "Be cautious of online relationships and meeting internet friends",
        "Report cyberbullying and online harassment",
        "Adjust privacy settings on social media",
        "Don't share location in real-time on public posts",
        "Be wary of suspicious links and phishing attempts",
        "Keep evidence of online threats for reporting",
    ],
};

const situations = Object.keys(safetyTips);

// App State
let selectedState = localStorage.getItem('selectedState') || 'Delhi';
let selectedSituation = null;

// DOM Elements
const emergencyBtn = document.getElementById('emergencyBtn');
const fakeCallBtn = document.getElementById('fakeCallBtn');
const alarmBtn = document.getElementById('alarmBtn');
const tipsBtn = document.getElementById('tipsBtn');
const helplinesBtn = document.getElementById('helplinesBtn');
const emergencyScreen = document.getElementById('emergencyScreen');
const closeEmergency = document.getElementById('closeEmergency');
const emergencyState = document.getElementById('emergencyState');
const emergencyFakeCall = document.getElementById('emergencyFakeCall');
const emergencyAlarm = document.getElementById('emergencyAlarm');
const stateSelect = document.getElementById('stateSelect');
const situationButtons = document.getElementById('situationButtons');
const tipsContent = document.getElementById('tipsContent');
const helplineGrid = document.getElementById('helplineGrid');
const emergencyHelplineGrid = document.getElementById('emergencyHelplineGrid');

// Initialize App
function initApp() {
    populateStateSelect();
    renderSituationButtons();
    renderHelplines();
    renderEmergencyHelplines();
    setupEventListeners();
}

// Populate state select dropdown
function populateStateSelect() {
    stateSelect.innerHTML = states.map(state => 
        `<option value="${state}" ${state === selectedState ? 'selected' : ''}>${state}</option>`
    ).join('');
}

// Render situation buttons
function renderSituationButtons() {
    const icons = {
        "Night Travel": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
        "Public Transport": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        "Workplace": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>',
        "Isolated Areas": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
        "Online Safety": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    };

    situationButtons.innerHTML = situations.map(situation => 
        `<button class="situation-btn" data-situation="${situation}">
            ${icons[situation]}
            ${situation}
        </button>`
    ).join('');
}

// Render safety tips
function renderTips(situation) {
    if (!situation) {
        tipsContent.innerHTML = `
            <div class="tips-placeholder">
                <svg class="icon-large text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"/>
                </svg>
                <p>Select a situation above to view safety tips</p>
            </div>
        `;
        return;
    }

    const tips = safetyTips[situation];
    tipsContent.innerHTML = `
        <div class="tips-header">
            <div class="tips-header-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
            </div>
            <h3>${situation} Safety</h3>
        </div>
        <ul class="tips-list">
            ${tips.map(tip => `
                <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    <span>${tip}</span>
                </li>
            `).join('')}
        </ul>
    `;
}

// Render helplines
function renderHelplines() {
    const helplines = stateHelplines[selectedState];
    const cards = [
        { label: "Police", number: helplines.police, color: "bg-blue", description: "Emergency police assistance" },
        { label: "Women Helpline", number: helplines.women, color: "bg-primary", description: "24/7 women's safety helpline" },
        { label: "Ambulance", number: helplines.ambulance, color: "bg-safe", description: "Medical emergency services" },
        { label: "Fire", number: helplines.fire, color: "bg-orange", description: "Fire emergency services" },
    ];

    const icons = {
        Police: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        "Women Helpline": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
        Ambulance: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
        Fire: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
    };

    helplineGrid.innerHTML = cards.map(card => `
        <a href="tel:${card.number}" class="helpline-card">
            <div class="helpline-icon ${card.color}">
                ${icons[card.label]}
            </div>
            <h3>${card.label}</h3>
            <span class="number">${card.number}</span>
            <p class="description">${card.description}</p>
        </a>
    `).join('');
}

// Render emergency helplines
function renderEmergencyHelplines() {
    const helplines = stateHelplines[selectedState];
    const cards = [
        { label: "Call Police", number: helplines.police, color: "bg-blue" },
        { label: "Women Helpline", number: helplines.women, color: "bg-primary" },
        { label: "Ambulance", number: helplines.ambulance, color: "bg-safe" },
        { label: "Fire", number: helplines.fire, color: "bg-orange" },
    ];

    const icons = {
        "Call Police": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        "Women Helpline": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
        Ambulance: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
        Fire: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    };

    emergencyHelplineGrid.innerHTML = cards.map(card => `
        <a href="tel:${card.number}" class="emergency-helpline-card">
            <div class="icon-wrap ${card.color}">
                ${icons[card.label]}
            </div>
            <span class="label">${card.label}</span>
            <span class="number">${card.number}</span>
        </a>
    `).join('');
}

// Show Emergency Screen
function showEmergencyScreen() {
    emergencyState.textContent = selectedState;
    renderEmergencyHelplines();
    emergencyScreen.classList.remove('hidden');
    localStorage.setItem('lastAccessedMode', 'emergency');
}

// Hide Emergency Screen
function hideEmergencyScreen() {
    emergencyScreen.classList.add('hidden');
}

// Setup Event Listeners
function setupEventListeners() {
    // Main buttons
    emergencyBtn.addEventListener('click', showEmergencyScreen);
    fakeCallBtn.addEventListener('click', showFakeCall);
    alarmBtn.addEventListener('click', showAlarm);
    tipsBtn.addEventListener('click', () => {
        document.getElementById('tips').scrollIntoView({ behavior: 'smooth' });
    });
    helplinesBtn.addEventListener('click', () => {
        document.getElementById('helplines').scrollIntoView({ behavior: 'smooth' });
    });

    // Emergency screen
    closeEmergency.addEventListener('click', hideEmergencyScreen);
    emergencyFakeCall.addEventListener('click', () => {
        hideEmergencyScreen();
        showFakeCall();
    });
    emergencyAlarm.addEventListener('click', () => {
        hideEmergencyScreen();
        showAlarm();
    });

    // State select
    stateSelect.addEventListener('change', (e) => {
        selectedState = e.target.value;
        localStorage.setItem('selectedState', selectedState);
        renderHelplines();
    });

    // Situation buttons
    situationButtons.addEventListener('click', (e) => {
        const btn = e.target.closest('.situation-btn');
        if (!btn) return;

        const situation = btn.dataset.situation;
        
        // Toggle selection
        if (selectedSituation === situation) {
            selectedSituation = null;
            btn.classList.remove('active');
        } else {
            document.querySelectorAll('.situation-btn').forEach(b => b.classList.remove('active'));
            selectedSituation = situation;
            btn.classList.add('active');
        }
        
        renderTips(selectedSituation);
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);