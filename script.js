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
    if (helpIcon && popup) {
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
    }
});

// How to Use Pop
let countdown = 5;
let countdownElement = document.getElementById("countdown");
let popup = document.getElementById("popup");

if (countdownElement && popup) {
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
}

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

// Speed Control
let fireworkSpeed = parseFloat(localStorage.getItem('fireworkSpeed')) || 2; // Default speed

// Update speed from slider
const speedInput = document.getElementById('speed');
const speedValue = document.getElementById('speed-value');

if (speedInput && speedValue) {
    speedInput.value = fireworkSpeed;
    speedValue.textContent = fireworkSpeed;

    // Update speed when slider changes
    speedInput.addEventListener('input', (e) => {
        fireworkSpeed = parseFloat(e.target.value);
        speedValue.textContent = fireworkSpeed;
        localStorage.setItem('fireworkSpeed', fireworkSpeed); // Save speed to localStorage
    });
}

// Sound Effects
const fireworkSounds = [
    new Audio('sounds/firework-sound-1.mp3'),
    new Audio('sounds/firework-sound-2.mp3'),
    new Audio('sounds/firework-sound-3.mp3')
];

// Background Music System
const backgroundMusicTracks = [
    { audio: new Audio('sounds/Evening glow - Soft Piano Music - Clavier-Music.mp3'), name: "Evening Glow - Soft Piano Music" },
    { audio: new Audio('sounds/Relaxing Piano Music for Thursday 1 - tramp963.mp3'), name: "Relaxing Piano Music for Thursday 1" },
    { audio: new Audio('sounds/Relaxing Piano Music for Thursday 2 - tramp963.mp3'), name: "Relaxing Piano Music for Thursday 2" }
];
let currentTrackIndex = 0; // Track the currently playing music
backgroundMusicTracks.forEach(track => track.audio.loop = true); // Loop all tracks

// Music Toggle Functionality
const musicToggle = document.getElementById('music-toggle');
if (musicToggle) {
    musicToggle.addEventListener('click', () => {
        // Stop the current track
        if (currentTrackIndex < backgroundMusicTracks.length) {
            backgroundMusicTracks[currentTrackIndex].audio.pause();
            backgroundMusicTracks[currentTrackIndex].audio.currentTime = 0; // Reset to start
        }

        // Move to the next state
        currentTrackIndex = (currentTrackIndex + 1) % (backgroundMusicTracks.length + 1);

        if (currentTrackIndex < backgroundMusicTracks.length) {
            // Play the next track
            backgroundMusicTracks[currentTrackIndex].audio.play();
            showAlert(`Now playing: ${backgroundMusicTracks[currentTrackIndex].name}`); // Show full track name
        } else {
            // Mute (no background music)
            showAlert('Background music is muted.');
        }
    });
}

// Initialize the first track
if (backgroundMusicTracks[currentTrackIndex]) {
    backgroundMusicTracks[currentTrackIndex].audio.play();
}

// Mute Sound Functionality
const muteSoundButton = document.getElementById('mute-sound');
let isMuted = localStorage.getItem('isMuted') === 'true'; // Get mute state from localStorage

// Update mute state and icon
function updateMuteState() {
    if (isMuted) {
        fireworkSounds.forEach(sound => sound.muted = true);
        backgroundMusicTracks.forEach(track => track.audio.muted = true); // Mute all tracks
        muteSoundButton.classList.add('unmuted'); // Change icon to unmute
    } else {
        fireworkSounds.forEach(sound => sound.muted = false);
        backgroundMusicTracks.forEach(track => track.audio.muted = false); // Unmute all tracks
        muteSoundButton.classList.remove('unmuted'); // Change icon to mute
    }
    localStorage.setItem('isMuted', isMuted); // Save mute state to localStorage
}

if (muteSoundButton) {
    // Toggle mute state on button click
    muteSoundButton.addEventListener('click', () => {
        isMuted = !isMuted; // Toggle mute state
        updateMuteState();
    });

    // Initialize mute state on page load
    updateMuteState();
}

// Firework Shapes
let currentShape = localStorage.getItem('currentShape') || 'circle'; // Default shape
const shapes = ['circle', 'star', 'heart'];

// Toggle Firework Shape
const shapeToggle = document.getElementById('shape-toggle');
if (shapeToggle) {
    shapeToggle.addEventListener('click', () => {
        const currentIndex = shapes.indexOf(currentShape);
        currentShape = shapes[(currentIndex + 1) % shapes.length];
        localStorage.setItem('currentShape', currentShape);
        showAlert(`Firework shape changed to: ${currentShape}`); // Custom alert
    });
}

