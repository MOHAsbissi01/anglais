 // Get the canvas element and its context
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particle Array
let particlesArray = [];

// Create Particle Class
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = "rgba(0, 204, 204, 0.8)";
  }

  // Update particle position and draw it
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Create the animation effect
    if (this.size > 0.2) this.size -= 0.1;
    this.draw();
  }

  // Draw the particle
  draw() {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
}

// Create particles at mouse position
window.addEventListener('mousemove', (e) => {
  const xPos = e.x;
  const yPos = e.y;
  for (let i = 0; i < 5; i++) {
    particlesArray.push(new Particle(xPos, yPos));
  }
});

// Animate particles
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    // Remove particles if they are too small
    if (particlesArray[i].size <= 0.2) {
      particlesArray.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animateParticles);
}

// Initialize particle animation
animateParticles();

// Resize canvas when the window size changes
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
