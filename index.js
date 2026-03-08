const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const container = document.querySelector('.container');

// No phone number needed

function moveNoButton() {
    const card = document.querySelector('.card');
    
    // Switch to absolute positioning on FIRST interaction
    if (!noBtn.classList.contains('absolute')) {
        // Append to card to ensure absolute positioning is relative to the card container
        card.appendChild(noBtn);
        noBtn.classList.add('absolute');
    }

    // Now calculate position strictly within the CARD area
    const padding = 20;
    const maxX = card.clientWidth - noBtn.offsetWidth - (padding * 2);
    const maxY = card.clientHeight - noBtn.offsetHeight - (padding * 2);

    const randomX = Math.random() * maxX + padding;
    const randomY = Math.random() * maxY + padding;

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

// Aggressive evasion: triggers even when getting close
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Click fallback in case they manage to click it
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Click listener for Yes button
yesBtn.addEventListener('click', () => {
    // 1. Transform button into a message
    yesBtn.innerHTML = "finnaly she accept my request heyyyyy....!";
    yesBtn.classList.add('message-mode');

    // 2. Smoothly hide the No button
    noBtn.style.opacity = '0';
    setTimeout(() => {
        noBtn.style.display = 'none';
    }, 300);

    // 3. CELEBRATION EFFECTS!
    // A. Rocket/Confetti Burst
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    // B. Screen Crack Effect
    const crack = document.getElementById('crack-overlay');
    crack.classList.add('active');
    
    // Optional: add a haptic feel (if browser supports it)
    if (window.navigator.vibrate) {
        window.navigator.vibrate([100, 50, 200]);
    }
});

// Initial random placement for the "No" button if it's too easy
// noBtn.style.left = '60%'; 
