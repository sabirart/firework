// Custom Alert System
const customAlert = document.createElement('div');
customAlert.id = 'custom-alert';
customAlert.innerHTML = `
    <div class="alert-box">
        <p id="alert-message"></p>
        <button id="alert-close">OK</button>
    </div>
`;
document.body.appendChild(customAlert);

// Function to show custom alert
function showAlert(message) {
    const alertMessage = document.getElementById('alert-message');
    const alertClose = document.getElementById('alert-close');
    alertMessage.textContent = message;
    customAlert.style.display = 'flex';

    // Close alert on button click
    alertClose.addEventListener('click', () => {
        customAlert.style.display = 'none';
    });

    // Close alert on clicking outside the box
    customAlert.addEventListener('click', (e) => {
        if (e.target === customAlert) {
            customAlert.style.display = 'none';
        }
    });
}

// DOMContentLoaded Event
document.addEventListener("DOMContentLoaded", function () {
    var helpIcon = document.getElementById("help-icon");
    var popup = document.getElementById("popup");

    // Toggle instructions when clicking the "?" icon
    helpIcon.addEventListener("click", function (event) {
        popup.classList.toggle("show"); // Show/Hide Popup
        event.stopPropagation(); // Prevent immediate closing
    });

    // Hide instructions when clicking outside the popup
    document.addEventListener("click", function (event) {
        if (!popup.contains(event.target) && event.target !== helpIcon) {
            popup.classList.remove("show");
        }
    });

    // Handle Page Visibility (Pause interactions when page is inactive)
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            document.body.style.pointerEvents = "none"; // Disable interactions
        } else {
            document.body.style.pointerEvents = "auto"; // Enable interactions
        }
    });
});

// How to Use Pop
let countdown = 5;
let countdownElement = document.getElementById("countdown");
let popup = document.getElementById("popup");

function updateCountdown() {
    if (countdown > 0) {
        countdown--;
        countdownElement.textContent = countdown;
    } else {
        popup.classList.remove("show");
        clearInterval(timer);
    }
}

// Start countdown
let timer = setInterval(updateCountdown, 1000);

// Auto close pop-up after 5 seconds
setTimeout(() => {
    popup.classList.remove("show");
}, 5000);

// Initialize Canvas and Context
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Fireworks Properties
const fireworks = []; // Array to store active fireworks
const particles = []; // Array to store active particles
const particlePool = []; // Object pool for reusing particles
let gravity = parseFloat(localStorage.getItem('gravity')) || 0.05; // Gravity value from localStorage or default
let intensity = parseInt(localStorage.getItem('intensity')) || 100; // Intensity value from localStorage or default


// Sound Effects
const fireworkSounds = [
    new Audio('sounds/firework-sound-1.mp3'),
    new Audio('sounds/firework-sound-2.mp3'),
    new Audio('sounds/firework-sound-3.mp3')
];

// Background Music System
const backgroundMusicTracks = [
    new Audio('sounds/Evening glow - Soft Piano Music - Clavier-Music.mp3'),
    new Audio('sounds/Relaxing Piano Music for Thursday 1 - tramp963.mp3'),
    new Audio('sounds/Relaxing Piano Music for Thursday 2 - tramp963.mp3')
];
let currentTrackIndex = 0; // Track the currently playing music
backgroundMusicTracks.forEach(track => track.loop = true); // Loop all tracks

// Music Toggle Functionality
const musicToggle = document.getElementById('music-toggle');
musicToggle.addEventListener('click', () => {
    // Stop the current track
    if (currentTrackIndex < backgroundMusicTracks.length) {
        backgroundMusicTracks[currentTrackIndex].pause();
        backgroundMusicTracks[currentTrackIndex].currentTime = 0; // Reset to start
    }

    // Move to the next state
    currentTrackIndex = (currentTrackIndex + 1) % (backgroundMusicTracks.length + 1);

    if (currentTrackIndex < backgroundMusicTracks.length) {
        // Play the next track
        backgroundMusicTracks[currentTrackIndex].play();
        showAlert(`Now playing: Background Music Track ${currentTrackIndex + 1}`);
    } else {
        // Mute (no background music)
        showAlert('Background music is muted.');
    }
});

// Initialize the first track
backgroundMusicTracks[currentTrackIndex].play();

