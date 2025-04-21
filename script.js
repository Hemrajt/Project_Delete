// ==============================================
// DOM Elements
// ==============================================
const loginButton = document.getElementById("loginButton");
const firstPage = document.getElementById("firstPage");
const secondPage = document.getElementById("secondPage");
const thirdPage = document.getElementById("thirdPage");
const questionnairePage = document.getElementById("questionnairePage");
const transitionPage = document.getElementById("transitionPage");
const backgroundMusic = document.getElementById("backgroundMusic");
const romanticSong = document.getElementById("romanticSong");
const loginMusic = document.getElementById("loginMusic");
const errorMessage = document.getElementById("errorMessage");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const takeTimeButton = document.getElementById("takeTimeButton");
const revealButton = document.getElementById("revealButton");
const clickHereBtn = document.getElementById("clickHereBtn");
const musicFallbackBtn = document.getElementById("musicFallbackBtn");

// Quiz Elements
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const nextButton = document.getElementById("nextButton");
const progressBar = document.getElementById("progressBar");

// Popup Elements
const yesPopupOverlay = document.getElementById("yesPopupOverlay");
const noPopupOverlay = document.getElementById("noPopupOverlay");
const takeTimePopupOverlay = document.getElementById("takeTimePopupOverlay");
const yesPopupCloseBtn = document.getElementById("yesPopupCloseBtn");
const noPopupCloseBtn = document.getElementById("noPopupCloseBtn");
const takeTimePopupCloseBtn = document.getElementById("takeTimePopupCloseBtn");

// ==============================================
// Quiz Variables
// ==============================================
let currentQuestion = 0;
let userResponses = [];
let emojisActive = false;
const questions = [
    {
        question: "What is your favorite fruit? 🍉",
        options: ["Mango", "Orange/आंत्री", "Blueberry", "Pineapple"],
        correct: 1
    },
    {
        question: "Which dessert does Aishwarya love the most? 🍰",
        options: ["Ice Cream", "Chocolate Cake", "Tiramisu", "Kaju Katli"],
        correct: 2
    },
    {
        question: "What is your favorite season? ⛅",
        options: ["Winter", "Summer", "Monsoon", "Spring"],
        correct: 0
    },
    {
        question: "Which is your favorite travel destination? ✈️",
        options: ["Kashmir", "Kedarnath", "Goa", "Kerala"],
        correct: 1
    },
    {
        question: "What quality do you love most about me? 🤭",
        options: ["Kindness", "Intelligence", "Humor", "Everything"],
        correct: 3
    }
];

// ==============================================
// Audio Variables
// ==============================================
let loginMusicPlayCount = 0;
const MAX_LOGIN_PLAYS = 1;
let loginMusicInitialized = false;
let loginMusicTimeout = null;

// ==============================================
// Animation Variables
// ==============================================
const romanticEmojis = ['💖', '😇', '🌞', '💌', '💕', '🐥', '🍕', '🤭', '💙', '🥳', '💛', '💜', '🤗', '🍒', '🌈', '🥰', '🌸', '🌹', '🌺', '🌷', '💐', '🏵️', '🎀', '🎁', '🎆', '✨', '🎇', '🎉', '🎊', '💍', '💎','✈️','🥞'];
let emojiInterval = null;
let fireworksController = null;
let confettiCreated = false;

// Initialize audio
romanticSong.loop = false;
loginMusic.loop = false;

// ==============================================
// Audio Functions
// ==============================================

/**
 * Handles login page music playback
 */
function handleLoginMusic() {
    // Clear any existing timeout
    if (loginMusicTimeout) {
        clearTimeout(loginMusicTimeout);
    }
    
    // Set timeout for 1.5 seconds
    loginMusicTimeout = setTimeout(() => {
        startLoginMusic();
    }, 1500);
}

/**
 * Starts the login music
 */
