const gra = function(min, max) {
    return Math.random() * (max - min) + min;
}

const init = function() {
    let items = document.querySelectorAll('section');
    for (let i = 0; i < items.length; i++) {
        items[i].style.background = randomColor({ luminosity: 'light' });
    }
    cssScrollSnapPolyfill();

    // Infinite scrolling logic
    const gameFeed = document.getElementById("gameFeed");
    const urls = [
        'https://html-classic.itch.zone/html/1510430/index.html?v=1574335379',
		'https://html-classic.itch.zone/html/4102318/novena/index.html',
		'https://html-classic.itch.zone/html/2595155/ENDLESSSCROLL_itch_final/index.html',
		'https://html-classic.itch.zone/html/3194905/okay%20for%20realsies%20this%20time/index.html',
		'https://html-classic.itch.zone/html/3676138/index.html',

        // Add more URLs here
    ];
    let currentIndex = 0;
    const pageSize = 2; // Number of iframes to load at a time
    let loading = false;

    const loadGames = () => {
        loading = true;
        const endIndex = Math.min(currentIndex + pageSize, urls.length);
        for (let i = currentIndex; i < endIndex; i++) {
            const gameCard = document.createElement("div");
            gameCard.className = "game-card";
            gameCard.innerHTML = `
                <iframe src="${urls[i]}" title="Game ${i + 1}"></iframe>
                <h3>Game ${i + 1}</h3>
            `;
            gameFeed.appendChild(gameCard);
        }
        currentIndex = endIndex;
        loading = false;
    };

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading && currentIndex < urls.length) {
            loadGames();
        }
    };

    window.addEventListener('scroll', handleScroll);
    loadGames(); // Initial load
}

document.addEventListener("DOMContentLoaded", init);
