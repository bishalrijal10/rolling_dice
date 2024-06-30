'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const newGameButton = document.querySelector('.btn--new');
const rollButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
const ActivePlayer = {
  ac1: 0,
  ac2: 1,
};

let currentActivePlayer = ActivePlayer.ac1;

function toggleActivePlayer() {
  currentActivePlayer =
    currentActivePlayer === ActivePlayer.ac1
      ? ActivePlayer.ac2
      : ActivePlayer.ac1;
  return currentActivePlayer;
}

diceEl.classList.add('hidden');
let currentScore = 0;

rollButton.addEventListener('click', function () {
  const dice = Math.trunc(Math.random() * 6) + 1;

  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  // updating user based on value of dice roll
  if (dice !== 1) {
    currentScore += dice;
    if (currentActivePlayer === ActivePlayer.ac1) {
      currentScore0.textContent = currentScore;
    } else {
      currentScore1.textContent = currentScore;
    }
  } else {
    currentScore = 0;
    if (currentActivePlayer === ActivePlayer.ac1) {
      currentScore0.textContent = currentScore;
    } else {
      currentScore1.textContent = currentScore;
    }
    toggleActivePlayer();
  }
});
