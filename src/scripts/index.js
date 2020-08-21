import { getHighscore, setHighscore } from './functions.js';
import { show, hide } from './utils.js';

import wordsAGAL from '~/assets/wordsAGAL.yml';
import wordsRAG from '~/assets/wordsRAG.yml';



const $startText = document.getElementById('start_text');
const $currentWord = document.getElementById('current_word');
const $textField = document.getElementById('text_field');
const $time = document.getElementById('time');
const $scoreWrapper = document.getElementById('score_wrapper');
const $score = document.getElementById('score');
const $highscore = document.getElementById('highscore');
const $footer = document.getElementById('footer');
const $RAGButton = document.getElementById('RAG');
const $AGALButton = document.getElementById('AGAL');

const $hsText = document.getElementById('hsText');
const $scrText = document.getElementById('scoreTxt');


const $helpText = document.getElementById('helpText');
const $ogGitText = document.getElementById('ogGitText');


var $startupTxt = "empezar";
var $globalConf = "RAG";

var regexFilter = /[\u00C0-\u00FF]/;




$RAGButton.addEventListener("click", toRAG);
$AGALButton.addEventListener("click", toAGAL);

function toRAG() {
	if ($globalConf == "AGAL")
		if (state.inGame == true){
			endGame();
			$time.innerText = `${gameLenght}s`;
		}

		$startText.innerHTML = `
				Escribe "<b>empezar</b>" para xogar</span>
			`;
		$textField.placeholder = 'empezar';
		$startupTxt = "empezar";
		$hsText.innerHTML = "Puntuación máis alta"
		$helpText.innerHTML = "Axuda"
		$scrText.innerHTML = "Puntuación"
		$helpText.setAttribute('href', '/helpRAG.html');

		$ogGitText.innerHTML = "github creador orixinal"

		$globalConf = "RAG";
}

function toAGAL() {
	if ($globalConf == "RAG")
		
		if (state.inGame == true){
			endGame();
			$time.innerText = `${gameLenght}s`;
		}

		$startText.innerHTML = `
			Escreva "<b>começar</b>" para jogar</span>
		`;
		$textField.placeholder = 'começar';
		$startupTxt = "começar";
		$hsText.innerHTML = "Maior pontuação"
		$scrText.innerHTML = "Pontuação"

		$helpText.innerHTML = "Ajuda"
		$helpText.setAttribute('href', '/helpAGAL.html');

		$ogGitText.innerHTML = "github criador original"

		$globalConf = "AGAL";
}



const state = {
	doneWords: [],
	currentWord: '',
	inGame: false,
	time: 0,
	score: 0,
	isPassword: false
};
const gameLenght = 10;
var interval;

window.addEventListener('load', () => {
	$time.innerText = `${gameLenght}s`;

	$textField.focus();
	$textField.oninput = textFieldUpdate;
	$textField.placeholder = $startupTxt;

	$highscore.innerText = getHighscore();

	// only show current word when game starts
	hide($currentWord);
	// only show score display when game starts
	hide($scoreWrapper);
});

const textFieldUpdate = () => {
	const text = $textField.value.toLowerCase();

	if (!state.inGame && text === $startupTxt) startGame();


	// if word guessed correct, get an extra second
	if (state.inGame && text.trim() === state.currentWord) {
		// 1 in 10 chance to get 2 extra seconds
		const r = Math.floor(Math.random() * 10);
		if (r === 0) {
			console.log('bonus time!');
			round(2);
			return;
		}

		// by default get 1 extra second for each correct word
		round(1);
	}
};

const startGame = () => {
	state.inGame = true;
	state.score = 0;

	// set game length
	$time.innerText = `${gameLenght}s`;

	// start round
	round(gameLenght);

	show($currentWord);
	hide($startText);

	show($scoreWrapper);

	hide($footer);

	interval = setInterval(() => {
		state.time--;
		$time.innerText = `${state.time}s`;
		if (state.time <= 0) {
			endGame();
		}
	}, 1000);
};

// called each round, after word typed correctly
const round = (val) => {
	// clear the textfield
	$textField.value = '';

	state.time = state.time + val;
	state.score++;
	$score.innerText = state.score;

	if ($globalConf == "AGAL"){
		var words = wordsAGAL;
		console.log("agal");
	}else{
		var words = wordsRAG;
		console.log("rag");
	}

	// get random word
	while (true) {

		// if the word has already been given, don't give again
		state.currentWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
		if (state.doneWords.includes(state.currentWord)) {
			console.log(`${state.currentWord} already done!`);
		} else {
			break;
		}
	}

	$currentWord.innerText = state.currentWord;

	if ($globalConf == "AGAL")
		$textField.placeholder = `escreva "${state.currentWord}"`;
	else
		$textField.placeholder = `escribe "${state.currentWord}"`;

	state.doneWords.push(state.currentWord);

	// if doneWords is the same size as words, empty it out
	// because otherwise there are no words left
	if (state.doneWords.length === words.length) {
		console.log('All words done!');
		state.doneWords = [];
	}

	// reset it if it was the password field
	state.isPassword = false;
	$textField.type = 'text';
	$textField.blur();
	$textField.focus();

	// randomly, make the field a password field so users can't see what's going on
	// 1 in 6 chance
	const r = Math.floor(Math.random() * 6);
	//console.log(state.currentWord,(regexFilter.test(state.currentWord)))
	if (r === 0 && !(regexFilter.test(state.currentWord))) {
		state.isPassword = true;
		$textField.type = 'password';
	}
};

const endGame = () => {
	// reset timer
	clearInterval(interval);

	state.inGame = false;

	// show start text and change text
	show($startText);

	if ($globalConf == "AGAL")

		$startText.innerHTML = `
			<span class="game-over">Game over.<br><br> </span> Escreva "<b>começar</b>" para jogar novamente</span>
		`;
	else
			$startText.innerHTML = `
			<span class="game-over">Game over.<br><br> </span> Escribe "<b>empezar</b>"  para xogar de novo</span>
		`;

	// set placeholder to "start" and empty textfield
	$textField.placeholder = $startupTxt;
	$textField.value = '';
	// $textField.blur();

	// check if score more than highscore
	const highscore = getHighscore();
	if (state.score > highscore) {
		console.log('high score has been beaten!');
		// set new highscore
		$highscore.innerText = state.score;
		setHighscore(state.score);
	}

	// reset field if it was password field
	state.isPassword = false;
	$textField.type = 'text';

	hide($currentWord);
	show($footer);


};
