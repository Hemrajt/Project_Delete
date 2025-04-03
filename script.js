// Balloon animation function
function randomizeBalloons() {
    const balloons = document.querySelectorAll('.balloon');
    balloons.forEach((balloon) => {
        const randomLeft = Math.random() * 80 + 10;
        const randomDelay = Math.random() * 6;
        balloon.style.left = `${randomLeft}%`;
        balloon.style.bottom = `-10vh`;
        balloon.style.animationDelay = `${randomDelay}s`;
        balloon.style.opacity = '1';
    });
}

// Fireworks animation controller
let fireworksController = null;

// Fireworks animation
function setupFireworks() {
    if (fireworksController) {
        fireworksController.stop();
    }

    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const colors = ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ff69b4', '#ffa500'];
    
    function createFirework(x, y) {
        const particleCount = 100;
        const power = 4;
        
        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * power + 2;
            
            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 1,
                size: Math.random() * 3 + 1,
                decay: Math.random() * 0.005 + 0.005
            });
        }
    }
    
    let animationId;
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.03;
            p.alpha -= p.decay;
            
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            
            if (p.alpha <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }
        
        if (Math.random() < 0.04) {
            createFirework(
                Math.random() * canvas.width,
                Math.random() * canvas.height / 2
            );
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFirework(
                Math.random() * canvas.width,
                Math.random() * canvas.height / 2
            );
        }, i * 800);
    }

    romanticSong.currentTime = 0;
    romanticSong.play().catch(e => console.log("Autoplay prevented:", e));
    
    return {
        stop: function() {
            cancelAnimationFrame(animationId);
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };
}

// Popup Handling
function setupPopup() {
    const yesPopupOverlay = document.getElementById('yesPopupOverlay');
    const noPopupOverlay = document.getElementById('noPopupOverlay');
    const yesPopupCloseBtn = document.getElementById('yesPopupCloseBtn');
    const noPopupCloseBtn = document.getElementById('noPopupCloseBtn');

    // Handle Yes button click
    yesButton.addEventListener('click', () => {
        yesPopupOverlay.classList.add('active');
    });

    // Handle No button click
    noButton.addEventListener('click', () => {
        noPopupOverlay.classList.add('active');
    });

    // Common function to reset to first page
    function resetToFirstPage() {
        // Stop the romantic song
        romanticSong.pause();
        romanticSong.currentTime = 0;
        
        // Stop the fireworks
        if (fireworksController) {
            fireworksController.stop();
            fireworksController = null;
        }
        
        // Hide third page and show first page with transition
        thirdPage.style.opacity = "0";
        setTimeout(() => {
            thirdPage.classList.add("hidden");
            firstPage.classList.remove("hidden");
            firstPage.style.opacity = "1";
            
            // Clear the password field but keep username
            passwordInput.value = "";
        }, 500);
    }

    // Close handler for Yes popup
    yesPopupCloseBtn.addEventListener('click', () => {
        yesPopupOverlay.classList.remove('active');
        resetToFirstPage();
    });

    // Close handler for No popup
    noPopupCloseBtn.addEventListener('click', () => {
        noPopupOverlay.classList.remove('active');
        resetToFirstPage();
    });
}

// Click Here Button
function setupClickHereButton() {
    const greetingCard = document.querySelector('.greeting-card');
    const clickHereBtn = document.createElement('button');
    clickHereBtn.textContent = 'Click Here 💌';
    clickHereBtn.id = 'clickHereBtn';
    clickHereBtn.className = 'click-here-btn';
    greetingCard.appendChild(clickHereBtn);

    clickHereBtn.style.display = 'block';
    clickHereBtn.style.margin = '10px auto';
    clickHereBtn.style.padding = '12px 25px';
    clickHereBtn.style.backgroundColor = '#ff6f61';
    clickHereBtn.style.color = 'white';
    clickHereBtn.style.border = 'none';
    clickHereBtn.style.borderRadius = '50px';
    clickHereBtn.style.cursor = 'pointer';
    clickHereBtn.style.fontFamily = "'Lobster', cursive";
    clickHereBtn.style.transition = 'all 0.3s ease';
    clickHereBtn.style.fontSize = '1.2rem';

    clickHereBtn.addEventListener('mouseenter', () => {
        clickHereBtn.style.transform = 'scale(1.1)';
    });

    clickHereBtn.addEventListener('mouseleave', () => {
        clickHereBtn.style.transform = 'scale(1)';
    });

    clickHereBtn.addEventListener('click', () => {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;

        secondPage.style.opacity = "0";
        setTimeout(() => {
            secondPage.classList.add("hidden");
            thirdPage.classList.remove("hidden");
            thirdPage.style.opacity = "1";
            fireworksController = setupFireworks();
        }, 1000);
    });
}

// Music Handler
function handleMusicPlay() {
    const playPromise = backgroundMusic.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            document.addEventListener('click', musicFallback, { once: true });
        });
    }
}

function musicFallback() {
    backgroundMusic.play().catch(error => {
        console.log("Audio playback failed:", error);
    });
}

// Login Validation
function validateLogin() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const isValid = username === "Aishwarya" && password === "Aishu@999";
    
    if (!isValid) {
        errorMessage.textContent = "Incorrect username or password";
        usernameInput.style.borderColor = "#ff3333";
        passwordInput.style.borderColor = "#ff3333";
        setTimeout(() => {
            errorMessage.textContent = "";
            usernameInput.style.borderColor = "rgba(255, 255, 255, 0.3)";
            passwordInput.style.borderColor = "rgba(255, 255, 255, 0.3)";
        }, 2000);
    }
    return isValid;
}

// Login Handler
function handleLogin() {
    if (validateLogin()) {
        errorMessage.textContent = "";
        
        romanticSong.pause();
        romanticSong.currentTime = 0;
        
        firstPage.style.opacity = "0";
        setTimeout(() => {
            firstPage.classList.add("hidden");
            secondPage.classList.remove("hidden");
            secondPage.style.opacity = "1";
            handleMusicPlay();
            randomizeBalloons();
        }, 1000);
    }
}

// DOM Elements
const loginButton = document.getElementById("loginButton");
const firstPage = document.getElementById("firstPage");
const secondPage = document.getElementById("secondPage");
const thirdPage = document.getElementById("thirdPage");
const backgroundMusic = document.getElementById("backgroundMusic");
const romanticSong = document.getElementById("romanticSong");
romanticSong.loop = false;
const errorMessage = document.getElementById("errorMessage");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

// Initialize the page
function init() {
    setupClickHereButton();
    setupPopup();
    
    loginButton.addEventListener("click", handleLogin);
    passwordInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleLogin();
    });

    setInterval(randomizeBalloons, 6000);

    window.addEventListener('load', () => {
        backgroundMusic.load();
        romanticSong.load();
    });

    window.addEventListener('resize', () => {
        const canvas = document.getElementById('fireworksCanvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });
}

// Start the application
init();