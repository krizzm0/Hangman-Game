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

// Random Hangman Word Selector
function randomWordSelector() {
	var randomArrayIndex = Math.floor(Math.random()*hangmanWords.length);
	var randomWord = hangmanWords[randomArrayIndex];
	// Deletes word from Array
	hangmanWords.splice(randomArrayIndex, 1);
}

// Adding Random Word to HTML
function IDK() {
	document.getElementById("blank").textContent = randomWord;
	
}