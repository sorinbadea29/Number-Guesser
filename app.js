let min = 1,
    max = 10, 
    winningNum = randomNumber(min, max), 
    guessesLeft = 3;

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessInput = document.querySelector('#guess-input'),
      guessBtn = document.querySelector('#guess-btn'),
      message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

guessInput.focus();

function randomNumber(min, max){
  return Math.floor(Math.random()* (max - min + min) + min);
};

game.addEventListener('mousedown', e => {
  if(e.target.classList.contains('play-again')){
    window.location.reload(); 
  }
});

// Listen for guessBtn
guessBtn.addEventListener('click', () => {
  const guess = guessInput.value;
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  } else{
    if(guess == winningNum){
      gameOver(true, `${winningNum} is correct, You Won!`);
    }else{
      guessesLeft -= 1;
      if(guessesLeft === 0){
        gameOver(false, `You Lost, the winning numer was ${winningNum}`);
      }else{
        setMessage(`${guess} is not correct. You have ${guessesLeft} more guesses left`, 'red');
        guessInput.value = '';
        guessInput.focus();
      };
    };
  };
});

function setMessage(msg, color){
  message.innerText = msg;
  message.style.color = color;
};

function gameOver(won, msg, color){
  guessInput.disabled = 'true';
  won === true ? color = 'green' : color = 'red';
  message.style.color = color;
  guessInput.style.borderColor = color;
  setMessage(msg, color);
  guessBtn.value = 'Play again';
  guessBtn.classList.add('play-again');
};