let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  };
  
  updateScoreElement();
  
  let isAutoPlaying = false;
  let intervalID;
  
  // Auto Play button event listener
  document.querySelector('.auto-play-btn').addEventListener('click', () => {
    autoPlay();
  });
  
  function autoPlay() {
    if (!isAutoPlaying) {
      intervalID = setInterval(() => {
        const playerMove = pickComputerMove();
        playGame(playerMove);
      }, 1000);
      isAutoPlaying = true;
  
      document.querySelector('.auto-play-btn').innerHTML = 'Stop Auto Play';
    } else {
      clearInterval(intervalID);
      isAutoPlaying = false;
  
      document.querySelector('.auto-play-btn').innerHTML = 'Auto Play';
    }
  }
  
  // Button click event listeners
  document.querySelector('.js-rock-btn').addEventListener('click', () => {
    playGame('rock');
  });
  document.querySelector('.js-paper-btn').addEventListener('click', () => {
    playGame('paper');
  });
  document.querySelector('.js-scissors-btn').addEventListener('click', () => {
    playGame('scissors');
  });
  
  // Keyboard event listener for player input
  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
      playGame('rock');
    } else if (event.key === 'p') {
      playGame('paper');
    } else if (event.key === 's') {
      playGame('scissors');
    } else if (event.key === 'a') {
      autoPlay();
    } else if (event.key === 'Backspace') {
      showResetConfirmation();
    }
  });
  
  function playGame(playerMove) {
    const computerMove = pickComputerMove();
  
    let result = '';
  
    if (playerMove === 'scissors') {
      result = computerMove === 'rock' ? 'You lose.' : computerMove === 'paper' ? 'You win.' : 'Tie.';
    } else if (playerMove === 'paper') {
      result = computerMove === 'rock' ? 'You win.' : computerMove === 'paper' ? 'Tie.' : 'You lose.';
    } else if (playerMove === 'rock') {
      result = computerMove === 'rock' ? 'Tie.' : computerMove === 'paper' ? 'You lose.' : 'You win.';
    }
  
    // Update score based on the result
    if (result === 'You win.') {
      score.wins += 1;
    } else if (result === 'You lose.') {
      score.losses += 1;
    } else if (result === 'Tie.') {
      score.ties += 1;
    }
  
    // Save score in localStorage
    localStorage.setItem('score', JSON.stringify(score));
  
    // Update the score, result, and moves if they've changed
    updateScoreElement();
    updateResultElement(result);
    updateMovesElement(playerMove, computerMove);
  }
  
  // Reset score to 0
  function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
  }
  
  // Reset score button event listener
  document.querySelector('.reset-score-btn').addEventListener('click', () => {
    resetScore();
  });
  
  // Optimized updateScoreElement function
  function updateScoreElement() {
    const scoreElement = document.querySelector('.js-score');
    const newScoreText = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    
    if (scoreElement.innerHTML !== newScoreText) {
      scoreElement.innerHTML = newScoreText;
    }
  }
  
  // Optimized updateResultElement function
  function updateResultElement(result) {
    const resultElement = document.querySelector('.js-result');
    
    if (resultElement.innerHTML !== result) {
      resultElement.innerHTML = result;
    }
  }
  
  // Optimized updateMovesElement function
  function updateMovesElement(playerMove, computerMove) {
    const movesElement = document.querySelector('.js-moves');
    const newMovesText = `You <img src="${playerMove}-emoji.png" class="move-icon"> <img src="${computerMove}-emoji.png" class="move-icon"> Computer`;
  
    if (movesElement.innerHTML !== newMovesText) {
      movesElement.innerHTML = newMovesText;
    }
  }
  
  // Randomly select the computer's move
  function pickComputerMove() {
    const randomNumber = Math.random();
  
    let computerMove = '';
  
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
      computerMove = 'scissors';
    }
  
    return computerMove;
  }
  