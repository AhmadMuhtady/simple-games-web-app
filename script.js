const againBtn = document.querySelector('.again');
const checkBtn = document.querySelector('.check');
const inputNum = document.querySelector('.guess');
const message = document.querySelector('.message');
let guessNum = 0;
const scoreMes = document.querySelector('.score');
let score = 20;
const title = document.querySelector('.title');
const number = document.querySelector('.number');
const highScore = document.querySelector('.highscore');

const getRandomNumber = () => {
	guessNum = Math.floor(Math.random() * 20 + 1);
	console.log(guessNum);
	return guessNum;
};
