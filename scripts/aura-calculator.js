/**
 * AURA Suspicion Score Reactive Calculator
 * Final score based on two factors:
 * 1. Voice Analysis (Weight: 60%)
 * 2. Conversation Analysis (Weight: 40%)
 * Formula: AURA = (0.60 * Voice) + (0.40 * Conversation)
 */
(function() {
  const voiceSlider = document.getElementById('voice-score-input');
  const convoSlider = document.getElementById('convo-score-input');
  const voiceReadout = document.getElementById('voice-val-readout');
  const convoReadout = document.getElementById('convo-val-readout');

  const scoreDisplay = document.getElementById('aura-score-display');
  const verdictText = document.getElementById('aura-verdict-text');
  const riskCards = document.querySelectorAll('.risk-card');

  let currentVoiceScore = 90;
  let currentConvoScore = 85;

  function calculateAuraScore() {
    // 60% Voice Analysis + 40% Conversation Analysis
    const finalScore = Math.round((currentVoiceScore * 0.60) + (currentConvoScore * 0.40));
    updateRiskLevel(finalScore);
  }

  function updateRiskLevel(score) {
    if (scoreDisplay) scoreDisplay.textContent = `${score} / 100`;

    riskCards.forEach(card => card.classList.remove('active-tier'));

    if (score <= 30) {
      const lowCard = document.querySelector('.risk-card-low');
      if (lowCard) lowCard.classList.add('active-tier');
      if (verdictText) verdictText.textContent = "Verdict: Low Suspicion (Authentic)";
    } else if (score <= 60) {
      const medCard = document.querySelector('.risk-card-medium');
      if (medCard) medCard.classList.add('active-tier');
      if (verdictText) verdictText.textContent = "Verdict: Moderate Suspicion (Verify)";
    } else if (score <= 80) {
      const highCard = document.querySelector('.risk-card-high');
      if (highCard) highCard.classList.add('active-tier');
      if (verdictText) verdictText.textContent = "Verdict: High Suspicion (Warning)";
    } else {
      const critCard = document.querySelector('.risk-card-critical');
      if (critCard) critCard.classList.add('active-tier');
      if (verdictText) verdictText.textContent = "Verdict: Critical Suspicion (Fake/Extortion)";
      if (window.InfiniteLoopClient && typeof window.InfiniteLoopClient.showCriticalAlert === 'function') {
        window.InfiniteLoopClient.showCriticalAlert(score, "VOICE CLONING & EXTORTION DETECTED. Immediate action required.");
      }
    }
  }

  // Voice Analysis slider listener (60%)
  if (voiceSlider) {
    voiceSlider.addEventListener('input', (e) => {
      currentVoiceScore = parseInt(e.target.value, 10);
      if (voiceReadout) voiceReadout.textContent = `${currentVoiceScore}%`;
      calculateAuraScore();
    });
  }

  // Conversation Analysis slider listener (40%)
  if (convoSlider) {
    convoSlider.addEventListener('input', (e) => {
      currentConvoScore = parseInt(e.target.value, 10);
      if (convoReadout) convoReadout.textContent = `${currentConvoScore}%`;
      calculateAuraScore();
    });
  }

  // Fallback for single slider if present
  const singleSlider = document.getElementById('aura-score-input');
  const singleReadout = document.getElementById('slider-val-readout');
  if (singleSlider && !voiceSlider) {
    singleSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (singleReadout) singleReadout.textContent = val;
      updateRiskLevel(val);
    });
  }

  // Initial calculation (90 * 0.60 + 85 * 0.40 = 54 + 34 = 88)
  calculateAuraScore();
})();
