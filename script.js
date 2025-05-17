let $ = document;

const guessInputElem = $.querySelector("#guessInput");
const checkBtnElem = $.querySelector("#checkBtn");
const messageElem = $.querySelector("#message");
const restartBtnElem = $.querySelector("#restartButton");
const gameContainer = $.querySelector(".game-container");

let randomNum = Math.floor(Math.random() * 100) + 1;
let maxAttemptNum = 10;
let previousGuess = null;
let guessTrend = 0;

function setMessage(text, color) {
    messageElem.textContent = text;
    messageElem.style.color = color;

    messageElem.classList.add('message-animation')

    setTimeout(() => {
        messageElem.classList.remove('message-animation')
    }, 500);
}

checkBtnElem.addEventListener("click", processGuess);

guessInputElem.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        processGuess();
    }
});

function processGuess() {
    let userGuess = parseInt(guessInputElem.value);

    guessInputElem.value = "";

    if (!userGuess || isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        setMessage("Please enter a valid number between 1 and 100", "yellow");
        return;
    }

    maxAttemptNum--;

    if (userGuess === randomNum) {
        setMessage(`🎉 Correct! The number was ${randomNum}.`, "limegreen");
        guessInputElem.disabled = true;
        checkBtnElem.disabled = true;
        restartBtnElem.style.display = "block";
    } else {
        let direction = userGuess > randomNum ? "high" : "low";

        
        if (previousGuess !== null) {
            if (
                (userGuess > randomNum && previousGuess > randomNum) ||
                (userGuess < randomNum && previousGuess < randomNum)
            ) {
                guessTrend++;
            } else {
                guessTrend = 0;
            }
        }


        if (guessTrend >= 2) {
            triggerAnimation(direction);
        }

        setMessage(
            direction === "high" ? "📉 Too high! Try again." : "📈 Too low! Try again.",
            "orange"
        );
    }

    previousGuess = userGuess;
}


function triggerAnimation(direction) {
    if (direction === "high") {
        gameContainer.classList.add("shake-high");
    } else {
        gameContainer.classList.add("shake-low");
    }

    setTimeout(() => {
        gameContainer.classList.remove("shake-high", "shake-low");
    }, 500);
}


restartBtnElem.addEventListener("click", () => {
    randomNum = Math.floor(Math.random() * 100) + 1;
    maxAttemptNum = 10;
    previousGuess = null;
    guessTrend = 0;
    guessInputElem.value = "";
    guessInputElem.disabled = false;
    checkBtnElem.disabled = false;
    restartBtnElem.style.display = "none";
    setMessage("", "white");
});

window.onload = () => {
    guessInputElem.focus();
};
