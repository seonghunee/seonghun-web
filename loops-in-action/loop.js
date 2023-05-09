// 1

const sumButtonElement = document.querySelector('#calculator button');

function sumNumber() {
    const sumInputElement = document.querySelector('#user-number');
    const sumInputNumber = sumInputElement.value;
    let sumNumber = 0;
    
    for (let i = 0; i <= sumInputNumber; i++)
    {
        sumNumber += i;
    }

    const outputTextElement = document.querySelector('#calculated-sum');
    outputTextElement.textContent = sumNumber;
    outputTextElement.style.display = 'block';
}

sumButtonElement.addEventListener('click', sumNumber);

// 2

const highlightLinkButtonElement = document.querySelector('#highlight-links button');

function highlightLink() {
    const anchorElements = document.querySelectorAll('#highlight-links a');

    for (const anchorElement of anchorElements) {
        anchorElement.classList.add('highlight');
    }
}

highlightLinkButtonElement.addEventListener('click', highlightLink);

// 3

const userDataButtonElement = document.querySelector('#user-data button');

const userData = {
    firstName : 'seonghun',
    lastName : 'Hwang',
    age: '24'
}

function displayUserData() {
    const userDataList = document.getElementById('output-user-data');

    for (const key in userData) {
        const newUserData = document.createElement('li');
        const outputUserData = key.toUpperCase() + ': ' + userData[key];
        newUserData.textContent = outputUserData;

        userDataList.append(newUserData);
    }
}

userDataButtonElement.addEventListener('click', displayUserData);

// 4 

const statisticsButtonElement = document.querySelector('#statistics button');

function rolledDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function a() {
    const targetNumberElement = document.getElementById('user-target-number');
    const diceRollsElement = document.getElementById('dice-rolls');

    const enteredNumber = targetNumberElement.value;
    let diceNumber = 0;
    let count = 0;

    diceRollsElement.innerHTML = '';

    while (enteredNumber != diceNumber) {
        diceNumber = rolledDice();
        count++;

        const rolledDiceListElement = document.createElement('li');
        const outputText = 'Roll' + count + ': ' + diceNumber;
        rolledDiceListElement.textContent = outputText;

        diceRollsElement.append(rolledDiceListElement);
    }
    const outputTotalRollsElement = document.getElementById('output-total-rolls');
    const outputTargetNumberElement = document.getElementById('output-target-number');

    outputTotalRollsElement.textContent = count;
    outputTargetNumberElement.textContent = diceNumber;
}

statisticsButtonElement.addEventListener('click', a);