// ========================================
// Loud Alarm Module - Women Safety App
// ========================================

// Alarm State
let alarmIsPlaying = true;
let alarmContext = null;
let alarmOscillator = null;
let alarmGain = null;
let alarmSirenInterval = null;

// DOM Elements
const alarmScreen = document.getElementById('alarmScreen');
const alarmModal = document.getElementById('alarmModal');
const alarmIcon = document.getElementById('alarmIcon');
const alarmTitle = document.getElementById('alarmTitle');
const alarmDescription = document.getElementById('alarmDescription');
const toggleAlarmBtn = document.getElementById('toggleAlarm');
const closeAlarmBtn = document.getElementById('closeAlarm');

// Show Alarm Screen
function showAlarm() {
    alarmIsPlaying = true;
    alarmScreen.classList.remove('hidden');
    updateAlarmUI();
    startAlarm();
}

// Hide Alarm Screen
function hideAlarm() {
    stopAlarm();
    alarmScreen.classList.add('hidden');
}

// Start Alarm Sound
function startAlarm() {
    try {
        alarmContext = new (window.AudioContext || window.webkitAudioContext)();
        alarmOscillator = alarmContext.createOscillator();
        alarmGain = alarmContext.createGain();
        
        alarmOscillator.connect(alarmGain);
        alarmGain.connect(alarmContext.destination);
        
        // Create alarming sound pattern
        alarmOscillator.type = 'square';
        alarmGain.gain.value = 0.8;
        
        // Frequency alternation for siren effect
        let high = true;
        alarmSirenInterval = setInterval(() => {
            if (alarmOscillator && alarmContext) {
                alarmOscillator.frequency.setValueAtTime(high ? 880 : 660, alarmContext.currentTime);
                high = !high;
            }
        }, 300);
        
        alarmOscillator.start();
    } catch (e) {
        console.log('Audio not available');
    }
}

// Stop Alarm Sound
function stopAlarm() {
    if (alarmSirenInterval) {
        clearInterval(alarmSirenInterval);
        alarmSirenInterval = null;
    }
    if (alarmOscillator) {
        try {
            alarmOscillator.stop();
        } catch (e) {}
        alarmOscillator = null;
    }
    if (alarmContext) {
        alarmContext.close();
        alarmContext = null;
    }
    alarmGain = null;
}

// Toggle Alarm
function toggleAlarm() {
    if (alarmIsPlaying) {
        stopAlarm();
        alarmIsPlaying = false;
    } else {
        startAlarm();
        alarmIsPlaying = true;
    }
    updateAlarmUI();
}

// Update Alarm UI
function updateAlarmUI() {
    // Modal animation class
    if (alarmIsPlaying) {
        alarmModal.classList.add('active');
        alarmModal.classList.remove('paused');
        alarmIcon.classList.add('pulsing');
        alarmTitle.textContent = 'ALARM ACTIVE';
        alarmDescription.textContent = 'Loud alarm is playing to attract attention';
        toggleAlarmBtn.innerHTML = `
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <line x1="23" y1="9" x2="17" y2="15"/>
                <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
            Pause
        `;
        toggleAlarmBtn.className = 'btn btn-secondary btn-xl';
    } else {
        alarmModal.classList.remove('active');
        alarmModal.classList.add('paused');
        alarmIcon.classList.remove('pulsing');
        alarmTitle.textContent = 'ALARM PAUSED';
        alarmDescription.textContent = 'Alarm is paused - tap to resume';
        toggleAlarmBtn.innerHTML = `
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
            Resume
        `;
        toggleAlarmBtn.className = 'btn btn-emergency btn-xl';
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    toggleAlarmBtn.addEventListener('click', toggleAlarm);
    closeAlarmBtn.addEventListener('click', hideAlarm);
});