const inputElement = document.querySelector('input');
const remainingChar = document.getElementById('remaining-chars');
const maxLength = inputElement.maxLength;

function userInput(event) 
{
    const enteredElement = inputElement.value;
    const count = maxLength - enteredElement.length;

    remainingChar.textContent = count;
    
    if (count === 0)
    {
        remainingChar.classList.add('error');
        inputElement.classList.add('error');
    }
    else if (count <= 10)
    {
        remainingChar.classList.add('warning');
        inputElement.classList.add('warning');
        remainingChar.classList.remove('error');
        inputElement.classList.remove('error');
    }
    else
    {
        remainingChar.classList.remove('warning');
        inputElement.classList.remove('warning');
    }
    
    console.log(enteredElement);
    console.log(event);
}

inputElement.addEventListener('input', userInput);


