// ========================================
// Fake Call Module - Women Safety App
// ========================================

// Fake Call State
let fakeCallState = 'incoming'; // 'incoming', 'connected', 'ended'
let callTimer = 0;
let callTimerInterval = null;
let ringtoneContext = null;
let ringtoneOscillator = null;
let ringtoneGain = null;
let ringtonePulseInterval = null;

// DOM Elements
const fakeCallScreen = document.getElementById('fakeCallScreen');
const callerAvatar = document.getElementById('callerAvatar');
const callStatus = document.getElementById('callStatus');
const callActions = document.getElementById('callActions');

// Show Fake Call Screen
function showFakeCall() {
    fakeCallState = 'incoming';
    callTimer = 0;
    fakeCallScreen.classList.remove('hidden');
    renderCallUI();
    startRingtone();
}

// Hide Fake Call Screen
function hideFakeCall() {
    stopRingtone();
    stopCallTimer();
    fakeCallScreen.classList.add('hidden');
}

// Start Ringtone using Web Audio API
function startRingtone() {
    try {
        ringtoneContext = new (window.AudioContext || window.webkitAudioContext)();
        ringtoneOscillator = ringtoneContext.createOscillator();
        ringtoneGain = ringtoneContext.createGain();
        
        ringtoneOscillator.connect(ringtoneGain);
        ringtoneGain.connect(ringtoneContext.destination);
        
        ringtoneOscillator.frequency.value = 440;
        ringtoneOscillator.type = 'sine';
        ringtoneGain.gain.value = 0.3;
        
        ringtoneOscillator.start();
        
        // Create pulsing effect
        ringtonePulseInterval = setInterval(() => {
            if (ringtoneGain && ringtoneContext) {
                ringtoneGain.gain.setValueAtTime(0.3, ringtoneContext.currentTime);
                ringtoneGain.gain.exponentialRampToValueAtTime(0.01, ringtoneContext.currentTime + 0.5);
                setTimeout(() => {
                    if (ringtoneGain && ringtoneContext) {
                        ringtoneGain.gain.setValueAtTime(0.3, ringtoneContext.currentTime);
                    }
                }, 500);
            }
        }, 1000);
    } catch (e) {
        console.log('Audio not available');
    }
}

// Stop Ringtone
function stopRingtone() {
    if (ringtonePulseInterval) {
        clearInterval(ringtonePulseInterval);
        ringtonePulseInterval = null;
    }
    if (ringtoneOscillator) {
        try {
            ringtoneOscillator.stop();
        } catch (e) {}
        ringtoneOscillator = null;
    }
    if (ringtoneContext) {
        ringtoneContext.close();
        ringtoneContext = null;
    }
    ringtoneGain = null;
}

// Start Call Timer
function startCallTimer() {
    callTimerInterval = setInterval(() => {
        callTimer++;
        updateCallStatus();
    }, 1000);
}

// Stop Call Timer
function stopCallTimer() {
    if (callTimerInterval) {
        clearInterval(callTimerInterval);
        callTimerInterval = null;
    }
}

// Format time
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Update Call Status Text
function updateCallStatus() {
    switch (fakeCallState) {
        case 'incoming':
            callStatus.textContent = 'Incoming call...';
            break;
        case 'connected':
            callStatus.textContent = formatTime(callTimer);
            break;
        case 'ended':
            callStatus.textContent = 'Call ended';
            break;
    }
}

// Render Call UI
function renderCallUI() {
    // Update avatar animation
    if (fakeCallState === 'incoming') {
        callerAvatar.classList.add('pulsing');
    } else {
        callerAvatar.classList.remove('pulsing');
    }
    
    updateCallStatus();
    
    // Render action buttons
    switch (fakeCallState) {
        case 'incoming':
            callActions.innerHTML = `
                <button class="call-btn reject" onclick="rejectCall()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                </button>
                <button class="call-btn accept ringing" onclick="acceptCall()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                </button>
            `;
            break;
        case 'connected':
            callActions.innerHTML = `
                <button class="call-btn reject" onclick="endCall()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                </button>
            `;
            break;
        case 'ended':
            callActions.innerHTML = `
                <p class="call-ended-text">Disconnected</p>
            `;
            break;
    }
}

// Accept Call
function acceptCall() {
    stopRingtone();
    fakeCallState = 'connected';
    renderCallUI();
    startCallTimer();
}

// Reject Call
function rejectCall() {
    stopRingtone();
    fakeCallState = 'ended';
    renderCallUI();
    setTimeout(hideFakeCall, 1000);
}

// End Call
function endCall() {
    stopCallTimer();
    fakeCallState = 'ended';
    renderCallUI();
    setTimeout(hideFakeCall, 1000);
}