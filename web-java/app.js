let paragraphElement = document.querySelector('p');

function changeText()
{
    paragraphElement.textContent = "Clicked";
    console.log("click");
}

paragraphElement.addEventListener('click', changeText);


let inputElement = document.querySelector('input');

function userInput(event) 
{
    // let enteredElement = inputElement.value;
    // let enteredElement = event.target.value;
    let enteredElement = event.data;

    console.log(enteredElement);
    console.log(event);
}

inputElement.addEventListener('input', userInput);

