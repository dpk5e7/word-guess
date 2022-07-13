var wordToGuess = document.querySelector("#wordToGuess");
var remainingLetters = document.querySelector("#remainingLetters");
var timeRemaining = document.querySelector("#timeRemaining");
var startButton = document.querySelector("#startButton");
var resetButton = document.querySelector("#resetButton");
var userWins = document.querySelector("#userWins");
var userLosses = document.querySelector("#userLosses");

const alphabet = "abcdefghijklmnopqrstuvwxyz";
let selectedWord = "";

var usrRecord = {
  wins: 0,
  losses: 0,
};

var timeLeft = 30;
var timeInterval;

startButton.addEventListener("click", function (event) {
  event.preventDefault();

  // Clear timer & refresh remaining letters
  remainingLetters.textContent = alphabet;
  timeRemaining.textContent = "";

  // Select a word
  selectedWord = selectRandomWord();
  wordToGuess.textContent = "";
  for (let i = 0; i < selectedWord.length; i++) {
    wordToGuess.textContent += "_";
  }

  // Start Timer
  timeLeft = 30;
  timeInterval = setInterval(function () {
    timeRemaining.textContent =
      "Time Remaining: " + timeLeft + " seconds remaining.";

    if (timeLeft === 0) {
      timeRemaining.textContent = "You lose!";

      // Stops execution of action at set interval
      clearInterval(timeInterval);
      // Calls function to display user record
      usrRecord.losses++;
      localStorage.setItem("usrRecord", JSON.stringify(usrRecord));
      displayWinLossRecord();
    }
    timeLeft--;
  }, 1000);
});

function selectRandomWord() {
  var words = [
    "Apple",
    "Apricot",
    "Avocado",
    "Banana",
    "Blackberry",
    "Blueberry",
    "Boysenberry",
    "Cherry",
    "Coconut",
    "Elderberry",
    "Grape",
    "Raisin",
    "Grapefruit",
    "Huckleberry",
    "Kiwi",
    "Kumquat",
    "Lemon",
    "Lime",
    "Mango",
    "Melon",
    "Cantaloupe",
    "Watermelon",
    "Nectarine",
    "Orange",
    "Peach",
    "Pear",
    "Plum",
    "Pineapple",
    "Raspberry",
    "Strawberry",
  ];
  return words[Math.floor(Math.random() * words.length)].toLowerCase();
}

function keydownAction(event) {
  // if timer is running.
  if (timeLeft > 0) {
    // if in "abcdefghijklmnopqrstuvwxyz", remove from remaining letters
    let lowerKey = event.key.toLowerCase();
    if (alphabet.indexOf(lowerKey) != -1) {
      if (remainingLetters.textContent.indexOf(lowerKey) != -1) {
        remainingLetters.textContent = remainingLetters.textContent.replace(
          lowerKey,
          "_"
        );
      }
    }

    // Find the letter in wordToGuess
    var indexLowerKey = selectedWord.indexOf(lowerKey);
    let newWord = "";
    if (indexLowerKey != -1) {
      for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === lowerKey) {
          newWord += lowerKey;
        } else {
          newWord += wordToGuess.textContent.charAt(i);
        }
      }
      wordToGuess.textContent = newWord;

      // Was it the last letter?  If so, stop timer and update record
      if (newWord.indexOf("_") == -1) {
        clearInterval(timeInterval);
        timeRemaining.textContent = "You win!";
        usrRecord.wins++;
        localStorage.setItem("usrRecord", JSON.stringify(usrRecord));
        displayWinLossRecord();
      }
    }
  }
}
document.addEventListener("keydown", keydownAction);

function displayWinLossRecord() {
  if (localStorage.getItem("usrRecord") != null) {
    usrRecord = JSON.parse(localStorage.getItem("usrRecord"));
    userWins.textContent = usrRecord.wins;
    userLosses.textContent = usrRecord.losses;
  } else {
    userWins.textContent = 0;
    userLosses.textContent = 0;
  }
}

resetButton.addEventListener("click", function (event) {
  event.preventDefault();
  localStorage.clear();
  usrRecord.wins = 0;
  usrRecord.losses = 0;
  displayWinLossRecord();
});

function init() {
  displayWinLossRecord();
}
init();
