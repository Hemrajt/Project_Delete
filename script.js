// DOM Elements
const loginButton = document.getElementById("loginButton");
const firstPage = document.getElementById("firstPage");
const secondPage = document.getElementById("secondPage");
const thirdPage = document.getElementById("thirdPage");
const questionnairePage = document.getElementById("questionnairePage");
const transitionPage = document.getElementById("transitionPage");
const backgroundMusic = document.getElementById("backgroundMusic");
const romanticSong = document.getElementById("romanticSong");
const errorMessage = document.getElementById("errorMessage");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const revealButton = document.getElementById("revealButton");
const clickHereBtn = document.getElementById("clickHereBtn");

// Quiz Elements
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const nextButton = document.getElementById("nextButton");
const progressBar = document.getElementById("progressBar");

// Quiz Variables
let currentQuestion = 0;
let userResponses = [];
let emojisActive = false; // Tracks if emojis are running
const questions = [
    {
        question: "What's my favorite color?",
        options: ["Blue", "Red", "Green", "Black"],
        correct: 0
    },
    {
        question: "Where did we first meet?",
        options: ["College", "Cafe", "Park", "Through friends"],
        correct: 1
    },
    {
        question: "What's my favorite food?",
        options: ["Pizza", "Pasta", "Burger", "Sushi"],
        correct: 3
    },
    {
        question: "What's my dream vacation?",
        options: ["Paris", "Maldives", "Japan", "Switzerland"],
        correct: 2
    },
    {
        question: "What quality do you love most about me?",
        options: ["Kindness", "Intelligence", "Humor", "Everything"],
        correct: 3
    }
];

// Animation Variables
const romanticEmojis = ['💖', '😇', '🌞', '💌', '💕', '🐥', '🍕', '🤭', '💙', '🥳', '💛', '💜', '🤗', '🍒', '🌈', '🥰', '🌸', '🌹', '🌺', '🌷', '💐', '🏵️', '🎀', '🎁', '🎆', '✨', '🎇', '🎉', '🎊', '💍', '💎','✈️','🥞'];
let emojiInterval = null;
let fireworksController = null;
let confettiCreated = false;

// Initialize audio
romanticSong.loop = false;

// Balloon animation
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


function createFlyingEmojis() {
    if (emojiInterval) clearInterval(emojiInterval);
    
    // Create initial burst of emojis
    for (let i = 0; i < 15; i++) {
        createSingleEmoji();
    }
    
    // Then continue with interval
    emojiInterval = setInterval(createSingleEmoji, 600);
}

function createSingleEmoji() {
    const emoji = document.createElement('div');
    emoji.className = 'flying-emoji';
    emoji.textContent = romanticEmojis[Math.floor(Math.random() * romanticEmojis.length)];
    
    // Random path (1-8)
    const path = Math.floor(Math.random() * 8) + 1;
    emoji.classList.add(`path${path}`);
    
    // Position randomly across the entire screen
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    
    // Set initial position based on path
    switch(path) {
        case 1: // left
            emoji.style.left = '0';
            emoji.style.top = `${startY}vh`;
            break;
        case 2: // right
            emoji.style.right = '0';
            emoji.style.top = `${startY}vh`;
            break;
        case 3: // top
            emoji.style.left = `${startX}vw`;
            emoji.style.top = '0';
            break;
        case 4: // bottom
            emoji.style.left = `${startX}vw`;
            emoji.style.bottom = '0';
            break;
        case 5: // top-left diagonal
            emoji.style.left = `${startX * 0.5}vw`; // More concentrated on left
            emoji.style.top = `${Math.min(startY, 30)}vh`; // Upper portion
            break;
        case 6: // top-right diagonal
            emoji.style.right = `${startX * 0.5}vw`; // More concentrated on right
            emoji.style.top = `${Math.min(startY, 30)}vh`; // Upper portion
            break;
        case 7: // bottom-left diagonal
            emoji.style.left = `${startX * 0.5}vw`; // More concentrated on left
            emoji.style.bottom = `${Math.min(startY, 30)}vh`; // Lower portion
            break;
        case 8: // bottom-right diagonal
            emoji.style.right = `${startX * 0.5}vw`; // More concentrated on right
            emoji.style.bottom = `${Math.min(startY, 30)}vh`; // Lower portion
            break;
    }
    
    // Slower animation duration
    const duration = 6 + Math.random() * 5; // 6-10 seconds
    emoji.style.animationDuration = `${duration}s`;
    
    // Random size
    const size = 0.8 + Math.random() * 1.9;
    emoji.style.fontSize = `${size}rem`;
    
    // Random rotation direction
    const rotationDirection = Math.random() > 0.5 ? 1 : -1;
    emoji.style.setProperty('--rotation-direction', rotationDirection);
    
    // Add to document body
    document.body.appendChild(emoji);
    
    // Remove emoji after animation
    setTimeout(() => {
        if (emoji.parentNode) {
            emoji.parentNode.removeChild(emoji);
        }
    }, duration * 1000);
}

// Confetti animation
function createConfetti() {
    if (confettiCreated) return;
    confettiCreated = true;
    
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const container = document.querySelector('.confetti-container');
    container.innerHTML = '';
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 5 + 's';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        container.appendChild(confetti);
    }
}

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

