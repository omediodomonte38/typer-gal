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

//buttons to change the grammar
const $RAGButton = document.getElementById('RAG');
const $AGALButton = document.getElementById('AGAL');

//to translate the text on a button press
const $hsText = document.getElementById('hsText');
const $scrText = document.getElementById('scoreTxt');


const $helpText = document.getElementById('helpText');
const $ogGitText = document.getElementById('ogGitText');

//variables containing default value for text fields
var $startupTxt = "empezar";
var $globalConf = "RAG";

//regex to filter especial characters like accents
var regexFilter = /[\u00C0-\u00FF]/;


//buttons to translate
$RAGButton.addEventListener("click", toRAG);
$AGALButton.addEventListener("click", toAGAL);


//translate from reintegrata to isolata
function toRAG() {

	if ($globalConf == "AGAL"){

		if (state.inGame == true){
			endGame();
			$time.innerText = `${gameLenght}s`;
		}

		$startText.innerHTML = `
				Para iniciares o xogo <br> escribe "<b>empezar</b>"</span>
			`;
		$textField.placeholder = 'empezar';
		$startupTxt = "empezar";
		$hsText.innerHTML = "Puntuación máis alta"
		$helpText.innerHTML = "Axuda"
		$scrText.innerHTML = "Puntuación"
		$helpText.setAttribute('href', '/helpRAG.html');

		$ogGitText.innerHTML = "Github orixinal"

		$globalConf = "RAG";
	}
}

//translate from isolata to reintegrata
function toAGAL() {

	if ($globalConf == "RAG"){

		if (state.inGame == true){
			endGame();
			$time.innerText = `${gameLenght}s`;
		}

		$startText.innerHTML = `
			Para iniciares o xogo <br> escreve "<b>começar</b>"</span>
		`;
		$textField.placeholder = 'começar';
		$startupTxt = "começar";
		$hsText.innerHTML = "Pontuação mais alta"
		$scrText.innerHTML = "Pontuação"

		$helpText.innerHTML = "Ajuda"
		$helpText.setAttribute('href', '/helpAGAL.html');

		$ogGitText.innerHTML = "Github original"

		$globalConf = "AGAL";
	}
}



const state = {
	doneWords: [],
	currentWord: '',
	inGame: false,
	time: 0,
	score: 0,
	isPassword: false
};
const gameLenght = 15;
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

	//select the set of words to use depending on state
	if ($globalConf == "AGAL"){
		var words = wordsAGAL;
		//console.log("agal");

	}else{
		var words = wordsRAG;
		//console.log("rag");
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

	// Depeding on the state display different text
	if ($globalConf == "AGAL")
		$textField.placeholder = `escreve "${state.currentWord}"`;
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

	//as password field does not accept accents etc only allow it in the case
	//that the word does not have them
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

	//again depeding on the state display different text
	if ($globalConf == "AGAL")

		$startText.innerHTML = `
			<span class="game-over">Game over.<br><br> </span> Escreve "<b>começar</b>" para jogar novamente</span>
		`;
	else
			$startText.innerHTML = `
			<span class="game-over">Game over.<br><br> </span> Escribe "<b>empezar</b>" para xogar de novo</span>
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
