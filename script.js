document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const proposalView = document.getElementById('proposal-view');
    const successView = document.getElementById('success-view');

    let noClickCount = 0;
    const noPhrases = [
        "No",
        "Are you sure?",
        "Really sure?",
        "Think again!",
        "Last chance!",
        "Surely not?",
        "You might regret this!",
        "Give it another thought!",
        "Are you absolutely sure?",
        "This could be a mistake!",
        "Have a heart! 🥺",
        "Don't be so cold!",
        "Change of heart?",
        "Wouldn't you reconsider?",
        "Is that your final answer?",
        "You're breaking my heart ;(",
        "Wait... think about it!",
        "Okay, fine... last chance!",
        "Just kidding, you can't say no! 😉"
    ];

    // "No" Button Interaction Logic (Persistent Proposal)
    const handleNoInteraction = () => {
        noClickCount++;

        // Change "No" button text
        if (noClickCount < noPhrases.length) {
            noBtn.innerText = noPhrases[noClickCount];
        } else {
            // Eventually turn it into a Yes button
            noBtn.innerText = "YES";
            noBtn.classList.remove('btn-no');
            noBtn.classList.add('btn-yes');
            noBtn.removeEventListener('click', handleNoInteraction);
            noBtn.addEventListener('click', handleYesInteraction);
        }

        // Scale up the "Yes" button
        const currentScale = 1 + (noClickCount * 0.2);
        yesBtn.style.transform = `scale(${currentScale})`;

        // Move the "No" button slightly so it doesn't get covered
        noBtn.style.marginLeft = `${noClickCount * 10}px`;
    };

    noBtn.addEventListener('click', handleNoInteraction);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleNoInteraction();
    });

    // "Yes" Button Logic
    const handleYesInteraction = () => {
        proposalView.classList.add('hidden');
        successView.classList.remove('hidden');

        setTimeout(() => {
            proposalView.style.display = 'none';
        }, 500);

        createRoses();
        startConfetti();
    };

    yesBtn.addEventListener('click', handleYesInteraction);

    // Function to create many roses
    function createRoses() {
        const roseIcons = ['🌹', '🌷', '🌸', '🌺', '💐'];
        for (let i = 0; i < 150; i++) {
            setTimeout(() => {
                const rose = document.createElement('div');
                rose.className = 'rose';
                rose.innerText = roseIcons[Math.floor(Math.random() * roseIcons.length)];

                rose.style.position = 'absolute';
                rose.style.left = Math.random() * 95 + '%';
                rose.style.top = Math.random() * 95 + '%';
                rose.style.zIndex = Math.floor(Math.random() * 10).toString();

                successView.appendChild(rose);
            }, i * 15);
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
        for (let i = 0; i < 150; i++) {
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
