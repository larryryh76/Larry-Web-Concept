const cells = document.querySelectorAll('.cell');
let userMark = 'X';
let aiMark = 'O';
let gameOver = false;
let level = 1;
let startingPlayer = 'user';

function startGame() {
  gameOver = false;
  cells.forEach((cell) => (cell.innerHTML = ''));
  if (level === 2) {
    // Make the game harder for level 2
    // For example, you could increase the AI's depth limit or add more complex heuristics
  }
  if (startingPlayer === 'user') {
    // User starts
    // No action needed, as the user will make the first move
  } else {
    // AI starts
    systemMove();
  }
  startingPlayer = startingPlayer === 'user' ? 'ai' : 'user';
}

cells.forEach((cell) => {
  cell.addEventListener('click', () => {
    if (!gameOver && cell.innerHTML === '') {
      cell.innerHTML = userMark;
      checkWin();
      if (!gameOver) {
        setTimeout(() => {
          systemMove();
        }, 1000); // Wait 1 second before AI move
      }
    }
  });
});

function checkWin() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    if (
      cells[condition[0]].innerHTML === userMark &&
      cells[condition[1]].innerHTML === userMark &&
      cells[condition[2]].innerHTML === userMark
    ) {
      celebrateWin('You win!');
      gameOver = true;
    } else if (
      cells[condition[0]].innerHTML === aiMark &&
      cells[condition[1]].innerHTML === aiMark &&
      cells[condition[2]].innerHTML === aiMark
    ) {
      celebrateWin('AI wins!');
      gameOver = true;
    }
  }
  if (!gameOver && !Array.from(cells).some((cell) => cell.innerHTML === '')) {
    celebrateWin('Draw!');
    gameOver = true;
  }
}

function celebrateWin(message) {
    const winCelebration = document.createElement('div');
    winCelebration.className = 'win-celebration';
    winCelebration.innerHTML = `<h1 style="font-size: 48px; color: #ff69b4; text-align: center;">${message}</h1>`;
    winCelebration.style.position = 'fixed';
    winCelebration.style.top = '50%';
    winCelebration.style.left = '50%';
    winCelebration.style.transform = 'translate(-50%, -50%)';
    winCelebration.style.backgroundColor = '#fff';
    winCelebration.style.padding = '20px';
    winCelebration.style.borderRadius = '10px';
    winCelebration.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5)';
    document.body.appendChild(winCelebration);
    setTimeout(() => {
      winCelebration.remove();
      const nextLevelButton = document.createElement('button');
      nextLevelButton.innerHTML = 'Next Level';
      nextLevelButton.className = 'next-level-button';
      document.body.appendChild(nextLevelButton);
      nextLevelButton.addEventListener('click', () => {
        gameOver = false;
        cells.forEach((cell) => (cell.innerHTML = ''));
        document.body.removeChild(nextLevelButton);
        level++;
        startGame();
      });
    }, 3000);
  }
  

function systemMove() {
  if (gameOver) return;
  let bestScore = -Infinity;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].innerHTML === '') {
      cells[i].innerHTML = aiMark;
      let score = minimax(0, false);
      cells[i].innerHTML = '';
      if (score > bestScore) {
        bestScore = score;
      }
    }
  }
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].innerHTML === '') {
      cells[i].innerHTML = aiMark;
      checkWin();
      return;
    }
  }
}

function minimax(depth, isMaximizing) {
  if (gameOver) {
    return isMaximizing ? -10 : 10;
  }
  if (depth === 9) {
    return 0;
  }
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].innerHTML === '') {
        cells[i].innerHTML = aiMark;
        let score = minimax(depth + 1, false);
        cells[i].innerHTML = '';
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].innerHTML === '') {
        cells[i].innerHTML = userMark;
        let score = minimax(depth + 1, true);
        cells[i].innerHTML = '';
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

document.getElementById('x-button').addEventListener('click', () => {
  userMark = 'X';
  aiMark = 'O';
  startGame();
});

document.getElementById('o-button').addEventListener('click', () => {
  userMark = 'O';
  aiMark = 'X';
  startGame();
});



let depthLimit = level * 2;
let bestScore = -Infinity;
for (let i = 0; i < cells.length; i++) {
  if (cells[i].innerHTML === '') {
    cells[i].innerHTML = aiMark;
    let score = minimax(0, false, depthLimit);
    cells[i].innerHTML = '';
    if (score > bestScore) {
      bestScore = score;
    }
  }
}

let possibleMoves = level * 10;
for (let i = 0; i < possibleMoves; i++) {
  // Generate a random possible move
  let move = Math.floor(Math.random() * cells.length);
  if (cells[move].innerHTML === '') {
    cells[move].innerHTML = aiMark;
    let score = minimax(0, false);
    cells[move].innerHTML = '';
    if (score > bestScore) {
      bestScore = score;
    }
  }
}


// Add CSS styles for the next level button
const style = document.createElement('style');
style.innerHTML = `
  .next-level-button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .next-level-button:hover {
    background-color: #0056b3;
  }
`;
