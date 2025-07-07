const canvas = document.getElementById('stars-bg');
const ctx = canvas.getContext('2d');
let stars = [];
const STAR_COUNT = 120;
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}
function createStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: randomBetween(0.5, 1.7),
      baseAlpha: randomBetween(0.5, 1),
      alpha: 1,
      twinkleSpeed: randomBetween(0.005, 0.010),
      twinklePhase: Math.random() * Math.PI * 2
    });
  }
}
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let star of stars) {
    // Twinkle effect
    star.alpha = star.baseAlpha + Math.sin(Date.now() * star.twinkleSpeed + star.twinklePhase) * 0.3;
    ctx.globalAlpha = Math.max(0, Math.min(1, star.alpha));
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 8;
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}
function animate() {
  drawStars();
  requestAnimationFrame(animate);
}
function onResize() {
  resizeCanvas();
  createStars();
}
window.addEventListener('resize', onResize);
resizeCanvas();
createStars();
animate();
