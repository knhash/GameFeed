const init = function() {
    cssScrollSnapPolyfill();

    const gameFeed = document.getElementById("gameFeed");
    const urls = [
        'https://html-classic.itch.zone/html/1510430/index.html?v=1574335379',
        'https://html-classic.itch.zone/html/4102318/novena/index.html',
        'https://html-classic.itch.zone/html/2595155/ENDLESSSCROLL_itch_final/index.html',
        'https://html-classic.itch.zone/html/3194905/okay%20for%20realsies%20this%20time/index.html',
        'https://html-classic.itch.zone/html/3676138/index.html',
        // Add more URLs here
    ];

    // Shuffle the games
    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

    const randomColor = () => {
        const letters = '0123456789ABCDEF';
        return `#${Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * 16)]).join('')}`;
    };

    let shuffledUrls = shuffleArray([...urls]);
    let currentIndex = 0;
    let loading = false;

    const loadGame = () => {
        if (loading || currentIndex >= shuffledUrls.length) return;
        loading = true;

        // Remove existing game
        while (gameFeed.firstChild) {
            gameFeed.removeChild(gameFeed.firstChild);
        }

        const gameCard = document.createElement("div");
        gameCard.className = "game-card";
        gameCard.style.backgroundColor = randomColor();
        gameCard.innerHTML = `
            <iframe src="${shuffledUrls[currentIndex]}" title="Game ${currentIndex + 1}"></iframe>
        `;
        gameFeed.appendChild(gameCard);

        currentIndex = (currentIndex + 1) % shuffledUrls.length;
        loading = false;
    };

    const handleKeydown = (event) => {
        if (event.key === 'n' || event.key === 'N') {
            loadGame();
        }
    };

    window.addEventListener('keydown', handleKeydown);
    loadGame(); // Initial load
};

document.addEventListener("DOMContentLoaded", init);
