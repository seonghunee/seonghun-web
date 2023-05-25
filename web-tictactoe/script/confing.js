function openPlayerConfig(event) {
    backGroundElement.style.display = 'block';
    configOverlayElement.style.display = 'block';
    editPlayer = +event.target.dataset.playerid;
}

function closePlayerConfig() {
    backGroundElement.style.display = 'none';
    configOverlayElement.style.display = 'none';
    errorOutputElement.textContent = '';
    playerNameElement.value = '';
}

function savePlayerConfig(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const enteredPlayerName = formData.get('playername').trim();

    if (!enteredPlayerName) {
        errorOutputElement.textContent = 'Please enter a valid name!';
        return;
    }
    
    const updatePlayer = 'player-' + editPlayer + '-data';
    const updatePlayerElement = document.querySelector('#' + updatePlayer + ' h3');
    updatePlayerElement.textContent = enteredPlayerName;

    players[editPlayer -1].name = enteredPlayerName;

    closePlayerConfig();
}

