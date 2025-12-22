const againBtn = document.querySelector('.again');
const checkBtn = document.querySelector('.check');
const inputNum = document.querySelector('.guess');
const message = document.querySelector('.message');
const scoreMes = document.querySelector('.score');
const title = document.querySelector('.title');
const number = document.querySelector('.number');
const highScore = document.querySelector('.highscore');

const modal = document.querySelector('.modal');
const modalBox = document.querySelector('.modal-box');
const modalTitle = document.querySelector('.modalTitle');
const modalDes = document.querySelector('.modalDescription');
const closeBtn = document.querySelector('.close');
const modalAgain = document.querySelector('.modalAgain');

let guessNum;
let score = 15;
let gameOver = false;
let maxNumber = Number(localStorage.getItem('highScore')) || 0;

const getRandomNumber = () => {
	guessNum = Math.floor(Math.random() * 20) + 1;
};

const openModal = () => modal.classList.remove('hidden');
const closeModal = () => modal.classList.add('hidden');

const endGame = () => {
	gameOver = true;
	checkBtn.disabled = true;
	checkBtn.style.cursor = 'not-allowed';
};

const checkNumber = () => {
	if (gameOver) return;

	const inputNumber = Number(inputNum.value);
	if (!inputNumber) {
		message.textContent = '⛔ Enter a number!';
		return;
	}

	if (inputNumber === guessNum) {
		message.textContent = '🎉 You Won!!';
		number.textContent = guessNum;
		number.style.width = '30rem';
		document.body.style.color = '#51cf66';

		if (score > maxNumber) {
			maxNumber = score;
			localStorage.setItem('highScore', score);
			highScore.textContent = maxNumber;
		}

		modalTitle.textContent = '🎉 You Won!!';
		modalDes.textContent = '😏 Dare to Play Again?';
		modalBox.style.backgroundColor = '#60b347';
		modalBox.style.color = '#fff';
		openModal();
		endGame();
		return;
	}

	score--;
	scoreMes.textContent = score;

	if (score <= 0) {
		message.textContent = '🤯 Better Luck Next Time!';
		title.textContent = 'You Lost!!';
		message.style.color = '#ff4757';
		title.style.color = '#ff4757';

		modalTitle.textContent = '💔 You Lost';
		modalDes.textContent = '🤯 Better Luck Next Time!';
		modalBox.style.backgroundColor = '#ff6b6b';

		openModal();
		endGame();
		return;
	}

	const diff = Math.abs(guessNum - inputNumber);
	if (diff <= 5) {
		message.textContent = '🔥 Warm, try again!';
		message.style.color = '#ff6b6b';
	} else if (diff <= 10) {
		message.textContent = '❄️ Cold, try again!';
		message.style.color = '#4dabf7';
	} else {
		message.textContent = '🥶 Freezing, try again!';
		message.style.color = '#60d9ff';
	}
};

const reset = () => {
	getRandomNumber();
	score = 15;
	gameOver = false;

	scoreMes.textContent = score;
	message.textContent = 'Start guessing...';
	message.style.color = '';
	title.textContent = 'Guess My Number!';
	title.style.color = '';
	inputNum.value = '';
	number.textContent = '?';
	number.style.width = '';
	document.body.style.color = '';

	checkBtn.disabled = false;
	checkBtn.style.cursor = 'pointer';

	closeModal();
};

againBtn.addEventListener('click', reset);
modalAgain.addEventListener('click', reset);
closeBtn.addEventListener('click', closeModal);

checkBtn.addEventListener('click', checkNumber);

modal.addEventListener('click', (e) => {
	if (!e.target.closest('.modal-box')) closeModal();
});

document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
	if (e.key === 'Enter') checkNumber();
});

document.addEventListener('DOMContentLoaded', () => {
	getRandomNumber();
	highScore.textContent = maxNumber;
});
