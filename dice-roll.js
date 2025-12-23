const player1 = {
	scoreDisplay: document.getElementById('score--0'),
	currentDisplay: document.getElementById('current--0'),
	element: document.querySelector('.player--1'),
	currentScore: 0,
	mainScore: 0,
	isActive: true,
};

const player2 = {
	scoreDisplay: document.getElementById('score--1'),
	currentDisplay: document.getElementById('current--1'),
	element: document.querySelector('.player--2'),
	currentScore: 0,
	mainScore: 0,
	isActive: false,
};

const diceImage = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

const modalTitle = document.querySelector('.modalTitle');
const modalDis = document.querySelector('.modalDis');
const btnAgainModal = document.querySelector('.modalAgain');
const btnCloseModal = document.querySelector('.close');

const rollDice = () => {
	return Math.floor(Math.random() * 6) + 1;
};
