document.addEventListener('DOMContentLoaded', function () {
    // Check if contact icon already exists to prevent duplicates
    if (document.querySelector('.contact-icon')) return;

    // Create the floating contact icon
    const contactIcon = document.createElement('div');
    contactIcon.className = 'contact-icon';
    contactIcon.innerHTML = '<i class="fas fa-comment-dots"></i>';
    contactIcon.onclick = showContactPopup;
    document.body.appendChild(contactIcon);

    // Create the contact popup
    const contactPopup = document.createElement('div');
    contactPopup.id = 'contactPopup';
    contactPopup.className = 'popup';
    contactPopup.style.display = "none"; // Initially hidden

    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';

    const closeButton = document.createElement('span');
    closeButton.className = 'popclose';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = () => closePopup('contactPopup');
    popupContent.appendChild(closeButton);

    // Left Side - Contact Form
    const contactContent = document.createElement('div');
    contactContent.className = 'contact-content';
    contactContent.innerHTML = `
        <h3>Send Message<br>Feedback/Suggestions and Support Me</h3><br>
        <form id="contact-form" class="contact-form">
            <div>
                <input type="text" id="name" placeholder="Your Name" required aria-label="Your Name">
                <span id="name-error" class="error-message"></span>
            </div>
            <div>
                <input type="email" id="email" placeholder="Your Email" required aria-label="Your Email">
                <span id="email-error" class="error-message"></span>
            </div>
            <div>
                <textarea id="message" placeholder="Your Message" required aria-label="Your Message"></textarea>
                <span id="message-error" class="error-message"></span>
            </div>
            <button type="submit">Send Message</button>
        </form>
        <!-- Pop-up (Hidden by Default) -->
<div id="done-pop" class="popup" style="display: none;">
  <div class="popup-content">
    <p id="done-pop-message"></p>
  </div>
</div>
    `;
    popupContent.appendChild(contactContent);

    // Right Side - Bank Details
    const bankDetails = document.createElement('div');
    bankDetails.className = 'bank-details';
    bankDetails.innerHTML = `
        <h2>Support Me<br>Via Bank Transfer</h2>
        <p><strong>Country: <br></strong> Pakistan</p>
        <p><strong>Bank Name:<br></strong> Bank Al Habib</p>
        <p><strong>Account Title:<br></strong> Sabir Hussain</p>
        <p><strong>Account Number:<br></strong> 1234-5678901234</p>
        <p><strong>IBAN:<br></strong>PK36BAHL1234567890123456</p>
        <p style="margin-top: 16px; font-size: 0.7rem; color: #aaa;">
            You can use these details to send money via bank transfer or Contact sabirhussain0166@gmail.com
        </p>
    `;
    popupContent.appendChild(bankDetails);

    contactPopup.appendChild(popupContent);
    document.body.appendChild(contactPopup);

    // Success Pop-up
    const successPopup = document.createElement('div');
    successPopup.id = 'popup';
    successPopup.className = 'popup';
    successPopup.style.display = 'none';

    const successPopupContent = document.createElement('div');
    successPopupContent.className = 'popup-content';
    successPopupContent.innerHTML = '<p id="popup-message"></p>';
    successPopup.appendChild(successPopupContent);
    document.body.appendChild(successPopup);

    // Close pop-up when clicking outside the box
    contactPopup.addEventListener('click', function (event) {
        if (event.target === contactPopup) {
            closePopup('contactPopup');
        }
    });

    // Show Pop-up
    function showPopup(message) {
        const popup = document.getElementById('popup');
        const popupMessage = document.getElementById('popup-message');
        popupMessage.textContent = message;
        popup.style.display = 'flex';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 3000);
    }

    // Show Contact Pop-up
    function showContactPopup() {
        const popup = document.getElementById("contactPopup");
        popup.style.display = "flex";
    }

    // Close Pop-up (for all pop-ups)
    function closePopup(popupId) {
        const popup = document.getElementById(popupId);
        popup.style.display = "none";
    }
});


//index HTML
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
let closePopupBtn = document.getElementById("closePopup");
let countdownContainer = document.querySelector(".countdown-container"); // Select the countdown section

