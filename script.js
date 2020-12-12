'use strict';

//
let scoretot0 = document.querySelector('#score--0');
let scoretot1 = document.querySelector('#score--1');
let scorecur0 = document.querySelector('#current--0');
let scorecur1 = document.querySelector('#current--1');
let dice = document.querySelector('.dice'); //dice image
let btnew = document.querySelector('.btn--new');
let btroll = document.querySelector('.btn--roll');
let bthold = document.querySelector('.btn--hold');
//we need to change the color of the background to illustrate the current user
let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');

//initialization
let winning_score = 50; //score that needs to be reached in order for the user to win
scoretot0.textContent = 0;
scoretot1.textContent = 0;
scorecur0.textContent = 0;
scorecur1.textContent = 0;
dice.classList.add('hidden');
let t1 = 0; //total score player1
let t0 = 0;
let current_score = 0; // current score
let current_player = false; //false for player 1, true for player 2
let w0 = 0;
let w1 = 0; // winning flag will become one when the corresponding user wins

// what happens when we press the roll the dice game
btroll.addEventListener('click', function () {
  if (w0 || w1) {
    return;
  } //if a user has won we can no longer play
  let random_number = Math.trunc(Math.random() * 6) + 1; //numbers between 1 and 6
  // show the number using the dice image
  dice.classList.remove('hidden'); //makes the dice image visible
  // we dont have to check if it already exists, if it exists it will get removed, if not nothing will happen
  dice.src = `dice-${random_number}.png`;
  if (random_number === 1) {
    current_player = !current_player; //switches to other user
    current_score = 0; //current score is set to zero
    scorecur0.textContent = current_score;
    scorecur1.textContent = current_score;

    //toggle removes the class if it already exists, or it adds it if it doesnt have it already exist
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
  } else {
    if (current_player === false) {
      //player 1
      current_score = current_score + random_number;
      scorecur0.textContent = current_score;
    } else {
      //player 2
      current_score = current_score + random_number;
      scorecur1.textContent = current_score;
    }
  }
});

bthold.addEventListener('click', function () {
  if (w0 || w1) {
    return;
  } //if a user has won we can no longer play
  if (current_player === false) {
    // player 1
    t0 = t0 + current_score;
    scoretot0.textContent = t0;
    current_score = 0; //zeroes the current score
    scorecur0.textContent = current_score;

    if (t0 >= winning_score) {
      //what happens when a user has won
      w0 = 1;
      dice.classList.add('hidden');
      //dice gets hidden
      player0.classList.remove('player--active'); //we need to remove the active player first
      player0.classList.add('player--winner');
      //background of the winner becomes black
      return; //user has won thus we exit
    }
    //user is switch
    current_player = !current_player;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
  } else {
    //player 2
    t1 = t1 + current_score;
    scoretot1.textContent = t1;
    current_score = 0; //zeroes the current score
    scorecur0.textContent = current_score;
    if (t1 >= winning_score) {
      //what happens when a user has won
      w1 = 1;
      dice.classList.add('hidden');
      //dice gets hidden
      player1.classList.remove('player--active'); //we need to remove the active player first
      player1.classList.add('player--winner');
      //background of the winner becomes black
      return; //user has won thus we exit
    }
    //user is switch
    current_player = !current_player;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
  }
});

btnew.addEventListener('click', function () {
  //game reset
  w0 = 0;
  w1 = 0;
  current_player = false;
  current_score = 0;
  t0 = 0;
  t1 = 0;
  scoretot0.textContent = 0;
  scoretot1.textContent = 0;
  scorecur0.textContent = 0;
  scorecur1.textContent = 0;
  dice.classList.add('hidden');
  player0.classList.remove('player--active');
  player1.classList.remove('player--active');
  player0.classList.add('player--active');
  //makes the player1 the first user to play again
});
