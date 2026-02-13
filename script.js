document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const proposalView = document.getElementById('proposal-view');
    const successView = document.getElementById('success-view');
    const roseContainer = document.getElementById('rose-container');

    // "No" Button Dodging Logic
    const moveNoButton = () => {
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
        noBtn.style.zIndex = '9999';
    };

    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('click', moveNoButton); // Extra precaution

    // "Yes" Button Logic
    yesBtn.addEventListener('click', () => {
        proposalView.classList.add('hidden');
        successView.classList.remove('hidden');
        
        // Let's hide the proposal view completely after transition
        setTimeout(() => {
            proposalView.style.display = 'none';
        }, 500);

        createRoses();
        startConfetti();
    });

    // Function to create many roses
    function createRoses() {
        const roseIcons = ['🌹', '🌷', '🌸', '🌺', '💐'];
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const rose = document.createElement('div');
                rose.className = 'rose';
                rose.innerText = roseIcons[Math.floor(Math.random() * roseIcons.length)];
                roseContainer.appendChild(rose);
            }, i * 50);
        }
    }

    // Function to create background hearts
    function createBackgroundHeart() {
        const heart = document.createElement('div');
        heart.className = 'bg-heart';
        heart.innerText = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    setInterval(createBackgroundHeart, 300);

    // Simple confetti effect
    function startConfetti() {
        const colors = ['#ff4d6d', '#ffb3c1', '#c9184a', '#ffb703', '#fff'];
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.zIndex = '1000';
            confetti.style.borderRadius = '50%';
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
            
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }
    }

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fall {
            to { transform: translateY(100vh) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
});
