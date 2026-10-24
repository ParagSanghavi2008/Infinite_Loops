/**
 * AURA Risk Matrix Reactive Calculator (Image 3)
 */
(function() {
  const slider = document.getElementById('aura-score-input');
  const scoreDisplay = document.getElementById('aura-score-display');
  const scoreValText = document.getElementById('slider-val-readout');
  const riskCards = document.querySelectorAll('.risk-card');

  function updateRiskLevel(score) {
    if (scoreDisplay) scoreDisplay.textContent = `${score} / 100`;
    if (scoreValText) scoreValText.textContent = score;

    riskCards.forEach(card => card.classList.remove('active-tier'));

    if (score <= 30) {
      const lowCard = document.querySelector('.risk-card-low');
      if (lowCard) lowCard.classList.add('active-tier');
    } else if (score <= 60) {
      const medCard = document.querySelector('.risk-card-medium');
      if (medCard) medCard.classList.add('active-tier');
    } else if (score <= 80) {
      const highCard = document.querySelector('.risk-card-high');
      if (highCard) highCard.classList.add('active-tier');
    } else {
      const critCard = document.querySelector('.risk-card-critical');
      if (critCard) critCard.classList.add('active-tier');
    }
  }

  if (slider) {
    slider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      updateRiskLevel(val);
    });

    // Initialize with sample score 88 (Critical Risk)
    updateRiskLevel(88);
  }
})();
