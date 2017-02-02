/*
*Developer:Khoi Nguyen
*Date: 1/29/2017
*UCSD Code Bootcamp: Homework #3
*/
//variable declarations
var wordlist = ["Princess","supernintendo", "sega", "Nintendo", "gameboy","Mario","Bowser",
"Princess", "Sonic", "Khoi", "Cplusplus", "java", "coffee", "car", "Bootcamp", "StackOverflow"];
var rndmWord;
var userGuess;
var guessed = [];
var copyOfGuessed = [];
var noRepeatGuessed = [];
var wrongGuesses = [];
var displayArr = [];
var nextRoundFlag = false;
var lives = 15;
var wins = 0;
var winFlag = false;
//setup the initial display screen for a new game.
function startDisplay() {
	rndmWord = wordlist[Math.floor(Math.random() * wordlist.length)];
	console.log("Try to guess: " + rndmWord);
	for(var i = 0; i < rndmWord.length; i++) {
		displayArr.push("_");
	}
	//display initial blank word.
	document.getElementById("currentLetter").innerHTML = displayArr.join(" ");
	//display starting lives.
	document.getElementById("lives").innerHTML = lives;
}
//copyArr takes in desired array as argument and returns a copy.
function copyArr(inputArr) {
	var temp = [];
	for (var i =0; i < inputArr.length; i++) {
		temp[i] = inputArr[i];
	}
	return temp;
}
//take in two arr args and returns an array with no repeated chars.
function filterRepeat(inputArr,filterArr) {
	var counter = 0;
	//nested for loop to compare two arrays.
	for (var i = 0; i < inputArr.length; i++) {
		for(var j = 0; j < filterArr.length; j++) {
			if(inputArr[i] === filterArr[j]) {
				counter++;
			}
			/*if greater than 1, then encountered a repeat, remove char a
			current index using splice() method.*/
			if(counter > 1) {
				//array method splice to delete object at specified index.
				filterArr.splice(j,1);
				counter = 0;
			}
		}
		//reset the counter
		counter = 0;		
	}
	return filterArr;
}
/*two arr args and delets indexes with correct gusses. Leaving only wrong guesses. 
Returns the nubmer of wrong guesses.*/
function numOfWrongGuesses(disArr, wrongArr) {
	for (var i = 0; i < disArr.length; i++) {
		for(var j = 0; j < wrongArr.length; j++) {
			//if found a matching guess splice it out to leave only wrong data set.
			if(disArr[i].toLowerCase() === wrongArr[j]) {
				wrongArr.splice(j,1);
			}
		}
	}
	return wrongArr.length;
}
//displays the stick figure hangman to the DOM accorindingly with decrementing lives.
function beginHanging(num) {
	switch(num) {
    case 6:
        document.getElementById("stick").innerHTML = "<img src='assets/images/stage_0.png'/>";
        break;
    case 5:
        document.getElementById("stick").innerHTML = "<img src='assets/images/stage_1.png'/>";
        break;
    case 4:
        document.getElementById("stick").innerHTML = "<img src='assets/images/stage_2.png'/>";
        break;
    case 3:
        document.getElementById("stick").innerHTML = "<img src='assets/images/stage_3.png'/>";
        break;
    case 2:
        document.getElementById("stick").innerHTML = "<img src='assets/images/stage_4.png'/>";
        break;
    case 1:
        document.getElementById("stick").innerHTML = "<img src='assets/images/stage_5.png'/>";
        break;
    case 0:
        document.getElementById("stick").innerHTML = "<img src='assets/images/stage_6.png'/>";
        break;
    default:
        console.log("");
	}
}
//function takes in two arr params and compares if the two arr are equal.
function didWin(disArr, word) {
    //cycle through word array and check if there are any mismatches. If so, did not win, else, won.
    for (var i = 0, len = word.length; i < len; i++){
        if (disArr[i] !== word[i]){
            return false;
        }
    }
    return true;  
}
//erase all contents and reset the game for next round.
function resetGame () {
	len1 = guessed.length;
	len2 = copyOfGuessed.length;
	len3 = noRepeatGuessed.length;
	len4 = displayArr.length;
	for (var i = 0; i < len1; i++) {
		guessed.pop();
	}
	for (var i = 0; i < len2; i++) {
		copyOfGuessed.pop();
	}
	for (var i = 0; i < len3; i++) {
		noRepeatGuessed.pop();
	}
	for (var i = 0; i < len4; i++) {
		displayArr.pop();
	}
	lives = 13;						//resetting the lives
}
//function called after the page fully loads from HTML file.	
function loadingIsDone() {
	//screen setup for game.
	startDisplay();
	//keystroke event detect function.
	document.onkeyup = function(event) {
		userGuess = event.key;
	  	//Current Word display and user input detection.
		if(userGuess.match(/^[a-z]$/)) {
			//only push valid lowercase letter guesses into guessed arr.
			guessed.push(userGuess);
		  	for(var i = 0; i< rndmWord.length; i++) {
				if (userGuess === rndmWord[i].toLowerCase()) {
					displayArr[i] = rndmWord[i];
				}
			}
		}
		else if(userGuess.match(/^[A-Z]$/)){
			alert("You have your Capslock ON, please turn OFF.");
		}
		else {
			alert("Please enter a valid lowercase letter.")
		}
		//checking if user has guessed the correct word and increment win number on page.
		if (didWin(displayArr, rndmWord)) {
			wins++;
			document.getElementById("winNum").innerHTML = wins;
			resetGame();			
			startDisplay();
			document.getElementById("currentLetter").innerHTML = displayArr.join(" "); 
			document.getElementById("lives").innerHTML = lives;
			document.getElementById("noRepeat").innerHTML = noRepeatGuessed.join(" ");
		}			
		//make a copy of the user guessed array.
		copyOfGuessed = copyArr(guessed);
		//filter the user guessed array and rid of repeated characters.
		noRepeatGuessed = filterRepeat(guessed, copyOfGuessed);
		wrongGuesses = copyArr(noRepeatGuessed);
		//numOfWrongGuesses function returns wrong guesses thus far.
		lives = lives - numOfWrongGuesses(displayArr, wrongGuesses);	
		//start displaying hanging stick figures. Also, trigger next round.
		if(lives <= 7 && lives >= 0) {
			beginHanging(lives);
			if(lives === 0) {
				nextRoundFlag = true;
			}
		}
		else {	//display happy image when hanging process has not begun.
			document.getElementById("stick").innerHTML = "<img src='assets/images/happyGuy.png'/>";
		}
		if(nextRoundFlag) {
			resetGame();
			startDisplay();
			nextRoundFlag = false;
			document.getElementById("currentLetter").innerHTML = displayArr.join(" "); 
			document.getElementById("lives").innerHTML = lives;
			document.getElementById("noRepeat").innerHTML = noRepeatGuessed.join(" ");
			alert("You Lose, press Any Key to Play Again.");
		}			
		//Redisplaying contents onto the screen.
		document.getElementById("currentLetter").innerHTML = displayArr.join(" "); 
		document.getElementById("lives").innerHTML = lives;
		lives = 13;	//resetting lives.
		for(var i = 0; i < noRepeatGuessed.length; i++) {
			document.getElementById("noRepeat").innerHTML = noRepeatGuessed.join(" ");
		}
	};//end of event function
}//end of inputConditioning()	





