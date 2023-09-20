// game state
var board = ['', '', '', '', '', '', '', '', ''];
var currentPlayer = 'X';
var gameOver = false;

// to handle player moves
function handleMove(position) {
    if (gameOver || board[position] !== '') {
        return;
    }

    board[position] = currentPlayer;

    // to check if win condition
    if (checkWin(currentPlayer)) {
        gameOver = true;
        displayGameStatus(currentPlayer + ' wins!');
    } else if (checkDraw()) {
        gameOver = true;
        displayGameStatus('It\'s a draw!');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        displayGameStatus('Current player: ' + currentPlayer);
    }

    displayBoard();
}

// for win condition
function checkWin(player) {
    var winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // R
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // C
        [0, 4, 8], [2, 4, 6] // D
    ];

    return winningCombinations.some(function (combination) {
        return combination.every(function (position) {
            return board[position] === player;
        });
    });
}

// when draw condition
function checkDraw() {
    return board.every(function (value) {
        return value !== '';
    });
}

// game status funct
function displayGameStatus(message) {
    var gameStatusElement = document.getElementById('game-status');
    gameStatusElement.textContent = message;
}

// game board funct
function displayBoard() {
    var squares = document.getElementsByClassName('square');

    for (var i = 0; i < squares.length; i++) {
        squares[i].textContent = board[i];
    }
}

// square clicks
document.addEventListener('DOMContentLoaded', function () {
    var squares = document.getElementsByClassName('square');

    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', function (event) {
            var position = parseInt(event.target.getAttribute('data-position'), 10);
            handleMove(position);
        });
    }
});

// reset button
var resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', function () {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    displayGameStatus('Current player: ' + currentPlayer);
    displayBoard();
});