// EmailJS Integration
function sendEmailResponse(answer) {
    const templateID = answer === "YES" 
        ? "template_27cmk4s"
        : "template_7wjbket";

    const templateParams = {
        answer: answer,
        date: new Date().toLocaleString(),
        message: answer === "YES" 
            ? "She said YES! 🎉 Time to celebrate!" 
            : "She said NO... 😢 Keep trying!"
    };

    emailjs.send(
        "service_xxjfb4o",
        templateID,
        templateParams
    ).then(
        () => console.log("Email sent successfully!"),
        (error) => console.error("Failed to send email:", error)
    );
}

function sendQuizResponses() {
    let responseText = "Quiz Responses:\n";
    questions.forEach((q, i) => {
        responseText += `${i+1}. ${q.question}\n`;
        responseText += `Answer: ${q.options[userResponses[i]]}\n\n`;
    });
    
    emailjs.send("service_xxjfb4o", "template_27cmk4s", {
        responses: responseText,
        date: new Date().toLocaleString()
    });
}

// Quiz Functions
function loadQuestion() {
    const question = questions[currentQuestion];
    questionText.textContent = `${currentQuestion + 1}. ${question.question}`;
    
    optionsContainer.innerHTML = "";
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.className = "option";
        optionElement.innerHTML = `
            <input type="radio" name="quizOption" id="option-${index}" value="${index}">
            <label for="option-${index}">${option}</label>
        `;
        optionElement.addEventListener("click", (e) => {
            if (e.target.tagName !== 'INPUT') {
                optionElement.querySelector('input').checked = true;
                document.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                optionElement.classList.add('selected');
                userResponses[currentQuestion] = index;
            }
        });
        optionsContainer.appendChild(optionElement);
    });
    
    progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    nextButton.textContent = currentQuestion === questions.length - 1 ? "Submit" : "Next";
}

function handleNextQuestion() {
    if (typeof userResponses[currentQuestion] === "undefined") {
        alert("Please select an option!");
        return;
    }
    
    // Clean up emojis before proceeding
    if (emojiInterval) {
        clearInterval(emojiInterval);
        document.querySelectorAll('.flying-emoji').forEach(emoji => {
            if (emoji.parentNode) {
                emoji.parentNode.removeChild(emoji);
            }
        });
    }
    
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        loadQuestion();
        createFlyingEmojis();
    } else {
        questionnairePage.style.opacity = "0";
        setTimeout(() => {
            questionnairePage.classList.add("hidden");
            transitionPage.classList.remove("hidden");
            transitionPage.style.opacity = "1";
            createConfetti();
            localStorage.setItem("proposalResponses", JSON.stringify({
                responses: userResponses,
                timestamp: new Date()
            }));
            sendQuizResponses();
        }, 500);
    }
}

// Popup Handling
function setupPopup() {
    const yesPopupOverlay = document.getElementById('yesPopupOverlay');
    const noPopupOverlay = document.getElementById('noPopupOverlay');
    const yesPopupCloseBtn = document.getElementById('yesPopupCloseBtn');
    const noPopupCloseBtn = document.getElementById('noPopupCloseBtn');

    yesButton.addEventListener('click', () => {
        yesPopupOverlay.classList.add('active');
        sendEmailResponse("YES");
    });

    noButton.addEventListener('click', () => {
        noPopupOverlay.classList.add('active');
        sendEmailResponse("NO");
    });

    function resetToFirstPage() {
        romanticSong.pause();
        romanticSong.currentTime = 0;
        
        if (fireworksController) {
            fireworksController.stop();
            fireworksController = null;
        }
        
        if (emojiInterval) {
            clearInterval(emojiInterval);
            document.querySelectorAll('.flying-emoji').forEach(emoji => {
                if (emoji.parentNode) {
                    emoji.parentNode.removeChild(emoji);
                }
            });
        }
        
        thirdPage.style.opacity = "0";
        setTimeout(() => {
            thirdPage.classList.add("hidden");
            firstPage.classList.remove("hidden");
            firstPage.style.opacity = "1";
            passwordInput.value = "";
        }, 500);
    }

    yesPopupCloseBtn.addEventListener('click', () => {
        yesPopupOverlay.classList.remove('active');
        resetToFirstPage();
    });

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
            questionnairePage.classList.remove("hidden");
            questionnairePage.style.opacity = "1";
            loadQuestion();
            createFlyingEmojis();
        }, 1000);
    }
}

// Initialize the page
function init() {
    // Setup all event listeners
    setupClickHereButton();
    setupPopup();
    
    loginButton.addEventListener("click", handleLogin);
    passwordInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleLogin();
    });

    if (nextButton) {
        nextButton.addEventListener("click", handleNextQuestion);
    }

    if (revealButton) {
        revealButton.addEventListener("click", () => {
            transitionPage.style.opacity = "0";
            setTimeout(() => {
                transitionPage.classList.add("hidden");
                secondPage.classList.remove("hidden");
                secondPage.style.opacity = "1";
                handleMusicPlay();
                randomizeBalloons();
            }, 500);
        });
    }

    // Initialize animations
    setInterval(randomizeBalloons, 6000);

    // Preload audio
    window.addEventListener('load', () => {
        backgroundMusic.load();
        romanticSong.load();
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        const canvas = document.getElementById('fireworksCanvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });
}

// Start the application
document.addEventListener('DOMContentLoaded', init);