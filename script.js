const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");


let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src="images/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`
    // Create empty letter slots
    wordDisplay.innerHTML = currentWord.split("").map(function() {
        return `<li class="letter"></li>`;
    }).join("");
    //enable keyboard buttons
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    //Hide the game modal
    gameModal.classList.remove("show");
}

//Function to get a random word and set up the game

const getRandomWord = () => {
    //picking a random word and hint from wordList array, where array is processed in code
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    //Set current word and update the hint
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    //call reset game function
    resetGame();
}

//Function to handle the end of game win or loose

const gameOver = (isVictory) => {
    //show the game over modal with win or loss
    const modalText = isVictory ? `You found the word` : 'The correct word was:';
    gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
}

//Creating a for loop to display our keyboard buttons

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    //adding a click event listener for each button
    button.addEventListener('click', (e) => initGame(e.target, String.fromCharCode(i)));
    
}

//Function to handle the game logic when a letter is clicked

const initGame = (button, clickedLetter) => {
    //checking if the clicked letter is in the currentWord
    if(currentWord.includes(clickedLetter)) {
        //Update the displayed letters if clicked is correct
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        //update wrong guess count and hangman image if letter guess is incorrect
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
    }
    //disable the clicked button so it can't be clicked again
    button.disabled = true;

    //update the displayed guesscount
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    //check if the game should end based on win or loose conditions
    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);

}

//Starting the game with a random word

getRandomWord();

//add event listener for the play again button

playAgainBtn.addEventListener("click", getRandomWord);