// Mute Sound Functionality
const muteSoundButton = document.getElementById('mute-sound');
let isMuted = localStorage.getItem('isMuted') === 'true'; // Get mute state from localStorage

// Update mute state and icon
function updateMuteState() {
    if (isMuted) {
        fireworkSounds.forEach(sound => sound.muted = true);
        backgroundMusicTracks.forEach(track => track.muted = true); // Mute all tracks
        muteSoundButton.classList.add('unmuted'); // Change icon to unmute
    } else {
        fireworkSounds.forEach(sound => sound.muted = false);
        backgroundMusicTracks.forEach(track => track.muted = false); // Unmute all tracks
        muteSoundButton.classList.remove('unmuted'); // Change icon to mute
    }
    localStorage.setItem('isMuted', isMuted); // Save mute state to localStorage
}

// Toggle mute state on button click
muteSoundButton.addEventListener('click', () => {
    isMuted = !isMuted; // Toggle mute state
    updateMuteState();
});

// Initialize mute state on page load
updateMuteState(); 

// Firework Shapes
let currentShape = localStorage.getItem('currentShape') || 'circle'; // Default shape
const shapes = ['circle', 'star', 'heart'];

// Toggle Firework Shape
document.getElementById('shape-toggle').addEventListener('click', () => {
    const currentIndex = shapes.indexOf(currentShape);
    currentShape = shapes[(currentIndex + 1) % shapes.length];
    localStorage.setItem('currentShape', currentShape);
    showAlert(`Firework shape changed to: ${currentShape}`); // Custom alert
});

// Save/Load/Reset Settings
document.getElementById('save-settings').addEventListener('click', () => {
    const settings = {
        gravity: parseFloat(document.getElementById('gravity').value),
        intensity: parseInt(document.getElementById('intensity').value),
        particleSize: parseFloat(document.getElementById('particleSize').value), // Add particle size
        isMuted: isMuted,
        currentShape: currentShape,
        musicPlaying: !backgroundMusic.paused
    };
    localStorage.setItem('fireworksSettings', JSON.stringify(settings));
    showAlert('Settings saved!'); // Custom alert
});

document.getElementById('reset-settings').addEventListener('click', () => {
    localStorage.removeItem('fireworksSettings');
    document.getElementById('gravity').value = 0.05;
    document.getElementById('intensity').value = 100;
    document.getElementById('particleSize').value = 3; // Reset particle size
    isMuted = false;
    currentShape = 'circle';
    backgroundMusic.pause();
    updateMuteState();
    showAlert('Settings reset to default!'); // Custom alert
});

// Firework Class
class Firework {
    constructor(x, y, targetY, color) {
        this.x = x;
        this.y = y;
        this.targetY = targetY;
        this.color = color;
        this.speed = Math.random() * 2 + 2;
        this.radius = 3;
    }

    // Update firework position
    update() {
        this.y -= this.speed;
        if (this.y <= this.targetY) {
            this.explode();
            return true; // Mark for removal
        }
        return false;
    }

    // Draw firework
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // Explode firework into particles
    explode() {
        const sound = fireworkSounds[Math.floor(Math.random() * fireworkSounds.length)];
        sound.currentTime = 0; // Reset sound to start
        sound.play(); // Play random sound

        const particleCount = intensity;
        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            const particle = particlePool.length > 0 ? particlePool.pop() : new Particle();
            particle.init(this.x, this.y, angle, speed, this.color);
            particles.push(particle);
        }

        // Add secondary sparks
        if (Math.random() < 0.5) {
            setTimeout(() => {
                for (let i = 0; i < particleCount / 2; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 3 + 1;
                    const particle = particlePool.length > 0 ? particlePool.pop() : new Particle();
                    particle.init(this.x, this.y, angle, speed, this.color);
                    particles.push(particle);
                }
            }, 200);
        }
    }
}

