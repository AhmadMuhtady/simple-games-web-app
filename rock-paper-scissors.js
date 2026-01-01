const player1hand = document.querySelector('.player1-hand');
const player2hand = document.querySelector('.player2-hand');
const buttonsSection = document.querySelector('.hands-buttons');
let playerScore = 0;
let computerScore = 0;
const playerScoreDisplay = document.getElementById('score--1');
const computerScoreDisplay = document.getElementById('score--2');

const btnNew = document.querySelector('.btn--new');

const modal = document.querySelector('.modal');
const modalTitle = document.querySelector('.modalTitle');
const btnAgainModal = document.querySelector('.modalAgain');
const btnCloseModal = document.querySelector('.close');

const hands = ['Rock 🪨', 'Paper 📄', 'Scissors ✂️'];

buttonsSection.innerHTML = hands
	.map((hand) => `<button class="btn hands-button">${hand}</button>`)
	.join('');

const pickHands = () => {
	const random = Math.floor(Math.random() * hands.length);
	return hands[random];
};

const handsButtons = document.querySelectorAll('.hands-button');

const updateHandDisplay = (hand, displayElement) => {
	const emojiMap = {
		'Rock 🪨': '🪨',
		'Paper 📄': '📄',
		'Scissors ✂️': '✂️',
	};
	displayElement.innerText = emojiMap[hand];
};

const closeModal = () => {
	modal.classList.add('hidden');
};

const handleModal = (score1, score2) => {
	if (score1 === 5 || score2 === 5) {
		modalTitle.textContent = score1 === 5 ? 'You Won!!!' : 'You Lost!!!';
		modal.classList.remove('hidden');

		handsButtons.forEach((button) => {
			button.disabled = true;
		});
	}
};

const determineWinner = (playerChoice) => {
	const computer = pickHands();

	updateHandDisplay(playerChoice, player1hand);
	updateHandDisplay(computer, player2hand);

	if (playerChoice === computer) return 'Draw';

	const wins = {
		'Rock 🪨': 'Scissors ✂️',
		'Paper 📄': 'Rock 🪨',
		'Scissors ✂️': 'Paper 📄',
	};

	const result =
		wins[playerChoice] === computer ? 'Player Wins' : 'Computer Wins';

	if (result === 'Player Wins') {
		playerScore++;
		playerScoreDisplay.textContent = playerScore;
	} else if (result === 'Computer Wins') {
		computerScore++;
		computerScoreDisplay.textContent = computerScore;
	}

	handleModal(playerScore, computerScore);
};

const newGame = () => {
	playerScore = 0;
	computerScore = 0;
	playerScoreDisplay.textContent = 0;
	computerScoreDisplay.textContent = 0;
	closeModal();
	handsButtons.forEach((button) => {
		button.disabled = false;
	});
};

btnCloseModal.addEventListener('click', closeModal);
btnAgainModal.addEventListener('click', newGame);
btnNew.addEventListener('click', newGame);

handsButtons.forEach((button) => {
	button.addEventListener('click', (e) => {
		determineWinner(e.target.innerText);
	});
});

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
});