function startLoginMusic() {
    if (!loginMusicInitialized) {
        loginMusic.addEventListener('error', function() {
            console.error("Login music error:", loginMusic.error);
            showMusicPlayButton();
        });
        
        loginMusic.addEventListener('ended', handleMusicEnd);
        loginMusicInitialized = true;
    }

    // Reset play count
    loginMusicPlayCount = 0;
    
    try {
        loginMusic.currentTime = 0;
        const playPromise = loginMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Login music autoplay prevented:", error);
                showMusicPlayButton();
            });
        }
    } catch (error) {
        console.error("Login music play error:", error);
        showMusicPlayButton();
    }
}

function handleMusicEnd() {
    loginMusicPlayCount++;
    if (loginMusicPlayCount < MAX_LOGIN_PLAYS) {
        loginMusic.currentTime = 0;
        loginMusic.play().catch(e => console.log("Login music replay failed:", e));
    } else {
        loginMusic.pause();
        loginMusic.currentTime = 0;
    }
}

function showMusicPlayButton() {
    if (!musicFallbackBtn) return;
    
    musicFallbackBtn.style.display = 'block';
    musicFallbackBtn.addEventListener('click', function playMusicOnce() {
        startLoginMusic();
        musicFallbackBtn.style.display = 'none';
        musicFallbackBtn.removeEventListener('click', playMusicOnce);
    });
}

function hideMusicPlayButton() {
    if (musicFallbackBtn) {
        musicFallbackBtn.style.display = 'none';
    }
}

// ==============================================
// Animation Functions
// ==============================================

/**
 * Randomizes balloon positions and animations
 */
function randomizeBalloons() {
    const balloons = document.querySelectorAll('.balloon');
    balloons.forEach((balloon) => {
        const randomLeft = Math.random() * 80 + 10;
        const randomDelay = Math.random() * 6;
        const randomDuration = Math.random() * 3 + 4;
        const randomSize = Math.random() * 30 + 70;
        
        balloon.style.left = `${randomLeft}%`;
        balloon.style.bottom = `-15vh`;
        balloon.style.animationDelay = `${randomDelay}s`;
        balloon.style.animationDuration = `${randomDuration}s`;
        balloon.style.width = `${randomSize}px`;
        balloon.style.height = `${randomSize * 1.2}px`;
        balloon.style.opacity = '0.9';
    });
}

/**
 * Creates flying emojis animation
 */
function createFlyingEmojis() {
    if (emojiInterval) clearInterval(emojiInterval);
    
    // Create initial burst of emojis
    for (let i = 0; i < 25; i++) {
        createSingleEmoji();
    }
    
    // Then continue with interval
    emojiInterval = setInterval(() => {
        if (document.querySelectorAll('.flying-emoji').length < 50) {
            createSingleEmoji();
        }
    }, 500);
}

/**
 * Creates a single flying emoji with random properties
 */
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
            emoji.style.left = `-5vw`;
            emoji.style.top = `${startY}vh`;
            break;
        case 2: // right
            emoji.style.right = `-5vw`;
            emoji.style.top = `${startY}vh`;
            break;
        case 3: // top
            emoji.style.left = `${startX}vw`;
            emoji.style.top = `-5vh`;
            break;
        case 4: // bottom
            emoji.style.left = `${startX}vw`;
            emoji.style.bottom = `-5vh`;
            break;
        case 5: // top-left diagonal
            emoji.style.left = `${startX * 0.3}vw`;
            emoji.style.top = `${Math.min(startY, 20)}vh`;
            break;
        case 6: // top-right diagonal
            emoji.style.right = `${startX * 0.3}vw`;
            emoji.style.top = `${Math.min(startY, 20)}vh`;
            break;
        case 7: // bottom-left diagonal
            emoji.style.left = `${startX * 0.3}vw`;
            emoji.style.bottom = `${Math.min(startY, 20)}vh`;
            break;
        case 8: // bottom-right diagonal
            emoji.style.right = `${startX * 0.3}vw`;
            emoji.style.bottom = `${Math.min(startY, 20)}vh`;
            break;
    }
    
    // Random animation properties
    const duration = 8 + Math.random() * 7;
    const size = 0.8 + Math.random() * 2.2;
    const opacity = 0.7 + Math.random() * 0.3;
    const rotationDirection = Math.random() > 0.5 ? 1 : -1;
    
    emoji.style.animationDuration = `${duration}s`;
    emoji.style.fontSize = `${size}rem`;
    emoji.style.opacity = opacity;
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