// ============================================
// Particle Class
// ============================================
class Particle {
    init(x, y, angle, speed, color) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
        this.color = color;
        this.radius = Math.random() * particleSize + 1; // Use particleSize for radius
        this.alpha = 1;
        this.gravity = gravity;
    }

    // particle position
    update() {
        this.speed *= 0.99; // Slow down over time
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.alpha -= 0.01; // Fade out
        this.gravity += 0.01; // Increase gravity over time
        return this.alpha > 0;
    }

    // Draw particle
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;

        switch (currentShape) {
            case 'circle':
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
                break;
            case 'star':
                this.drawStar(this.x, this.y, this.radius);
                break;
            case 'heart':
                this.drawHeart(this.x, this.y, this.radius);
                break;
        }
        ctx.restore();
    }

    drawStar(x, y, radius) {
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
            const x1 = x + Math.cos(angle) * radius;
            const y1 = y + Math.sin(angle) * radius;
            ctx.lineTo(x1, y1);
            const angle2 = ((i + 0.5) * 2 * Math.PI) / 5 - Math.PI / 2;
            const x2 = x + Math.cos(angle2) * (radius / 2);
            const y2 = y + Math.sin(angle2) * (radius / 2);
            ctx.lineTo(x2, y2);
        }
        ctx.closePath();
        ctx.fill();
    }

    drawHeart(x, y, radius) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(x - radius, y - radius, x - radius * 2, y + radius, x, y + radius * 2);
        ctx.bezierCurveTo(x + radius * 2, y + radius, x + radius, y - radius, x, y);
        ctx.closePath();
        ctx.fill();
    }
}

// ============================================
// Create Firework Function
// ============================================
function createFirework() {
    const x = Math.random() * canvas.width;
    const y = canvas.height;
    const targetY = Math.random() * canvas.height * 0.3 + canvas.height * 0.2;
    const color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    fireworks.push(new Firework(x, y, targetY, color));
}
// ============================================
// Particle Size Customization
// ============================================
let particleSize = parseFloat(localStorage.getItem('particleSize')) || 0.8; // Default size

// Update particle size from slider
document.getElementById('particleSize').addEventListener('input', (e) => {
    particleSize = parseFloat(e.target.value);
    localStorage.setItem('particleSize', particleSize); // Save size to localStorage
});
// Animation Loop
function animate() {
    // Clear only the background but keep a slight glow effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Faint trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw fireworks
    for (let i = fireworks.length - 1; i >= 0; i--) {
        if (fireworks[i].update()) {
            fireworks.splice(i, 1); // Remove exploded fireworks
        } else {
            fireworks[i].draw();
        }
    }

    // Update and draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
        if (!particles[i].update()) {
            particlePool.push(particles[i]); // Reuse particles
            particles.splice(i, 1);
        } else {
            ctx.globalCompositeOperation = "lighter"; // Make fireworks glow
            particles[i].draw();
            ctx.globalCompositeOperation = "source-over"; // Reset mode
        }
    }

    requestAnimationFrame(animate); // Continue animation loop
}

// Event Listeners
// Create fireworks at intervals
setInterval(createFirework, 1000);

// Create fireworks on click
canvas.addEventListener('click', (e) => {
    const x = e.clientX;
    const y = canvas.height;
    const targetY = e.clientY;
    const color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    fireworks.push(new Firework(x, y, targetY, color));
});

// Create fireworks on touch (for mobile)
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = canvas.height;
    const targetY = touch.clientY;
    const color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    fireworks.push(new Firework(x, y, targetY, color));
});

// Update gravity and intensity from controls
document.getElementById('gravity').addEventListener('input', (e) => {
    gravity = parseFloat(e.target.value);
    localStorage.setItem('gravity', gravity);
});

document.getElementById('intensity').addEventListener('input', (e) => {
    intensity = parseInt(e.target.value);
    localStorage.setItem('intensity', intensity);
});

// Full-screen toggle
const fullscreenToggle = document.getElementById('fullscreen-toggle');
fullscreenToggle.addEventListener('click', () => {
    toggleFullScreen();
});

// Full-screen shortcut (F key)
document.addEventListener('keydown', (e) => {
    if (e.key === 'f' || e.key === 'F') {
        toggleFullScreen();
    }
});

// Disable right-click
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Full-Screen Toggle Function
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            showAlert(`Error attempting to enable full-screen mode: ${err.message}`);
        });
        fullscreenToggle.classList.remove('fullscreen');
        fullscreenToggle.classList.add('smallscreen');
    } else {
        document.exitFullscreen();
        fullscreenToggle.classList.remove('smallscreen');
        fullscreenToggle.classList.add('fullscreen');
    }
}

// Toggle Sound Mute with 'M' Key
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'm') {
        isMuted = !isMuted; // Toggle mute state
        updateMuteState();
    }
});

// Start Animation
animate();