/**
 * Audio Player & Synthesizer Simulator for Hero Widget
 * Uses Web Audio API to create authentic neural synth tones
 */
(function() {
  const playBtn = document.getElementById('hero-play-btn');
  const timerEl = document.getElementById('hero-timer');
  const waveformEl = document.getElementById('hero-waveform');
  const dialogTextEl = document.getElementById('hero-dialog-text');
  const voiceSelectBtn = document.getElementById('hero-voice-select');
  const langSelectBtn = document.getElementById('hero-lang-select');
  const tabs = document.querySelectorAll('.player-tab-item');

  let audioCtx = null;
  let isPlaying = false;
  let playInterval = null;
  let elapsedSeconds = 0;
  const TOTAL_DURATION = 12;

  // Preset scenarios
  const scenarios = {
    'interceptor': {
      text: "Real-time AI voice deepfake detection & synthetic speech analysis... Yeah! That's the one. <span class='deepfake-flag-inline'>FLAGGED: NEURAL VOCODER</span> Not sure about using real twice though? Hmm. What do you think?",
      confidence: "99.4% Deepfake",
      voice: "Harper 🇺🇸 (ElevenLabs)",
      freq: 320
    },
    'spectral': {
      text: "Scanning Phase Spectrum: Detected Nyquist harmonic truncation at 16kHz typical of diffusion audio codecs (XTTS v2). Biological respiratory pause entropy: 0.04 (Abnormal).",
      confidence: "98.1% Artifact Detected",
      voice: "Coralie 🇫🇷 (Cloned)",
      freq: 410
    },
    'vocoder': {
      text: "Hi Mom, please authorize the urgent hospital deposit on WhatsApp immediately... <span class='deepfake-flag-inline'>EXTORTION INJECTION DETECTED</span> Voice signature synthetic match 99.8%.",
      confidence: "99.8% Spoof Match",
      voice: "Digital Arrest Spoof",
      freq: 260
    },
    'entropy': {
      text: "Checking voice authenticity with RawNet2: Natural human breathing absent. Robotic pitch detected. High probability of AI voice cloning. Escalating to Critical Block.",
      confidence: "97.2% Critical Risk",
      voice: "Noa 🇪🇸 (VALL-E)",
      freq: 350
    },
    'biometric': {
      text: "Voice check passed: Natural human pitch, natural breathing pauses, and authentic room acoustics confirmed. No scam patterns detected. Safe to continue.",
      confidence: "99.6% Authentic Human",
      voice: "Lorena 🇩🇪 (Verified Human)",
      freq: 220
    }
  };

  let currentKey = 'interceptor';

  // Web Audio Synth generator
  let osc1 = null;
  let osc2 = null;
  let gainNode = null;
  let filterNode = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
  }

  function startSynthSound(baseFreq) {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    osc1 = audioCtx.createOscillator();
    osc2 = audioCtx.createOscillator();
    gainNode = audioCtx.createGain();
    filterNode = audioCtx.createBiquadFilter();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(baseFreq, audioCtx.currentTime);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(baseFreq * 1.5, audioCtx.currentTime);

    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(800, audioCtx.currentTime);
    // Subtle formant modulation
    filterNode.frequency.exponentialRampToValueAtTime(1800, audioCtx.currentTime + 0.8);

    gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);

    osc1.connect(filterNode);
    osc2.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc1.start();
    osc2.start();

    // Modulate pitch slightly to simulate speech cadence
    setInterval(() => {
      if (isPlaying && osc1 && audioCtx) {
        const jitter = (Math.random() - 0.5) * 40;
        osc1.frequency.setValueAtTime(baseFreq + jitter, audioCtx.currentTime);
      }
    }, 180);
  }

  function stopSynthSound() {
    if (gainNode && audioCtx) {
      gainNode.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
      setTimeout(() => {
        try {
          if (osc1) osc1.stop();
          if (osc2) osc2.stop();
        } catch(e) {}
      }, 120);
    }
  }

  function togglePlay() {
    isPlaying = !isPlaying;

    if (isPlaying) {
      playBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16" rx="1"/>
          <rect x="14" y="4" width="4" height="16" rx="1"/>
        </svg>
      `;
      waveformEl.classList.add('playing');
      if (window.setInfinityAudioIntensity) window.setInfinityAudioIntensity(1.6);
      startSynthSound(scenarios[currentKey].freq || 300);

      playInterval = setInterval(() => {
        elapsedSeconds++;
        const mins = Math.floor(elapsedSeconds / 60);
        const secs = elapsedSeconds % 60;
        timerEl.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

        if (elapsedSeconds >= TOTAL_DURATION) {
          stopPlayback();
        }
      }, 1000);
    } else {
      stopPlayback();
    }
  }

  function stopPlayback() {
    isPlaying = false;
    playBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="6 3 20 12 6 21 6 3"></polygon>
      </svg>
    `;
    waveformEl.classList.remove('playing');
    if (window.setInfinityAudioIntensity) window.setInfinityAudioIntensity(1.0);
    stopSynthSound();
    clearInterval(playInterval);
    elapsedSeconds = 0;
    timerEl.textContent = '0:00';
  }

  if (playBtn) {
    playBtn.addEventListener('click', togglePlay);
  }

  // Handle Tab Switch
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.dataset.target || 'interceptor';
      currentKey = target;

      if (scenarios[target] && dialogTextEl) {
        dialogTextEl.innerHTML = scenarios[target].text;
      }

      if (voiceSelectBtn && scenarios[target]) {
        voiceSelectBtn.innerHTML = `
          <span>${scenarios[target].voice}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        `;
      }

      if (isPlaying) {
        stopPlayback();
        togglePlay();
      }
    });
  });

  // Cycle voice when clicking pill
  if (voiceSelectBtn) {
    const voicePresets = [
      "Harper 🇺🇸 (ElevenLabs 98.4%)",
      "Coralie 🇫🇷 (XTTS Clone 94.2%)",
      "Lorena 🇩🇪 (Authentic Human)",
      "Noa 🇪🇸 (VALL-E Deepfake)"
    ];
    let vIdx = 0;
    voiceSelectBtn.addEventListener('click', () => {
      vIdx = (vIdx + 1) % voicePresets.length;
      voiceSelectBtn.innerHTML = `
        <span>${voicePresets[vIdx]}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      `;
    });
  }
})();