if (countdownElement && popup && closePopupBtn && countdownContainer) {
    function updateCountdown() {
        if (countdown > 0) {
            countdown--;
            countdownElement.textContent = countdown;
        } else {
            countdownContainer.style.display = "none"; // Hide countdown section
            clearInterval(timer);
        }
    }

    // Start countdown
    let timer = setInterval(updateCountdown, 1000);

    // Auto close pop-up after 5 seconds
    setTimeout(() => {
        popup.classList.remove("show");
    }, 5000);

    // Close button event
    closePopupBtn.addEventListener("click", closePopup);

    // Click outside popup to close
    document.addEventListener("click", (event) => {
        if (popup.classList.contains("show") && !popup.querySelector(".popup-box").contains(event.target)) {
            closePopup();
        }
    });

    function closePopup() {
        popup.classList.remove("show");
        countdownContainer.style.display = "none"; // Hide countdown section if closed manually
        clearInterval(timer); // Stop countdown when manually closed
    }
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
        // Pause the currently playing track (if any)
        if (currentTrackIndex < backgroundMusicTracks.length) {
            backgroundMusicTracks[currentTrackIndex].audio.pause();
            backgroundMusicTracks[currentTrackIndex].audio.currentTime = 0; // Reset to start
        }

        // Move to the next state
        currentTrackIndex = (currentTrackIndex + 1) % (backgroundMusicTracks.length + 1);

        if (currentTrackIndex < backgroundMusicTracks.length) {
            // Play the next track
            backgroundMusicTracks[currentTrackIndex].audio.play()
                .then(() => {
                    showAlert(`Now playing: ${backgroundMusicTracks[currentTrackIndex].name}`); // Show full track name
                })
                .catch((error) => {
                    console.error('Failed to play music:', error);
                    showAlert('Failed to play music. Please interact with the page first.');
                });
        } else {
            // Mute (no background music)
            showAlert('Background music is muted.');
        }
    });
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
        currentShape = shapes[(currentIndex + 1) % shapes.length]; // Cycle through shapes
        localStorage.setItem('currentShape', currentShape); // Save shape to localStorage

        // Show a professional alert with the new shape
        showAlert(`Firework shape changed to: <b>${currentShape}</b>`, 2000); // Display for 2 seconds
    });
}

// Custom Alert Function
function showAlert(message, duration = 2000) {
    const alertBox = document.createElement('div');
    alertBox.style.position = 'fixed';
    alertBox.style.bottom = '12%';
    alertBox.style.left = '50%';
    alertBox.style.transform = 'translateX(-50%)';
    alertBox.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    alertBox.style.color = 'white';
    alertBox.style.padding = '10px 20px';
    alertBox.style.borderRadius = '40px';
    alertBox.style.fontSize = '14px';
    alertBox.style.zIndex = '1000';
    alertBox.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    alertBox.style.transition = 'opacity 0.8s ease-in-out';
    alertBox.innerHTML = message;

    document.body.appendChild(alertBox);

    // Fade in
    setTimeout(() => {
        alertBox.style.opacity = '1';
    }, 10);

    // Fade out and remove after duration
    setTimeout(() => {
        alertBox.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(alertBox);
        }, 500);
    }, duration);
}

// Save/Load/Reset Settings
const saveSettings = document.getElementById('save-settings');
const resetSettings = document.getElementById('reset-settings');

// Default settings
const defaultSettings = {
    gravity: 0.05,
    intensity: 100,
    particleSize: 3,
    fireworkSpeed: 2,
    isMuted: false,
    currentShape: 'circle',
    currentTrackIndex: 0
};

if (saveSettings && resetSettings) {
    saveSettings.addEventListener('click', () => {
        const settings = {
            gravity: parseFloat(document.getElementById('gravity').value),
            intensity: parseInt(document.getElementById('intensity').value),
            particleSize: parseFloat(document.getElementById('particleSize').value),
            fireworkSpeed: parseFloat(document.getElementById('speed').value), // Save speed
            isMuted: isMuted,
            currentShape: currentShape,
            currentTrackIndex: currentTrackIndex,
            musicPlaying: backgroundMusicTracks[currentTrackIndex] && !backgroundMusicTracks[currentTrackIndex].audio.paused
        };

        localStorage.setItem('fireworksSettings', JSON.stringify(settings));
        showAlert('Settings saved!');
    });

    resetSettings.addEventListener('click', () => {
        localStorage.removeItem('fireworksSettings');

        // Reset all inputs to default values
        Object.keys(defaultSettings).forEach(key => {
            if (document.getElementById(key)) {
                document.getElementById(key).value = defaultSettings[key];
            }
        });

        // Ensure displayed speed is updated
        if (document.getElementById('speedValue')) {
            document.getElementById('speedValue').textContent = defaultSettings.fireworkSpeed;
        }

        // Reset variables
        isMuted = defaultSettings.isMuted;
        currentShape = defaultSettings.currentShape;
        currentTrackIndex = defaultSettings.currentTrackIndex;

        // Stop all music tracks and reset them
        backgroundMusicTracks.forEach(track => {
            track.audio.pause();
            track.audio.currentTime = 0;
        });

        // Play the first track if not muted
        if (!isMuted && backgroundMusicTracks[currentTrackIndex]) {
            backgroundMusicTracks[currentTrackIndex].audio.play()
                .then(() => console.log('Music started after reset.'))
                .catch(error => console.error('Failed to play music after reset:', error));
        }

        updateMuteState();
        showAlert('Settings reset to default!');
    });
}


