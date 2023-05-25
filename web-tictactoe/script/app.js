let gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

let currentRound = 1;
let editPlayer = 0;
let activePlayer = 0;

const players = [
    {
        name: '',
        symbol: 'X'
    },
    {
        name: '',
        symbol: 'O'
    }
]

const backGroundElement = document.getElementById('background');
const configOverlayElement = document.getElementById('config-overlay');
const playerNameElement = document.getElementById('playername');

const editPlayer1BtnElement = document.getElementById('edit-player-1-btn');
const editPlayer2BtnElement = document.getElementById('edit-player-2-btn');
const startGameBtnElement = document.getElementById('start-game-btn');

const errorOutputElement = document.getElementById('config-errors');
const cancelConfigBtnElement = document.getElementById('cancel-config-btn');
const formElement = document.querySelector('form');

const gameBoardElement = document.getElementById('active-game');
const gameFeildElements = document.querySelectorAll('#game-board li');
const activePlayerNameElement = document.getElementById('active-name');
const gameOverElement = document.getElementById('game-over');

editPlayer1BtnElement.addEventListener('click', openPlayerConfig);
editPlayer2BtnElement.addEventListener('click', openPlayerConfig);

cancelConfigBtnElement.addEventListener('click', closePlayerConfig);
backGroundElement.addEventListener('click', closePlayerConfig);

formElement.addEventListener('submit', savePlayerConfig);

startGameBtnElement.addEventListener('click', startGame);

for (const gameFeildElement of gameFeildElements) {
    gameFeildElement.addEventListener('click', selectGameFeild);
}