/**
 * Creates confetti animation
 */
function createConfetti() {
    if (confettiCreated) return;
    confettiCreated = true;
    
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff69b4', '#ffa500'];
    const container = document.querySelector('.confetti-container');
    container.innerHTML = '';
    
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 5 + 's';
        confetti.style.width = Math.random() * 12 + 3 + 'px';
        confetti.style.height = Math.random() * 12 + 3 + 'px';
        confetti.style.animationDuration = (3 + Math.random() * 4) + 's';
        container.appendChild(confetti);
    }
}

/**
 * Sets up fireworks animation
 */
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
    
    function createFirework(x, y, isInitial = false) {
        const particleCount = isInitial ? 150 : 100;
        const power = isInitial ? 6 : 4;
        const sizeMultiplier = isInitial ? 1.5 : 1;
        
        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = (Math.random() * power + 2) * (isInitial ? 1.2 : 1);
            
            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 1,
                size: (Math.random() * 3 + 1) * sizeMultiplier,
                decay: Math.random() * 0.005 + 0.003
            });
        }
    }
    
    let animationId;
    let lastFireworkTime = 0;
    
    function animate(currentTime) {
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
        
        // Create new fireworks randomly but not too frequently
        if ((currentTime - lastFireworkTime > 800 || lastFireworkTime === 0) && 
            (Math.random() < 0.05 || particles.length < 30)) {
            createFirework(
                Math.random() * canvas.width,
                Math.random() * canvas.height / 2
            );
            lastFireworkTime = currentTime;
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    animationId = requestAnimationFrame(animate);
    
    // Create initial fireworks burst
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createFirework(
                Math.random() * canvas.width,
                Math.random() * canvas.height / 2,
                true
            );
        }, i * 300);
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

// ==============================================
// Email Functions
// ==============================================

/**
 * Sends email response
 * @param {string} answer - The response type (YES/NO/TAKE_TIME)
 */
