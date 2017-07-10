// ==========================================================================================
// FUNCTIONS

//--- Updates User Score ---//
function updateScore() {
	var score = document.getElementById("score");
	score.innerHTML = (( wins / (wins + loss) ).toFixed(2) * 100) + "%";
}

//-- Updates Wins and Loss Stats --//
function updateWinsLoss() {
	document.getElementById("wins").innerHTML = wins;
	document.getElementById("loss").innerHTML = loss;
}

//--- Updates the number of guesses left in HTML ---//
function updateGuessesLeft() {
		document.getElementById("guesses").innerHTML = guesses;
	}

//--- Resets the number of guesses back to 8 ---//
function resetGuesses() {
	guesses = 8;
}

//--- Selects random hangman word from Hangman Words Array ---//
function randomWordSelector() {
	var randomArrayIndex = Math.floor(Math.random()*hangmanWords.length);
	var hangmanWord = hangmanWords[randomArrayIndex];
	// Removes word from Hangman Words Array
	hangmanWords.splice(randomArrayIndex, 1);
	return hangmanWord;
}

//--- Hides the hangman word on the website ---//
function hideHangmanWord() {
	var wordLength = hangmanWord.length;
	var underlineLetter = document.getElementById("underlineLetter");
	underlineLetter.innerHTML = "";
	for (var i = 0; i < wordLength; i++) {
		underlineLetter.innerHTML += "<span class='span' id='s" + i + "'></span>";
	}
}

//--- Updates the Letters Guessed section on website ---//
function updateGuessedLetters() {
	// Wrong Letters Array is refreshed and updated...
	refreshWrongLettersArray();
	// Grabs, clears, and updates Guessed Section
	div = document.getElementById("lettersGuessedSection");
	div.innerHTML = " ";
	for (y = 0; y < WrongLettersArray.length; y++) {
		div.innerHTML += WrongLettersArray[y].toLowerCase() + " ";
	}
}

//--- Refreshes the Wrong Letters Array ---//
function refreshWrongLettersArray() {
	// Temporary Array
	var tempArray = [];
	// Every guessed letter...
	for (y = 0; y < everyGuessedLetter.length; y++) {
		// ...is set to be sent to the Temporary Array
		var putInArray = true;
		// BUT if guessed letter is found in Hangman Word...
		for (x = 0; x < hangmanWord.length; x++) {
			// ...do not add to Temporary Array
			if (everyGuessedLetter[y].toLowerCase() === hangmanWord.charAt(x).toLowerCase()) {
				putInArray = false;
			}
		}
		// Letters in Temporary Array are now the wrong guesses
		if ( putInArray === true ) {
			tempArray.push(everyGuessedLetter[y].toLowerCase());
		}
	}
	// Duplicated letters in Temporary Array removed and added to the Wrong Letters Array
	WrongLettersArray = tempArray.filter( 
		function (elem, index, self) {
    		return index == self.indexOf(elem);
		}
	)
}

//--- Keeps track of when the game will be over---///
function scoreTracker() {
	var numOfCorrectLetters = document.querySelectorAll("#underlineLetter .check").length;
	// If user was unable to guess the word, user loses
	if (guesses === 0) {
		loss += 1;
		hangmanWord = randomWordSelector();
		everyGuessedLetter = [];
		WrongLetterArray = [];
		hideHangmanWord();
		updateGuessedLetters();
		resetGuesses();
		updateGuessesLeft();
		updateWinsLoss();
		updateScore();
	}
	// If user was able to guess word, user wins
	if (numOfCorrectLetters === hangmanWord.length) {
		wins += 1;
		hangmanWord = randomWordSelector();
		everyGuessedLetter = [];
		WrongLetterArray = [];
		waitingForEnter = true;
		document.getElementById("dialogue").innerHTML = "Congratulations, you got the word!!</p><p>Press ENTER to conintue.</p>";
	}
}
// ==========================================================================================
// VARIABLES

var waitingForEnter = false;
var everyGuessedLetter = [];
var WrongLettersArray = [];
var hangmanWords = [
	"fugacity",
	"thermodynamics",
	"chemicals",
	"distillation",
	"adiabatic",
	"ionization",
	"joule",
	"kelvin" ];

var alphabetLetters = [
	"a", "b", "c", "d", "e", "f", "g",
	"h", "i", "j", "k", "l", "m", "n",
	"o", "p", "q", "r", "s", "t", "u",
	"v", "w", "x", "y", "z" ];

var wins = 0;
var loss = 0;
var score = "";
var guesses = 8;
var hangmanWord = randomWordSelector();
// ==========================================================================================
updateWinsLoss();
hideHangmanWord();

//--- Checks if guessed letter is correct or not ---//
document.onkeyup = function letterCheck(event) {
	var counter = 0;
	var hasLetterBeenUsed = false;
	var guessedLetter = event.key;
	for (var t = 0; t < alphabetLetters.length; t++) {
		if ( (event.key.toLowerCase() === alphabetLetters[t]) && (waitingForEnter === false) ) {
			document.getElementById("instruction").innerHTML = "";
			// Checks to see if guessed letter has already been guessed
			for (var y = 0; y < everyGuessedLetter.length; y++) {
				// If already guessed, do nothing
				if (guessedLetter.toLowerCase() === everyGuessedLetter[y].toLowerCase() ) {
					hasLetterBeenUsed = true;
				}
			}
			// If the guessed letter has not already been guessed...
			if (hasLetterBeenUsed === false) {
				// ...then add it to the Guessed Letter Array...
				everyGuessedLetter.push(guessedLetter.toLowerCase());
				// ... and then compare to every letter in the hangman word
				for (var y = 0; y < hangmanWord.length; y++) {
					// If letter matches, remove blank underline and add letter...
					if (guessedLetter.toLowerCase() === hangmanWord.charAt(y)) {
						document.getElementById("s" + y).className += " check";
						document.getElementById("s" + y).style.border = 0;
						document.getElementById("s" + y).innerHTML = guessedLetter.toLowerCase();
					// ...else if no match, increase counter
					} else {
						counter += 1;
					}
				}
			}
			// If guessed letter does not match, counter equals length of hangman word and guess count decreases
			if (counter === hangmanWord.length) {
				guesses = guesses - 1;
			}
			updateGuessedLetters();
			updateGuessesLeft();
			scoreTracker();
		}
	}
	// Awaiting for user to press 'Enter' once a word is guessed correctly to move on
	if ( (event.key == "Enter") && (waitingForEnter === true) ) {
		document.getElementById("dialogue").innerHTML = "";
		hideHangmanWord();
		updateGuessedLetters();
		resetGuesses();
		updateGuessesLeft();
		updateWinsLoss();
		updateScore();
		waitingForEnter = false;
	}
}