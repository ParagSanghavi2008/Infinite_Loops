/**
 * Scanner & Interactive Stream Inspector (Image 2)
 */
(function() {
  // Voice stream selection
  const streamItems = document.querySelectorAll('.stream-item');
  const previewText = document.getElementById('interceptor-desc-text');
  const previewScore = document.getElementById('interceptor-score-val');

  const streamData = {
    'harper': {
      text: "Acoustic anomaly score: 99.2%. Phase cancellation and micro-pitch jitter absent in natural human vocal tract. High likelihood of ElevenLabs Turbo v2 model.",
      score: "99.2% Deepfake Anomaly"
    },
    'coralie': {
      text: "Neural vocoder artifact detected in high-frequency spectrum (>14kHz). Formant resonance lacks natural buccal cavity reverberation.",
      score: "94.8% Synthetic Vocoder"
    },
    'lorena': {
      text: "Biological vocal tract dynamics verified. Glottal open-quotient entropy is 0.88, consistent with genuine human phonation.",
      score: "1.2% Low Risk (Human)"
    },
    'noa': {
      text: "Zero-shot cloned diffusion signature flagged. Zero biological respiration cues during a 7-second continuous monologue.",
      score: "88.7% Zero-Shot Clone"
    },
    'beatriz': {
      text: "Acoustic prosody matches cross-language speech synthesis attack pattern. Immediate biometric alert dispatched to incident queue.",
      score: "96.1% Neural Impersonator"
    }
  };

  streamItems.forEach(item => {
    item.addEventListener('click', () => {
      streamItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const target = item.dataset.stream;
      if (streamData[target]) {
        if (previewText) previewText.textContent = streamData[target].text;
        if (previewScore) previewScore.textContent = streamData[target].score;
      }
    });
  });

  // Recording & Spectrogram Canvas
  const recordBtn = document.getElementById('scanner-record-trigger');
  const scanCanvas = document.getElementById('live-spectrogram-canvas');
  const scannerStatus = document.getElementById('scanner-status-label');

  let isScanning = false;
  let scanAnimId = null;

  if (scanCanvas) {
    const sCtx = scanCanvas.getContext('2d');
    const width = scanCanvas.parentElement.clientWidth || 300;
    const height = 48;
    scanCanvas.width = width;
    scanCanvas.height = height;

    function drawIdleWaves() {
      sCtx.clearRect(0, 0, width, height);
      sCtx.fillStyle = 'rgba(0, 242, 254, 0.4)';
      const bars = 40;
      const barWidth = width / bars;

      for (let i = 0; i < bars; i++) {
        const barHeight = isScanning 
          ? Math.random() * (height - 8) + 4
          : Math.sin(Date.now() * 0.003 + i * 0.3) * 6 + 10;

        const x = i * barWidth;
        const y = (height - barHeight) / 2;

        sCtx.fillStyle = isScanning ? '#ff3b5c' : '#00f2fe';
        sCtx.fillRect(x + 1, y, barWidth - 2, barHeight);
      }

      scanAnimId = requestAnimationFrame(drawIdleWaves);
    }

    drawIdleWaves();

    if (recordBtn) {
      recordBtn.addEventListener('click', () => {
        isScanning = !isScanning;
        if (isScanning) {
          recordBtn.classList.add('active');
          if (scannerStatus) scannerStatus.textContent = "ANALYZING ACOUSTIC SPECTRUM... [HIGH ANOMALY DETECTED]";
          scannerStatus.style.color = "#ff3b5c";
        } else {
          recordBtn.classList.remove('active');
          if (scannerStatus) scannerStatus.textContent = "READY FOR LIVE STREAM INGESTION (44.1kHz)";
          scannerStatus.style.color = "var(--text-dim)";
        }
      });
    }
  }
})();