function sendEmailResponse(answer) {
    let templateID;
    let message = "";
    let subject = "";
    
    switch(answer) {
        case "YES":
            templateID = "template_27cmk4s";
            subject = "💖 She Said Yes! 💖";
            message = "Aishwarya said YES to your proposal! 🎉 Time to celebrate this beautiful moment!";
            break;
        case "NO":
            templateID = "template_7wjbket"; // Different template for NO responses
            subject = "😢 She Needs More Time";
            message = "Aishwarya isn't ready yet... 😢 But don't give up! Keep trying to win her heart!";
            break;
        case "TAKE_TIME":
            templateID = "template_27cmk4s";
            subject = "⏳ She's Thinking About It";
            message = "Aishwarya wants more time to consider your proposal... ⏳ She'll give you an answer when she's ready!";
            break;
    }

    const templateParams = {
        answer: answer,
        subject: subject,
        message: message,
        date: new Date().toLocaleString(),
        username: usernameInput.value.trim()
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

/**
 * Sends quiz responses via email
 */
function sendQuizResponses() {
    let responseText = "Quiz Responses from Aishwarya:\n\n";
    let correctCount = 0;
    
    questions.forEach((q, i) => {
        const isCorrect = userResponses[i] === q.correct;
        if (isCorrect) correctCount++;
        
        responseText += `${i+1}. ${q.question}\n`;
        responseText += `Selected: ${q.options[userResponses[i]]} ${isCorrect ? '✅' : '❌'}\n`;
        responseText += `Correct: ${q.options[q.correct]}\n\n`;
    });
    
    const score = Math.round((correctCount / questions.length) * 100);
    const subject = `Quiz Results: ${score}% Correct`;
    const message = `${responseText}\nFinal Score: ${correctCount}/${questions.length} (${score}%)`;
    
    emailjs.send("service_xxjfb4o", "template_27cmk4s", {
        subject: subject,
        responses: message,
        date: new Date().toLocaleString(),
        username: usernameInput.value.trim()
    });
}

// ==============================================
// Quiz Functions
// ==============================================

/**
 * Loads the current question
 */
function loadQuestion() {
    const question = questions[currentQuestion];
    questionText.textContent = `${currentQuestion + 1}. ${question.question}`;
    
    optionsContainer.innerHTML = "";
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.className = "option";
        if (userResponses[currentQuestion] === index) {
            optionElement.classList.add("selected");
        }
        optionElement.innerHTML = `
            <input type="radio" name="quizOption" id="option-${index}" value="${index}" 
                   ${userResponses[currentQuestion] === index ? 'checked' : ''}>
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

/**
 * Handles moving to the next question
 */
function handleNextQuestion() {
    if (typeof userResponses[currentQuestion] === "undefined") {
        alert("Please select an option!");
        return;
    }
    
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

// ==============================================
// Popup Functions
// ==============================================

/**
 * Resets the application to first page
 */
function resetToFirstPage() {
    // Stop all audio
    romanticSong.pause();
    romanticSong.currentTime = 0;
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    
    // Stop login music if playing
    loginMusic.pause();
    loginMusic.currentTime = 0;
    hideMusicPlayButton();
    
    // Clear any pending login music timeout
    if (loginMusicTimeout) {
        clearTimeout(loginMusicTimeout);
        loginMusicTimeout = null;
    }
    
    // Stop fireworks if active
    if (fireworksController) {
        fireworksController.stop();
        fireworksController = null;
    }
    
    // Stop emoji animation
    if (emojiInterval) {
        clearInterval(emojiInterval);
        document.querySelectorAll('.flying-emoji').forEach(emoji => {
            if (emoji.parentNode) {
                emoji.parentNode.removeChild(emoji);
            }
        });
    }
    
    // Reset quiz state
    currentQuestion = 0;
    userResponses = [];
    
    // Reset scroll positions
    const greetingCardContent = document.querySelector('.greeting-card-content');
    if (greetingCardContent) {
        greetingCardContent.scrollTop = 0;
    }
    
    // Clear any selected options
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    document.querySelectorAll('input[name="quizOption"]').forEach(radio => {
        radio.checked = false;
    });
    
    // Transition back to first page
    thirdPage.style.opacity = "0";
    setTimeout(() => {
        thirdPage.classList.add("hidden");
        firstPage.classList.remove("hidden");
        firstPage.style.opacity = "1";
        passwordInput.value = "";
        
        // Start login music when returning to first page
        handleLoginMusic();
    }, 500);
}

/**
 * Sets up all popup functionality
 */
function setupPopup() {
    yesButton.addEventListener('click', () => {
        yesPopupOverlay.classList.add('active');
        sendEmailResponse("YES");
    });

    noButton.addEventListener('click', () => {
        noPopupOverlay.classList.add('active');
        sendEmailResponse("NO");
    });

    takeTimeButton.addEventListener('click', () => {
        takeTimePopupOverlay.classList.add('active');
        sendEmailResponse("TAKE_TIME");
    });

    // Setup close buttons
    yesPopupCloseBtn.addEventListener('click', () => {
        yesPopupOverlay.classList.remove('active');
        resetToFirstPage();
    });

    noPopupCloseBtn.addEventListener('click', () => {
        noPopupOverlay.classList.remove('active');
        resetToFirstPage();
    });

    takeTimePopupCloseBtn.addEventListener('click', () => {
        takeTimePopupOverlay.classList.remove('active');
        resetToFirstPage();
    });
}

// ==============================================
// Page Transition Functions
// ==============================================

/**
 * Sets up the "Click Here" button functionality
 */
function setupClickHereButton() {
    const greetingCard = document.querySelector('.greeting-card');
    if (!clickHereBtn && greetingCard) {
        const newClickHereBtn = document.createElement('button');
        newClickHereBtn.textContent = 'Click Here 💌';
        newClickHereBtn.id = 'clickHereBtn';
        newClickHereBtn.className = 'click-here-btn';
        greetingCard.appendChild(newClickHereBtn);

        newClickHereBtn.addEventListener('click', () => {
            // Reset scroll position before transition
            document.querySelector('.greeting-card-content').scrollTop = 0;
            
            // Stop background music
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;

            // Transition to third page
            secondPage.style.opacity = "0";
            setTimeout(() => {
                secondPage.classList.add("hidden");
                thirdPage.classList.remove("hidden");
                thirdPage.style.opacity = "1";
                fireworksController = setupFireworks();
            }, 1000);
        });
    }
}

/**
 * Handles music playback with fallback for autoplay restrictions
 */
function handleMusicPlay() {
    const playPromise = backgroundMusic.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // If autoplay is blocked, set up a one-time click handler to start music
            document.addEventListener('click', musicFallback, { once: true });
        });
    }
}

/**
 * Fallback for music playback when autoplay is blocked
 */
function musicFallback() {
    backgroundMusic.play().catch(error => {
        console.log("Audio playback failed:", error);
    });
}

// ==============================================
// Login Functions
// ==============================================

/**
 * Validates login credentials
 */
function validateLogin() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const isValid = username === "Aishwarya" && password === "Aishu@15";
    
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

/**
 * Handles login process
 */
function handleLogin() {
    if (validateLogin()) {
        errorMessage.textContent = "";
        
        // Stop login music
        loginMusic.pause();
        loginMusic.currentTime = 0;
        hideMusicPlayButton();
        
        // Clear any pending login music timeout
        if (loginMusicTimeout) {
            clearTimeout(loginMusicTimeout);
            loginMusicTimeout = null;
        }
        
        // Stop any romantic song that might be playing
        romanticSong.pause();
        romanticSong.currentTime = 0;
        
        // Reset quiz state
        currentQuestion = 0;
        userResponses = [];
        
        // Reset scroll position
        const greetingCardContent = document.querySelector('.greeting-card-content');
        if (greetingCardContent) {
            greetingCardContent.scrollTop = 0;
        }
        
        // Transition to questionnaire
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

// ==============================================
// Initialization
// ==============================================

/**
 * Initializes the application
 */
function init() {
    // Setup all interactive elements
    setupClickHereButton();
    setupPopup();
    
    // Login event listeners
    loginButton.addEventListener("click", handleLogin);
    passwordInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleLogin();
    });

    // Quiz navigation
    if (nextButton) {
        nextButton.addEventListener("click", handleNextQuestion);
    }

    // Transition from reveal button
    if (revealButton) {
        revealButton.addEventListener("click", () => {
            // Reset scroll position before showing second page
            document.querySelector('.greeting-card-content').scrollTop = 0;
            
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

    // Initialize balloon animations
    setInterval(randomizeBalloons, 6000);

    // Preload audio
    window.addEventListener('load', () => {
        backgroundMusic.load();
        romanticSong.load();
        loginMusic.load();
        
        // Add canplay event to hide fallback button if music loads
        loginMusic.addEventListener('canplay', () => {
            hideMusicPlayButton();
        });
        
        // Start login music when page first loads
        handleLoginMusic();
        
        // Add click fallback for GitHub Pages
        document.addEventListener('click', function musicFallback() {
            // If music hasn't started yet and we're on first page
            if (loginMusic.paused && !firstPage.classList.contains('hidden')) {
                startLoginMusic();
            }
        }, { once: true });
    });

    // Handle window resize for fireworks canvas
    window.addEventListener('resize', () => {
        const canvas = document.getElementById('fireworksCanvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });
}

// Start the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);