let $ = document;

const guessInputElem = $.querySelector('#guessInput');
const checkBtnElem = $.querySelector('#checkBtn');
const messageElem = $.querySelector('#message'); 
const restartBtnElem = $.querySelector('#restartButton');

let randomNum = Math.floor(Math.random() * 100) + 1;
let maxAttemptNum = 10;

function setMessage(text, color) {
    messageElem.textContent = text;
    messageElem.style.color = color;
}

checkBtnElem.addEventListener('click', () => {
    let userGuess = parseInt(guessInputElem.value);

    if (!userGuess || isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        setMessage('Please enter a valid number between 1 and 100', 'yellow');
        return;
    }    
    maxAttemptNum--;

    if (userGuess === randomNum) {
        setMessage(`🎉 Correct! The number was ${randomNum}.`, 'limegreen');
        guessInputElem.disabled = true;
        checkBtnElem.disabled = true;
        restartBtnElem.style.display = 'block';
    } else if (maxAttemptNum === 0) {
        setMessage(`💀 Game Over! The number was ${randomNum}.`, 'red');
        guessInputElem.disabled = true;
        checkBtnElem.disabled = true;
        restartBtnElem.style.display = 'block';
    } else {
        setMessage(userGuess > randomNum ? '📉 Too high! Try again.' : '📈 Too low! Try again.', 'orange');
    }
});

restartBtnElem.addEventListener('click', () => {
    randomNum = Math.floor(Math.random() * 100) + 1;
    maxAttemptNum = 10;
    guessInputElem.value = '';
    guessInputElem.disabled = false;
    checkBtnElem.disabled = false;
    restartBtnElem.style.display = 'none';
    setMessage('', 'white');
});
