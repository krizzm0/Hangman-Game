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

	return randomWord
}

var randomWord = randomWordSelector();

// Outputs Random Word Out To HTML
function span() {
	var wordLength = randomWord.length;
	var paragraph = document.getElementById("word");

	for (var i = 0; i < wordLength; i++) {
		paragraph.innerHTML += "<span class='letters'>" + randomWord.charAt(i) + "</span>";
	}
}
span();