// Save/Load/Reset Settings
const saveSettings = document.getElementById('save-settings');
const resetSettings = document.getElementById('reset-settings');

if (saveSettings && resetSettings) {
    saveSettings.addEventListener('click', () => {
        const settings = {
            gravity: parseFloat(document.getElementById('gravity').value),
            intensity: parseInt(document.getElementById('intensity').value),
            particleSize: parseFloat(document.getElementById('particleSize').value),
            fireworkSpeed: parseFloat(document.getElementById('speed').value), // Save speed
            isMuted: isMuted,
            currentShape: currentShape,
            musicPlaying: !backgroundMusicTracks[currentTrackIndex].audio.paused
        };
        localStorage.setItem('fireworksSettings', JSON.stringify(settings));
        showAlert('Settings saved!');
    });

    resetSettings.addEventListener('click', () => {
        localStorage.removeItem('fireworksSettings');
        document.getElementById('gravity').value = 0.05;
        document.getElementById('intensity').value = 100;
        document.getElementById('particleSize').value = 3;
        document.getElementById('speed').value = 2; // Reset speed to default
        if (speedValue) speedValue.textContent = 2; // Update speed display
        isMuted = false;
        currentShape = 'circle';
        if (backgroundMusicTracks[currentTrackIndex]) {
            backgroundMusicTracks[currentTrackIndex].audio.pause();
        }
        updateMuteState();
        showAlert('Settings reset to default!');
    });
}

// Firework Class
class Firework {
    constructor(x, y, targetY, color) {
        this.x = x;
        this.y = y;
        this.targetY = targetY;
        this.color = color;
        this.speed = fireworkSpeed; // Use the global fireworkSpeed value
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

// Particle Class
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

// Create Firework Function
function createFirework() {
    const x = Math.random() * canvas.width;
    const y = canvas.height;
    const targetY = Math.random() * canvas.height * 0.3 + canvas.height * 0.2;
    const color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    fireworks.push(new Firework(x, y, targetY, color));
}

// Particle Size Customization
let particleSize = parseFloat(localStorage.getItem('particleSize')) || 0.8; // Default size

// Update particle size from slider
const particleSizeInput = document.getElementById('particleSize');
if (particleSizeInput) {
    particleSizeInput.addEventListener('input', (e) => {
        particleSize = parseFloat(e.target.value);
        localStorage.setItem('particleSize', particleSize); // Save size to localStorage
    });
}

// Animation Loop
let animationFrameId;

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

    animationFrameId = requestAnimationFrame(animate); // Continue animation loop
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
const gravityInput = document.getElementById('gravity');
const intensityInput = document.getElementById('intensity');

if (gravityInput) {
    gravityInput.addEventListener('input', (e) => {
        gravity = parseFloat(e.target.value);
        localStorage.setItem('gravity', gravity);
    });
}

if (intensityInput) {
    intensityInput.addEventListener('input', (e) => {
        intensity = parseInt(e.target.value);
        localStorage.setItem('intensity', intensity);
    });
}

// Full-screen toggle
const fullscreenToggle = document.getElementById('fullscreen-toggle');
if (fullscreenToggle) {
    fullscreenToggle.addEventListener('click', () => {
        toggleFullScreen();
    });
}

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

// Handle Page Visibility (Pause everything when page is inactive)
document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        cancelAnimationFrame(animationFrameId); // Stop the animation loop
        backgroundMusicTracks.forEach(track => track.audio.pause()); // Pause background music
        fireworkSounds.forEach(sound => sound.pause()); // Pause firework sounds
        document.body.style.pointerEvents = "none"; // Disable interactions
    } else {
        animate(); // Restart the animation loop
        if (currentTrackIndex < backgroundMusicTracks.length) {
            backgroundMusicTracks[currentTrackIndex].audio.play(); // Resume background music
        }
        document.body.style.pointerEvents = "auto"; // Enable interactions
    }
});

// Stop everything on page unload
window.addEventListener("beforeunload", function () {
    cancelAnimationFrame(animationFrameId); // Stop the animation loop
    backgroundMusicTracks.forEach(track => track.audio.pause()); // Pause background music
    fireworkSounds.forEach(sound => sound.pause()); // Pause firework sounds
    document.body.style.pointerEvents = "none"; // Disable interactions
});

// Start Animation
animate();