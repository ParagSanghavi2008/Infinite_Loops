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
      text: "AI Voice Clone Detected (99.2%): Robotic voice pitch and lack of human breathing detected. Matches synthetic voice generation.",
      score: "99.2% AI Fake"
    },
    'coralie': {
      text: "Computer Voice Detected: Digital frequency artifacts found. Voice lacks natural throat and mouth resonance.",
      score: "94.8% Synthetic Voice"
    },
    'lorena': {
      text: "Real Human Voice Verified: Natural voice pitch variation, breath pauses, and natural room echo confirmed authentic.",
      score: "1.2% Safe (Real Human)"
    },
    'noa': {
      text: "Cloned Voice Flagged: Zero breathing pauses during 7 seconds of continuous talking. Clear sign of an AI clone.",
      score: "88.7% Cloned Voice"
    },
    'beatriz': {
      text: "AI Impersonation Attack: Synthetic speech rhythm detected impersonating a trusted contact. Alert sent to security.",
      score: "96.1% AI Impersonator"
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
          if (scannerStatus) scannerStatus.textContent = "ANALYZING VOICE FOR AI CLONING... [HIGH ANOMALY DETECTED]";
          scannerStatus.style.color = "#ff3b5c";
        } else {
          recordBtn.classList.remove('active');
          if (scannerStatus) scannerStatus.textContent = "READY FOR LIVE VOICE ANALYSIS";
          scannerStatus.style.color = "var(--text-dim)";
        }
      });
    }
  }
})();
