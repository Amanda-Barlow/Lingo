const buttonElements = document.querySelectorAll("button");
let row = 1;
let letter = 1;
let player1Score = 0;
let player2Score = 0;

const wordList = ["about", "abide", "rough", "enjoy", "quiet", "worse", "basic", "avoid", "smart", "craft", "enjoy", "brave", "blast", "vital", "boast", "broad", "upset", "worse",
"right", "avoid", "angry", "stare", "elbow", "argue", "share", "close", "funky", "rapid", "tired", "hardy", "ideal", "grand"]
const wordForTheDay = wordList[Math.floor(Math.random()*wordList.length)];
console.log (wordForTheDay)
const wordElements = document.querySelectorAll(".wordRow");
let gameOver = false;
let guessedCorrectly = false;

// Create event listener for buttons
buttonElements.forEach((element) => {
    element.addEventListener("click", function() {
    keypress(element.attributes["data-key"].value)
    }); 
});

function populateWord(key) {
    if (letter < 6) {
    wordElements[row - 1].querySelectorAll(".word")[letter - 1].innerText = key;
    letter += 1;
    }
}

// Set up the function to check the word
function checkWord() {
    const letterElements = wordElements[row - 1].querySelectorAll(".word");
    let numOfCorrect = 0;

    letterElements.forEach((element, index) => {
        const indexOfLetterInWordOfTheDay = wordForTheDay.indexOf
        (element.innerText.toLowerCase());

// Check if the letter is correct, change colors of box to alert the user        
        if(indexOfLetterInWordOfTheDay === index) {
            numOfCorrect += 1;
        element.classList.add("word-green");    
        document.getElementById('player1Score').innerText = player1Score += 10;
        } else if (indexOfLetterInWordOfTheDay >= 0){
        element.classList.add("word-yellow");
        document.getElementById('player2Score').innerText = player2Score += 5;    
        } else {
            element.classList.add("word-red");
            document.getElementById('player2Score').innerText = player2Score += 10;
        }
    });

// Compare the number of correct letters, if 5 are correct, player wins, alert player, 
// if not correct after 5 tries end game.
    if(numOfCorrect === 5){
        gameOver = true; 
        guessedCorrectly = true;
        alert("Congrats!  You have solved the Lingo!  Player 1 Wins!");   
        document.getElementById('player1Score').innerText = player1Score += 1000;
        console.log(player1Score)
    } else if (row === 6){
        gameOver = true;
        alert("Player 2 Wins!" + " The word was " + wordForTheDay)
        document.getElementById('player2Score').innerText = player2Score += 1000;
        } 
    }


//Notice when there isn't enough letters and alert player
function enterWord() {
    if(letter < 6) {
        alert("Not enough letters");
    } else {
        checkWord()
        row += 1;
        letter = 1;
    }
}

// Make it so the delete button works
function deleteLetter(){
    const letterElements = wordElements[row -1].querySelectorAll(".word");

    for (let index = letterElements.length - 1; index >= 0; index--) {
        const element = letterElements[index];
        if(element.innerText !== "") {
            element.innerText = "";
            letter -= 1;
            break;
        }
    }
}
function keypress(key) {
    if(!gameOver){
    if(key.toLowerCase() === "enter") {
        enterWord();
    } else if (key.toLowerCase() === "dlt") {
        deleteLetter();
    } else {
        populateWord(key);
    }

// Tell player that the game is over
} else {
    alert("Game over! Please try again" + " The word was " + wordForTheDay)
    }
}

// Add a restart button
document.querySelector('.restart-btn').addEventListener('click', function(){
    window.location.reload();
    return false;
  });
