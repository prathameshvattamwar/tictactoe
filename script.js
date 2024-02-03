let player1Name;
let player2Name;
let currentPlayer;
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let twoPlayerMode = false;

function openGameModePopup() {
  const gameModePopup = document.getElementById('game-mode-popup');
  gameModePopup.style.display = 'flex';
}

function startSinglePlayerGame() {
  twoPlayerMode = false;
  openPlayerInputPopup();
}

function startTwoPlayerGame() {
  twoPlayerMode = true;
  openPlayerInputPopup();
}

function openPlayerInputPopup() {
    const playerInputPopup = document.getElementById('player-input-popup');
    const player2Label = document.getElementById('player2-label');
    const player2Input = document.getElementById('player2');
    const playerInputHeading = document.getElementById('player-input-heading');
  
    if (twoPlayerMode) {
      playerInputHeading.textContent = 'Enter Player Names';
      player2Label.style.display = 'block';
      player2Input.style.display = 'block';
    } else {
      playerInputHeading.textContent = 'Enter Your Name';
      player2Label.style.display = 'none';
      player2Input.style.display = 'none';
    }
  
    playerInputPopup.style.display = 'flex';
  }

function startGame() {
  player1Name = document.getElementById('player1').value;
  player2Name = twoPlayerMode ? document.getElementById('player2').value : 'Computer';
  currentPlayer = "X";
  gameActive = true;
  closePopup();
  renderBoard();

  if (!twoPlayerMode && currentPlayer === 'O') {
    playComputer();
  }
}

function renderBoard() {
  const boardContainer = document.getElementById('board');
  boardContainer.innerHTML = '';

  for (let i = 0; i < board.length; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = board[i];
    cell.addEventListener('click', () => handleCellClick(i));
    boardContainer.appendChild(cell);
  }
}

function handleCellClick(index) {
    if (board[index] === '' && gameActive) {
      board[index] = currentPlayer;
      renderBoard();
  
      // Play audio based on the current player
      const soundAudio = currentPlayer === 'X' ? document.getElementById('sound1Audio') : document.getElementById('sound2Audio');
      soundAudio.play();
  
      if (checkWinner()) {
        showEndPopup(`${getCurrentPlayerName()} wins!`);
      } else if (!board.includes('')) {
        showEndPopup("It's a draw!");
      } else {
        switchPlayer();
      }
    }
  }
  

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  if (!twoPlayerMode && currentPlayer === 'O') {
    setTimeout(playComputer, 1000);
  }
}

function playComputer() {
    const emptyCells = board.reduce((acc, value, index) => {
      if (value === '') {
        acc.push(index);
      }
      return acc;
    }, []);
  
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const computerMove = emptyCells[randomIndex];
    board[computerMove] = currentPlayer;
    renderBoard();
  
    if (checkWinner()) {
      showEndPopup(`${getCurrentPlayerName()} wins!`);
    } else if (!board.includes('')) {
      showEndPopup("It's a draw!");
    } else {
      switchPlayer();
  
      // Play sound only if it's a manual player's turn
      if (currentPlayer === 'X') {
        const soundAudio = document.getElementById('sound2Audio');
        soundAudio.play();
      }
    }
  }
  
function getCurrentPlayerName() {
  return currentPlayer === 'X' ? player1Name : player2Name;
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      return true;
    }
  }

  return false;
}

function showEndPopup(message) {
  const popup = document.getElementById('popup');
  const popupMessage = document.getElementById('popup-message');
  popupMessage.textContent = message;
  popup.style.display = 'flex';
}

function closePopup() {
  const popups = document.querySelectorAll('.popup');
  popups.forEach((popup) => {
    popup.style.display = 'none';
  });
}

function newGame() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';

  player1Name = '';
  player2Name = '';
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;

  if (twoPlayerMode) {
    openPlayerInputPopup();
  } else {
    startGame();
  }
}

function goToHomePage() {
    openGameModePopup();
  }

function showEndPopup(message) {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    popupMessage.textContent = message;
    popup.style.display = 'flex';
  
    // Play the audio
    const winnerAudio = document.getElementById('winnerAudio');
    winnerAudio.play();
  }
  

// Initial function call to open the game mode popup when the page loads
openGameModePopup();