// Function to play a random firework sound
function playFireworkSound() {
    if (!isMuted) {
        const randomSound = fireworkSounds[Math.floor(Math.random() * fireworkSounds.length)];
        randomSound.currentTime = 0; // Reset to start
        randomSound.play();
    }
}

// Toggle Sound Mute with 'M' Key
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'm') {
        isMuted = !isMuted; // Toggle mute state
        updateMuteState();
    }
});

// Firework Class
class Firework {
    constructor(x, y, targetY, color) {
        this.x = x;
        this.y = y;
        this.targetY = targetY;
        this.color = color;
        this.speed = fireworkSpeed; // Use the global fireworkSpeed value
        this.radius = 3;
        this.hasExploded = false; // Track if the firework has exploded
    }

    // Update firework position
    update() {
        this.y -= this.speed;
        if (this.y <= this.targetY && !this.hasExploded) {
            this.explode();
            this.hasExploded = true;
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
        // Play a random firework sound
        const sound = fireworkSounds[Math.floor(Math.random() * fireworkSounds.length)];
        sound.currentTime = 0; // Reset sound to start
        sound.play();

        // Create primary particles
        this.createParticles(intensity, 5, 2); // Higher speed for primary explosion

        // Add secondary sparks with a delay
        if (Math.random() < 0.5) {
            setTimeout(() => {
                this.createParticles(intensity / 2, 3, 1); // Lower speed for secondary sparks
            }, 200);
        }
    }

    // Helper method to create particles
    createParticles(count, maxSpeed, minSpeed) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
            const particle = particlePool.length > 0 ? particlePool.pop() : new Particle();
            particle.init(this.x, this.y, angle, speed, this.color);
            particles.push(particle);
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
        this.fadeRate = 0.01; // Rate at which the particle fades
    }

    // Update particle position and state
    update() {
        this.speed *= 0.99; // Slow down over time
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.alpha -= this.fadeRate; // Fade out
        this.gravity += 0.01; // Increase gravity over time
        return this.alpha > 0; // Return false if the particle should be removed
    }

    // Draw particle
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;

        switch (currentShape) {
            case 'circle':
                this.drawCircle();
                break;
            case 'star':
                this.drawStar();
                break;
            case 'heart':
                this.drawHeart();
                break;
        }
        ctx.restore();
    }

    drawCircle() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    drawStar() {
        ctx.beginPath();
        const spikes = 5;
        const outerRadius = this.radius;
        const innerRadius = outerRadius / 2;
        for (let i = 0; i < spikes; i++) {
            const outerAngle = (i * 2 * Math.PI) / spikes - Math.PI / 2;
            const innerAngle = ((i + 0.5) * 2 * Math.PI) / spikes - Math.PI / 2;
            ctx.lineTo(this.x + Math.cos(outerAngle) * outerRadius, this.y + Math.sin(outerAngle) * outerRadius);
            ctx.lineTo(this.x + Math.cos(innerAngle) * innerRadius, this.y + Math.sin(innerAngle) * innerRadius);
        }
        ctx.closePath();
        ctx.fill();
    }

    drawHeart() {
        ctx.beginPath();
        const topCurveHeight = this.radius * 0.3;
        ctx.moveTo(this.x, this.y + topCurveHeight);
        ctx.bezierCurveTo(
            this.x, this.y,
            this.x - this.radius, this.y,
            this.x - this.radius, this.y + topCurveHeight
        );
        ctx.bezierCurveTo(
            this.x - this.radius, this.y + this.radius,
            this.x, this.y + this.radius * 1.5,
            this.x, this.y + this.radius * 2
        );
        ctx.bezierCurveTo(
            this.x, this.y + this.radius * 1.5,
            this.x + this.radius, this.y + this.radius,
            this.x + this.radius, this.y + topCurveHeight
        );
        ctx.bezierCurveTo(
            this.x + this.radius, this.y,
            this.x, this.y,
            this.x, this.y + topCurveHeight
        );
        ctx.closePath();
        ctx.fill();
    }
}

