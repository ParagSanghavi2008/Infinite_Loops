/**
 * Symmetrical 3D Iridescent Particle Infinity Loop
 * Matches Gradium hero: dense, continuous, symmetrical ribbon of gems
 * Remains locked in place with constant dimensions (no cursor distortion)
 */
(function() {
  const canvas = document.getElementById('infinity-particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const TOTAL_POINTS = 3800;

  // Fixed camera angles - CONSTANT position and dimensions, no mouse tracking
  const rotX = 0.22;
  let rotY = 0.0;
  let time = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.parentElement.clientWidth;
    height = canvas.parentElement.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resize);
  resize();

  // Vibrant gem colors on dark black canvas matching Gradium
  const gemColors = [
    '#00f2fe', '#4facfe', '#38ef7d', '#10b981', 
    '#facc15', '#f59e0b', '#fb7185', '#a855f7', '#38bdf8', '#ffffff'
  ];

  // Initialize symmetrical ribbon without scattering
  function initSymmetricalLoop() {
    particles = [];
    const strands = 6;
    const pointsPerStrand = TOTAL_POINTS / strands;

    for (let s = 0; s < strands; s++) {
      const strandPhase = (s / strands) * Math.PI * 2;

      for (let i = 0; i < pointsPerStrand; i++) {
        const t = (i / pointsPerStrand) * Math.PI * 2;
        // Tight, uniform tube radius
        const tubeRadius = 0.075 + (s % 2) * 0.02;
        const spiralAngle = t * 6 + strandPhase;

        particles.push({
          t: t,
          strand: s,
          spiralAngle: spiralAngle,
          tubeRadius: tubeRadius,
          speed: 0.002,
          size: 1.1 + (i % 3) * 0.4,
          color: gemColors[(i + s * 2) % gemColors.length],
          alpha: 0.7 + (i % 4) * 0.08
        });
      }
    }
  }

  initSymmetricalLoop();

  // Render loop - stays steady and constant at fixed coordinates
  function render() {
    time += 0.01;
    rotY += 0.003; // Calm continuous axial rotation only

    ctx.clearRect(0, 0, width, height);

    // Constant stable scale
    const scale = Math.min(width, height) * 0.52;
    const cx = width / 2;
    const cy = height / 2;

    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);

    const renderedPoints = [];

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.t += p.speed;

      // Symmetrical 3D Lemniscate of Bernoulli
      const sint = Math.sin(p.t);
      const cost = Math.cos(p.t);
      const denom = 1 + sint * sint;

      // Spine coordinates
      const spineX = (1.95 * cost) / denom;
      const spineY = (1.65 * sint * cost) / denom;
      const spineZ = Math.sin(p.t * 2) * 0.38;

      // Tight cylindrical ribbon
      const twist = p.spiralAngle + time * 0.7;
      const tubeX = Math.cos(twist) * p.tubeRadius;
      const tubeY = Math.sin(twist) * p.tubeRadius * 0.85;
      const tubeZ = Math.sin(twist * 2) * (p.tubeRadius * 0.45);

      const px = spineX + tubeX;
      const py = spineY + tubeY;
      const pz = spineZ + tubeZ;

      // Rotate Y
      const x1 = px * cosY - pz * sinY;
      const z1 = px * sinY + pz * cosY;

      // Rotate X
      const y1 = py * cosX - z1 * sinX;
      const z2 = py * sinX + z1 * cosX;

      // Constant Perspective projection (no cursor distortion)
      const fov = 3.6;
      const pScale = fov / (fov + z2);
      const screenX = cx + x1 * scale * pScale;
      const screenY = cy + y1 * scale * pScale;

      renderedPoints.push({
        x: screenX,
        y: screenY,
        z: z2,
        size: p.size * pScale,
        color: p.color,
        alpha: Math.max(0.15, Math.min(1.0, p.alpha * pScale))
      });
    }

    // Sort depth (back to front)
    renderedPoints.sort((a, b) => b.z - a.z);

    // Draw particles
    for (let i = 0; i < renderedPoints.length; i++) {
      const pt = renderedPoints[i];
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
      ctx.fillStyle = pt.color;
      ctx.globalAlpha = pt.alpha;
      ctx.fill();
    }

    ctx.globalAlpha = 1.0;
    requestAnimationFrame(render);
  }

  render();
})();
