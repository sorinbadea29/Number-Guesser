// Game values
let min = 1,
    max = 10,
    winningNumber = randomNumber(min, max),
    guessesLeft = 3;

// UI Elements  
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

guessInput.focus();

// Get random number
function randomNumber(min, max){
  return Math.floor(Math.random()*(max - min + min) + min);
};

// Listen for guessBtn
guessBtn.addEventListener('click', e => {
  let guess = guessInput.value;
  if(isNaN(guess) || guess < min || guess > max){
    incorrect(false, `The number must be between ${min} and ${max}`);
  }else{
    if(guess == winningNumber){
      correct(true, `You won, ${winningNumber} is the correct number!`);
    }else{
      guessesLeft --;
      incorrect(false, `${guess} is not the winning number, you have ${guessesLeft} guesses left`);
      
      if(guessesLeft === 0){
        gameOver(false, `Game over, the winning number was ${winningNumber}`);
      };
    };
  };
});

function correct(won, msg){
  won = true;
  guessInput.disabled = true;
  message.innerHTML = msg;
  message.style.color = 'green';
  guessBtn.classList.add('play-again');
  guessBtn.value = 'Play again';
};

function incorrect(won, msg){
  won = false;
  guessInput.disabled = false;
  message.innerHTML = msg;
  message.style.color = 'red';
  guessInput.classList.add('shake');
  setTimeout(() => {
    guessInput.classList.remove('shake');
  }, 1000);
};

function gameOver(won, msg){
  won = false;
  guessInput.disabled = true;
  message.innerHTML = msg;
  message.style.color = 'red';
  guessInput.classList.add('shake');
  setTimeout(() => {
    guessInput.classList.remove('shake');
  }, 1000);
  guessBtn.classList.add('play-again');
  guessBtn.value = 'Play again';
};

// Play again
game.addEventListener('mousedown', e => {
  if(e.target.classList.contains('play-again')){
    message.remove();
    window.location.reload();
  };  
});