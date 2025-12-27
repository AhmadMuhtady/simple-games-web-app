const player0 = {
	name: 'Player 1',
	scoreDisplay: document.getElementById('score--0'),
	currentDisplay: document.getElementById('current--0'),
	element: document.querySelector('.player--1'),
	currentScore: 0,
	mainScore: 0,
};

const player1 = {
	name: 'Player 2 ',
	scoreDisplay: document.getElementById('score--1'),
	currentDisplay: document.getElementById('current--1'),
	element: document.querySelector('.player--2'),
	currentScore: 0,
	mainScore: 0,
};

const diceImage = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

const modal = document.querySelector('.modal');
const modalTitle = document.querySelector('.modalTitle');
const btnAgainModal = document.querySelector('.modalAgain');
const btnCloseModal = document.querySelector('.close');

let gameFinished = false;
let activePlayer = player0;

const closeModal = () => {
	modal.classList.add('hidden');
};

const rollDice = () => {
	return Math.floor(Math.random() * 6) + 1;
};

const changeImage = (number) => {
	diceImage.src = `./images/dice-${number}.png`;
};

const getActivePlayer = () => activePlayer;

const switchPlayers = () => {
	activePlayer.element.classList.remove('player--active');
	activePlayer = activePlayer === player0 ? player1 : player0; // Switch
	activePlayer.element.classList.add('player--active');
};

const softReset = () => {
	const activePlayer = getActivePlayer();
	activePlayer.currentScore = 0;
	activePlayer.currentDisplay.textContent = 0;
};

const addingCurrent = (diceNumber) => {
	const activePlayer = getActivePlayer();
	activePlayer.currentScore += diceNumber;
	activePlayer.currentDisplay.textContent = activePlayer.currentScore;
};

const switchPlayerOnLoss = () => {
	softReset();
	switchPlayers();
};

const handleRollDice = () => {
	if (gameFinished) return;
	const diceNumber = rollDice();

	changeImage(diceNumber);

	if (diceNumber === 1) {
		switchPlayerOnLoss();
	} else {
		addingCurrent(diceNumber);
	}
};

const handleHold = () => {
	if (gameFinished) return;
	// Add current to main
	const activePlayer = getActivePlayer();

	activePlayer.mainScore += activePlayer.currentScore;
	activePlayer.scoreDisplay.textContent = activePlayer.mainScore;

	if (activePlayer.mainScore >= 100) {
		// Show winner modal
		gameFinished = true;
		modal.classList.remove('hidden');
		modalTitle.textContent = `🎉 ${activePlayer.name}`;
		btnRoll.setAttribute('disabled', '');
		btnHold.setAttribute('disabled', '');
		activePlayer.element.classList.add('player--winner');
		softReset();
	} else {
		softReset();
		switchPlayers();
	}
};

const resetPlayer = (player) => {
	player.currentScore = 0;
	player.currentDisplay.textContent = 0;
	player.mainScore = 0;
	player.scoreDisplay.textContent = 0;
	player.element.classList.remove('player--winner');
};

const newGame = () => {
	gameFinished = false;
	resetPlayer(player0);
	resetPlayer(player1);

	activePlayer = player0;

	player0.element.classList.add('player--active');
	player1.element.classList.remove('player--active');

	modal.classList.add('hidden');
	diceImage.src = `./images/dice-0.png`;

	btnRoll.removeAttribute('disabled');
	btnHold.removeAttribute('disabled');
};

btnCloseModal.addEventListener('click', closeModal);
btnRoll.addEventListener('click', handleRollDice);
btnHold.addEventListener('click', handleHold);
btnAgainModal.addEventListener('click', newGame);
btnNew.addEventListener('click', newGame);

document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});

modal.addEventListener('click', (e) => {
	if (e.target === modal) {
		closeModal();
	}
});

document.addEventListener('DOMContentLoaded', () => {
	newGame();
	closeModal();
	diceImage.src = `./images/dice-0.png`;
});
