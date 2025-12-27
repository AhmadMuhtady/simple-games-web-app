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