// Create Firework Function
function createFirework() {
    if (document.hidden) return; // Stop creating fireworks if the page is not active

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
    particleSizeInput.value = particleSize; // Set slider to current value
    particleSizeInput.addEventListener('input', (e) => {
        particleSize = parseFloat(e.target.value);
        localStorage.setItem('particleSize', particleSize); // Save size to localStorage
    });
}

// Animation Loop
let animationFrameId;
let isPageActive = true;

function animate() {
    if (!isPageActive) return; // Pause animation if page is not active

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
let fireworkInterval = setInterval(createFirework, 1000);

// Create fireworks on click
canvas.addEventListener('click', (e) => {
    if (document.hidden) return; // Stop creating fireworks if the page is not active

    const rect = canvas.getBoundingClientRect(); // Get canvas position
    const scaleX = canvas.width / rect.width;   // Scale for full-screen
    const scaleY = canvas.height / rect.height; // Scale for full-screen
    const x = (e.clientX - rect.left) * scaleX; // Adjust mouse X position
    const y = canvas.height;                   // Start from the bottom
    const targetY = (e.clientY - rect.top) * scaleY; // Adjust target Y position
    const color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    fireworks.push(new Firework(x, y, targetY, color));
});

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

// Full-Screen Toggle Function
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        // Enter full-screen mode
        document.documentElement.requestFullscreen().catch(err => {
            showAlert(`Error attempting to enable full-screen mode: ${err.message}`);
        });
        fullscreenToggle.classList.remove('fullscreen');
        fullscreenToggle.classList.add('smallscreen');
    } else {
        // Exit full-screen mode
        document.exitFullscreen();
        fullscreenToggle.classList.remove('smallscreen');
        fullscreenToggle.classList.add('fullscreen');
    }
}

// Handle Full-Screen Change
document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        // Adjust canvas size for full-screen
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    } else {
        // Adjust canvas size for normal view
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

// Disable right-click
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Create fireworks on touch (for mobile)
canvas.addEventListener('touchstart', (e) => {
    if (document.hidden) return; // Stop creating fireworks if the page is not active

    e.preventDefault();
    const rect = canvas.getBoundingClientRect(); // Get canvas position
    const scaleX = canvas.width / rect.width;   // Scale for full-screen
    const scaleY = canvas.height / rect.height; // Scale for full-screen
    const touch = e.touches[0];
    const x = (touch.clientX - rect.left) * scaleX; // Adjust touch X position
    const y = canvas.height;                       // Start from the bottom
    const targetY = (touch.clientY - rect.top) * scaleY; // Adjust target Y position
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

// Handle Page Visibility (Pause everything when page is inactive)
document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        isPageActive = false; // Pause animation
        cancelAnimationFrame(animationFrameId); // Stop the animation loop
        clearInterval(fireworkInterval); // Stop creating fireworks
        backgroundMusicTracks.forEach(track => track.audio.pause()); // Pause background music
        fireworkSounds.forEach(sound => sound.pause()); // Pause firework sounds
        document.body.style.pointerEvents = "none"; // Disable interactions
    } else {
        isPageActive = true; // Resume animation
        animate(); // Restart the animation loop
        fireworkInterval = setInterval(createFirework, 1000); // Resume creating fireworks
        if (currentTrackIndex < backgroundMusicTracks.length) {
            backgroundMusicTracks[currentTrackIndex].audio.play(); // Resume background music
        }
        document.body.style.pointerEvents = "auto"; // Enable interactions
    }
});

// Stop everything on page unload
window.addEventListener("beforeunload", function () {
    isPageActive = false; // Pause animation
    cancelAnimationFrame(animationFrameId); // Stop the animation loop
    clearInterval(fireworkInterval); // Stop creating fireworks
    backgroundMusicTracks.forEach(track => track.audio.pause()); // Pause background music
    fireworkSounds.forEach(sound => sound.pause()); // Pause firework sounds
    document.body.style.pointerEvents = "none"; // Disable interactions
});

// Start Animation
animate();