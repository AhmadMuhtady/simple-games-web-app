const player1hand = document.querySelector('.player1-hand');
const player2hand = document.querySelector('.player2-hand');
const buttonsSection = document.querySelector('.hands-buttons');
let playerScore = 0;
let computerScore = 0;
const playerScoreDisplay = document.getElementById('score--1');
const computerScoreDisplay = document.getElementById('score--2');
const handsButtons = document.querySelectorAll('.hands-button');

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
