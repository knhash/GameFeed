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
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const randomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    let shuffledUrls = shuffleArray([...urls]);
    let currentIndex = 0;
    const pageSize = 2; // Number of iframes to load at a time
    let loading = false;

    const loadGames = () => {
        loading = true;
        const endIndex = currentIndex + pageSize;
        for (let i = currentIndex; i < endIndex; i++) {
            const gameCard = document.createElement("div");
            gameCard.className = "game-card";
            gameCard.style.backgroundColor = randomColor();
            gameCard.innerHTML = `
                <iframe src="${shuffledUrls[i % shuffledUrls.length]}" title="Game ${i + 1}"></iframe>
            `;
            gameFeed.appendChild(gameCard);
        }
        currentIndex = endIndex;
        loading = false;
    };

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
            loadGames();
        }
    };

    window.addEventListener('scroll', handleScroll);
    loadGames(); // Initial load
};

document.addEventListener("DOMContentLoaded", init);
