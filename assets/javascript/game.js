// Array of Chemical Engineering Hangman Words
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

// Random Hangman Word Selector Function
function randomWordSelector() {
	var randomArrayIndex = Math.floor(Math.random()*hangmanWords.length);
	var randomWord = hangmanWords[randomArrayIndex];
	// Deletes word from Array
	hangmanWords.splice(randomArrayIndex, 1);
	return randomWord;
}

// Outputs Random Word Out To HTML
function hiddenWord() {
	var wordLength = randomWord.length;
	var word = document.getElementById("word");

	for (var i = 0; i < wordLength; i++) {
		word.innerHTML += "<span class='span' id='s" + i + "'></span>";
	}
}

var wins = 0;
var loss = 0;
var score = "";
var guesses = 8;
var randomWord = randomWordSelector();

document.getElementById("wins").innerHTML = wins;
document.getElementById("loss").innerHTML = loss;


hiddenWord();
	
// When Key is Pressed
// document.onkeyup = function letterCheck(event) {
// 	var counter = 0;
// 	var lettersUsed = [];
// 	var guessedLetter = event.key;
// 	lettersUsed.push(guessedLetter);

// 	for (var y = 0; y < lettersUsed.length; y++) {
// 		if (guessedLetter === lettersUsed[i])
// 	}


// 	for (var y = 0; y < randomWord.length; y++) {
// 		if (guessedLetter.toLowerCase() === randomWord.charAt(y)) {
// 			document.getElementById("s" + y).style.border = 0;
// 			document.getElementById("s" + y).innerHTML = guessedLetter.toLowerCase();	
// 		} else {
// 			counter += 1;
// 		}
// 	}

// 	if (counter === randomWord.length) {
// 		guesses = guesses - 1;
// 	}
	
// }

var lettersUsed = [];

document.onkeyup = function letterCheck(event) {
	var counter = 0;
	var hasLetterBeenUsed = false;
	var guessedLetter = event.key;

	// Checks to see if letter has already been guessed
	for (var y = 0; y < lettersUsed.length; y++) {
		if (guessedLetter === lettersUsed[y]) {
			hasLetterBeenUsed = true;
		}
	}

	// Searches for letter in hangman word
	if (hasLetterBeenUsed === false) {
		// Add letter to lettersUsed array
		lettersUsed.push(guessedLetter);
		for (var y = 0; y < randomWord.length; y++) {
			// If letter matches, remove blank underline, add letter
			if (guessedLetter.toLowerCase() === randomWord.charAt(y)) {
				document.getElementById("s" + y).style.border = 0;
				document.getElementById("s" + y).innerHTML = guessedLetter.toLowerCase();
			// If no match with letter, counter should equal length of hangman word
			} else {
				counter += 1;
			}
		}
	}

	// Remove a guess if no match
	if (counter === randomWord.length) {
		guesses = guesses - 1;
	}
}