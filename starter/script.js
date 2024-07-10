'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const newGameButton = document.querySelector('.btn--new');
const rollButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');
const activeVisual0 = document.querySelector('.player--0');
const activeVisual1 = document.querySelector('.player--1');
const rulesOfGame = document.querySelector('.rule');
const rulesOkButton = document.querySelector('.rules_btn');

score0El.textContent = 0;
score1El.textContent = 0;
const ActivePlayer = {
  ac1: 0,
  ac2: 1,
};
rulesOfGame.classList.add('disp_flex')

let currentActivePlayer = ActivePlayer.ac1;
let total_score_player1 = 0;
let total_score_player2 = 0;
let currentVisualStatus = 0;

function toggleActivePlayer() {
  currentActivePlayer =
    currentActivePlayer === ActivePlayer.ac1
      ? ActivePlayer.ac2
      : ActivePlayer.ac1;
  currentScore = 0;
  return currentActivePlayer;
}

diceEl.classList.add('hidden');
let currentScore = 0;

const resetGame = function () {
  currentScore = 0;
  total_score_player1 = 0;
  total_score_player2 = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentActivePlayer = ActivePlayer.ac1;
};

const isWinner = function (totalScore1, totalScore2) {
  if (totalScore1 >= 100) {
    score0El.textContent = 'WINNER';
  } else if (totalScore2 >= 100) {
    score1El.textContent = 'WINNER';
  }
  diceEl.classList.add('hidden');
  rollButton.disabled = true;
  holdButton.disabled = true;
};

const scoreUpdate = function (currentScore) {
  if (currentActivePlayer === ActivePlayer.ac1) {
    currentScore0.textContent = currentScore;
  } else {
    currentScore1.textContent = currentScore;
  }
};

const holdScoreUpdate = function (currentScore) {
  if (
    currentActivePlayer === ActivePlayer.ac1 &&
    currentScore !== 0 &&
    total_score_player1 <= 100
  ) {
    total_score_player1 += currentScore;
    score0El.textContent = total_score_player1;
  } else if (
    currentActivePlayer === ActivePlayer.ac2 &&
    currentScore !== 0 &&
    total_score_player2 <= 100
  ) {
    total_score_player2 += currentScore;
    score1El.textContent = total_score_player2;
  }
  if (total_score_player1 >= 100 || total_score_player2 >= 100) {
    isWinner(total_score_player1, total_score_player2);
  }

  if (currentActivePlayer === ActivePlayer.ac1 && currentScore === 0) {
    score0El.textContent = 0;
    total_score_player1 = 0;
  } else if (currentActivePlayer === ActivePlayer.ac2 && currentScore === 0) {
    score1El.textContent = 0;
    total_score_player2 = 0;
  }
};

const activeShow = function (currentVisualStatus) {
  if (currentVisualStatus === 0) {
    activeVisual0.classList.add('player--active');
    activeVisual1.classList.remove('player--active');
  } else {
    activeVisual1.classList.add('player--active');
    activeVisual0.classList.remove('player--active');
  }
  console.log(currentVisualStatus);
  console.log('Hello_Yoo');
};

rollButton.addEventListener('click', function () {
  const dice = Math.trunc(Math.random() * 6) + 1;

  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  // updating user based on value of dice roll
  if (dice !== 1) {
    currentScore += dice;
    scoreUpdate(currentScore);
    holdButton.classList.remove('hidden');
    activeShow(currentVisualStatus);
  } else {
    currentScore = 0;
    scoreUpdate(currentScore);
    holdScoreUpdate(currentScore);
    currentVisualStatus = toggleActivePlayer();
    activeShow(currentVisualStatus);
    holdButton.classList.add('hidden');
  }
});

holdButton.addEventListener('click', function () {
  holdScoreUpdate(currentScore);
  currentScore = 0;
  currentVisualStatus = toggleActivePlayer();
  activeShow(currentVisualStatus);
  holdButton.classList.add('hidden');
});

newGameButton.addEventListener('click', function () {
  resetGame();
  holdButton.classList.add('hidden');
  activeShow(0);
});

rulesOkButton.addEventListener('click', function () {
  rulesOfGame.classList.remove('disp_flex');
  rulesOfGame.classList.add('hidden');
});
