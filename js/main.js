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
  
	const shuffleArray = array => array.sort(() => Math.random() - 0.5);
  
	let shuffledUrls = shuffleArray([...urls]);
	let currentIndex = 0;
	let loading = false;
  
	const loadGame = () => {
	  if (loading || currentIndex >= shuffledUrls.length) return;
	  loading = true;
  
	  gameFeed.innerHTML = '';
  
	  const gameCard = document.createElement("div");
	  gameCard.className = "game-card";
	  gameCard.style.backgroundColor = '#ffffff'; // Set background to white
  
	  const title = document.createElement("div");
	  title.textContent = "Game Feed";
	  title.className = "game-title";
	  gameCard.appendChild(title);
  
	  const iframe = document.createElement("iframe");
	  iframe.src = shuffledUrls[currentIndex];
	  iframe.title = `Game ${currentIndex + 1}`;
	  iframe.onload = () => iframe.focus();
	  iframe.onerror = () => {
		console.error('Failed to load game:', shuffledUrls[currentIndex]);
		gameFeed.innerHTML = '<div class="instructions">Failed to load game. Please try again.</div>';
		loading = false;
	  };
  
	  gameCard.appendChild(iframe);
  
	  const nextButton = document.createElement("button");
	  nextButton.textContent = "New Game";
	  nextButton.className = "next-button";
	  nextButton.setAttribute('aria-label', 'Load next game');
	  nextButton.addEventListener('click', loadGame);
  
	  gameCard.appendChild(nextButton);
  
	  const instructions = document.createElement("div");
	  instructions.textContent = "Use arrow keys to interact with the game";
	  instructions.className = "instructions";
	  gameCard.appendChild(instructions);
  
	  gameFeed.appendChild(gameCard);
  
	  currentIndex = (currentIndex + 1) % shuffledUrls.length;
	  loading = false;
	};
  
	loadGame();
  };
  
  document.addEventListener("DOMContentLoaded", init);
  