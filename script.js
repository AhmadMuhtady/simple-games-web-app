const againBtn = document.querySelector('.again');
const checkBtn = document.querySelector('.check');
const inputNum = document.querySelector('.guess');
const message = document.querySelector('.message');
let guessNum = 0;
const scoreMes = document.querySelector('.score');
let score = 15;
const title = document.querySelector('.title');
const number = document.querySelector('.number');
const highScore = document.querySelector('.highscore');
let maxNumber = Number(localStorage.getItem('highScore')) || 0;

const getRandomNumber = () => {
	guessNum = Math.floor(Math.random() * 20 + 1);
	console.log(guessNum);
	return guessNum;
};

const checkNumber = () => {
	const inputNumber = Number(inputNum.value);
	const def = Math.abs(guessNum - inputNumber);

	if (!inputNumber) {
		message.textContent = '⛔ Enter a number!';
		return;
	}

	if (inputNumber === guessNum) {
		message.textContent = `🎉 You Won!!`;
		number.textContent = guessNum;
		checkBtn.setAttribute('disabled', '');
		if (score > maxNumber) {
			localStorage.setItem('highScore', score);
			maxNumber = score;
			highScore.textContent = `${maxNumber}`;
		}
	} else if (def <= 5) {
		message.textContent = `🔥 Warm, try again!`;
		scoreMes.textContent = `${score--}`;
	} else if (def <= 10) {
		message.textContent = `❄️ Cold, try again!`;
		scoreMes.textContent = `${score--}`;
	} else {
		message.textContent = `🥶 its Freezing here, try again!`;
		scoreMes.textContent = `${score--}`;
	}

	if (score === 0) {
		title.textContent = 'You Lost';
		checkBtn.setAttribute('disabled', '');
		checkBtn.style.cursor = 'not-allowed';
	}
};

const reset = () => {
	getRandomNumber();
	scoreMes.textContent = `${(score = 15)}`;
	message.textContent = 'Start guessing...';
	inputNum.value = '';
	title.textContent = 'Guess My Number!';
	number.textContent = '?';
	checkBtn.removeAttribute('disabled');
	checkBtn.style.cursor = 'pointer';
};

againBtn.addEventListener('click', reset);
checkBtn.addEventListener('click', checkNumber);
document.addEventListener('DOMContentLoaded', () => {
	getRandomNumber();
	highScore.textContent = maxNumber;
});
