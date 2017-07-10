// ==========================================================================================
// FUNCTIONS

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

//--- Checks if guessed letter is correct or not ---//
document.onkeyup = function letterCheck(event) {
	var counter = 0;
	var hasLetterBeenUsed = false;
	var guessedLetter = event.key;
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
	// Update the Guess Letters section and number of guesses left
	updateGuessedLetters();
	document.getElementById("guesses").innerHTML = guesses;
}
// ==========================================================================================
// VARIABLES

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
	"kelvin"
];

var wins = 0;
var loss = 0;
var score = "";
var guesses = 8;
var hangmanWord = randomWordSelector();
// ==========================================================================================
document.getElementById("wins").innerHTML = wins;
document.getElementById("loss").innerHTML = loss;

hideHangmanWord();