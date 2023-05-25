function resetGame() {
    activePlayer = 0;
    currentRound = 1;

    gameOverElement.style.display = 'none';
    gameOverElement.firstElementChild.innerHTML = 'You won, <span id="winner-name">PLAYER NAME</span>!';
    
    let gameBoardIndex = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameData[i][j] = 0;
            gameFeildElements[gameBoardIndex].textContent = '';
            gameFeildElements[gameBoardIndex].classList.remove('disabled');
            gameBoardIndex++;
        }
    }
}

function startGame() {
    if (players[0].name === '' || players[1].name === '') {
        alert('Please set costom player name for both players!!');
        return;
    }

    resetGame();
    gameBoardElement.style.display = 'block'
    activePlayerNameElement.textContent = players[activePlayer].name
}

function switchPlayer() {
    if (activePlayer === 0) {
        activePlayer = 1;
    }
    else activePlayer = 0;

    activePlayerNameElement.textContent = players[activePlayer].name
}

function selectGameFeild(event) {
    const selectField = event.target;
    const selectColumn = selectField.dataset.col -1;
    const selectRow = selectField.dataset.row -1;
    checkFinish = 1;

    if (gameData[selectRow][selectColumn]) {
        alert('Please select a empty field!')
        return;
    }
    selectField.textContent = players[activePlayer].symbol;
    selectField.classList.add('disabled');

    gameData[selectRow][selectColumn] = activePlayer + 1;

    const winner = checkGameOver();

    if (winner !== 0) {
        endGame(winner);
    }

    currentRound++;
    switchPlayer();
}

function checkGameOver() {
    
    if ((gameData[0][0] === gameData[1][1] && gameData[1][1] === gameData[2][2]) || 
        (gameData[0][2] === gameData[1][1] && gameData[1][1] === gameData[2][0])) {
            return gameData[1][1];
        }

    for (let i = 0; i < 3; i++) {
        if (gameData[i][0] === gameData[i][1] && gameData[i][1] === gameData[i][2]) {
            return gameData[i][0];
        }   

        else if (gameData[0][i] === gameData[1][i] && gameData[1][i] === gameData[2][i]) {
            return gameData[1][i];
        }
    }
    if (currentRound === 9) {
        return -1;
    }

    return 0;
}

function endGame(winner) {
    gameOverElement.style.display = 'block';

    if (winner > 0) {
        const winnerId = players[winner - 1].name;
        gameOverElement.firstElementChild.firstElementChild.textContent = winnerId;
    }
    else {
        gameOverElement.firstElementChild.textContent = 'It\'s a draw!';
    }
}