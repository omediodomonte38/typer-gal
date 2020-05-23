import { getHighscore, setHighscore } from './highscore.js';
import { hide, show } from './utils.js';
import words from '~/assets/words.yml';

const $startText = document.getElementById('start_text');
const $currentWord = document.getElementById('current_word');
const $textField = document.getElementById('text_field');
const $time = document.getElementById('time');
const $scoreWrapper = document.getElementById('score_wrapper');
const $score = document.getElementById('score');
const $highscore = document.getElementById('highscore');
const $footer = document.getElementById('footer');

var currentWord = '';
var inGame = false;
var time = 0;
const gameLenght = 10;
var score = 0;
var interval;

document.body.onload = () => {
  hide($currentWord);
  $time.innerText = `${gameLenght}s`;

  $textField.focus();
  $textField.oninput = textFieldUpdate;
  // set placeholder to "start"
  $textField.placeholder = 'type "start"';

  $highscore.innerText = getHighscore();

  // only show score display when game starts
  hide($scoreWrapper);
};

const textFieldUpdate = () => {
  const text = $textField.value.toLowerCase();

  if (!inGame && text === 'start') startGame();

  // if word guessed correct, get an extra second
  if (inGame && text.trim() === currentWord) round(1);
};

const startGame = () => {
  inGame = true;
  score = 0;

  // set game length
  $time.innerText = `${gameLenght}s`;

  // start round
  round(gameLenght);

  show($currentWord);
  hide($startText);

  show($scoreWrapper);

  hide($footer);

  interval = setInterval(() => {
    time--;
    $time.innerText = `${time}s`;
    if (time <= 0) {
      endGame();
    }
  }, 1000);
};

// called each round, after word typed correctly
const round = (val) => {
  // clear the textfield
  $textField.value = '';

  increaseTime(val);
  score++;
  $score.innerText = score;

  // get random word
  currentWord = words[Math.floor(Math.random() * words.length)];
  $currentWord.innerText = currentWord;
  $textField.placeholder = `type "${currentWord}"`;
};

// when word typed correctly, time should be increased
const increaseTime = (val) => {
  time = time + val;
};

const endGame = () => {
  // reset timer
  clearInterval(interval);

  inGame = false;

  // show start text and change text
  show($startText);
  $startText.innerHTML = `
    <span class="game-over">Game over. </span> Type "<b>start</b>" to play again</span>
  `;

  // set placeholder to "start" and empty textfield
  $textField.placeholder = 'type "start"';
  $textField.value = '';
  $textField.blur();

  // check if score more than highscore
  const highscore = getHighscore();
  if (score > highscore) {
    console.log('high score has been beaten!');
    // set new highscore
    $highscore.innerText = score;
    setHighscore(score);
  }

  hide($currentWord);

  show($footer);
};
