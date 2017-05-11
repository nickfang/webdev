//-------------------------------------------------------------------------------------------------------------------------
// Game Object
//-------------------------------------------------------------------------------------------------------------------------
class GameObject {
	constructor() {
		// not sure if this is right.  seems like a work around for implementing member variables.
		this.board = document.querySelector("#board");

		this.xPos = 1;
		this.yPos = 1;
		this.xLength = 3;
		this.yLength = 3;
		this.horizHighlight = true;

		this.createBoard();
	}

	createBoard() {
		const row = document.createElement("div");
		const iDiv = document.createElement("div");
		for (let x = 0; x < this.xLength; x++) {
			iDiv.className = `col-${x} tile`;
			row.appendChild(iDiv.cloneNode());
		}
		for (let y = 0; y < this.yLength; y++) {
			row.className = `row-${y} row`;
			this.board.appendChild(row.cloneNode(true));
		}

		this.sizeBoardElements();
		this.drawHighlights(this.getHorizHighlights());
		this.finishCursorMove();
	}

	addLetter(letter) {
		let cursor = this.prepCursorMove();
		cursor.innerHTML = letter;
		cursor.classList.add("highlight");
		if (this.horizHighlight) {
			++this.xPos > this.xLength - 1 ? this.increaseBoardSizeX() : "";
		} else {
			++this.yPos > this.yLength - 1 ? this.increaseBoardSizeY() : "";
		}
		this.finishCursorMove();
	}

	moveCursorLeft() {
		let cursor = this.prepCursorMove();
		this.horizHighlight ? cursor.classList.add("highlight") : "";
		--this.xPos < 0 ? (this.xPos = this.xLength-1) : "";
		if (!this.horizHighlight) {
			this.removeHighlights();
			this.drawHighlights(this.getVertHighlights());
		}
		this.finishCursorMove();
	}

	moveCursorUp() {
		let cursor = this.prepCursorMove();
		!this.horizHighlight ? cursor.classList.add("highlight") : "";
		--this.yPos < 0 ? (this.yPos = this.yLength-1) : "";
		if (this.horizHighlight) {
			this.removeHighlights();
			this.drawHighlights(this.getHorizHighlights());
		}
		this.finishCursorMove();
	}

	moveCursorRight() {
		let cursor = this.prepCursorMove();
		this.horizHighlight ? cursor.classList.add("highlight") : "";
		++this.xPos > this.xLength - 1 ? (this.xPos = 0) : "";
		if (!this.horizHighlight) {
			this.removeHighlights();
			this.drawHighlights(this.getVertHighlights());
		}
		this.finishCursorMove();
	}

	moveCursorDown() {
		let cursor = this.prepCursorMove();
		!this.horizHighlight ? cursor.classList.add("highlight") : "";
		++this.yPos > this.yLength - 1 ? (this.yPos = 0) : "";
		if (this.horizHighlight) {
			this.removeHighlights();
			this.drawHighlights(this.getHorizHighlights());
		}
		this.finishCursorMove();
	}

	rotateHighlights() {
		let highlights;
		this.horizHighlight = !this.horizHighlight;
		this.removeHighlights();
		this.horizHighlight ? highlights = this.getHorizHighlights() : highlights = this.getVertHighlights();
		this.drawHighlights(highlights);
	}

	backspace() {
		let cursor = this.prepCursorMove();
		cursor.classList.add("highlight");
		cursor.innerHTML = "";
		if (this.horizHighlight) {
			--this.xPos < 0 ? (this.xPos = this.xLength-1) : "";
		} else {
			--this.yPos < 0 ? (this.yPos = this.yLength-1) : "";
		}
		this.finishCursorMove();
	}

	delete() {
		let cursor = this.prepCursorMove();
		cursor.classList.add("highlight");
		cursor.innerHTML = "";
		if (this.horizHighlight) {
			++this.xPos > this.xLength-1 ? (this.xPos = 0) : "";
		} else {
			++this.yPos > this.yLength-1 ? (this.yPos = 0) : "";
		}
		this.finishCursorMove();
	}

	// remove outer rows and columns that are empty.
	shrinkBoard() {
		console.log("TODO: finish shrinkBoard()")
	}

	// internal functions

	// input: none
	// return: none
	// This will size each tile so that it is square and will fit on the screen
	sizeBoardElements() {
		const tiles = document.querySelectorAll(".tile");
		// the margin of the board is 10% on each side, so we subtract 20 from 100.
		// we subtract an additional 4% to account for the border on each tile.  4% gives enough buffer for 25 letters without compressing the width of each tile.
		// then we divide by whichever side has more tiles.
		var tileSideLength = (100 - 24) / Math.max(this.xLength, this.yLength);
		// determine what size to start the tiles at.
		tileSideLength > 14 ? tileSideLength = 14 : "";
		document.documentElement.style.setProperty(`--${"tile-width"}`, `${tileSideLength}vmax`);
		document.documentElement.style.setProperty(`--${"tile-height"}`, `${tileSideLength}vmax`);
		document.documentElement.style.setProperty(`--${"tile-line-height"}`, `${tileSideLength}vmax`);
		document.documentElement.style.setProperty(`--${"font-size"}`, `${tileSideLength * .6}vmax`);
	}

	// input: none
	// return: none
	// If a letter is pressed at the right side of the board, this is used to add a new column on the right side.
	increaseBoardSizeX() {
		const rows = document.querySelectorAll(".row");
		rows.forEach( (row, i) => {
			row.appendChild(row.lastChild.cloneNode());
			row.lastChild.classList = `col-${this.xLength} tile`;
			if (i === this.yPos) {
				row.lastChild.classList.add("highlight")
			}
		});
		this.xLength++;
		this.sizeBoardElements();
	}

	// input: none
	// return: none
	// If a letter is pressed at the bottom of the board, this is used to add a new row at the bottom.
	increaseBoardSizeY() {
		const newRow = document.createElement("div");
		const iDiv = document.createElement("div");
		for (let x = 0; x < this.xLength; x++) {
			iDiv.className = `col-${x} tile`;
			newRow.appendChild(iDiv.cloneNode());
		}
		newRow.classList = `row-${this.yLength} row`;
		gameObj.board.appendChild(newRow);
		this.yLength++;
		this.sizeBoardElements();
	}

	// input: none.  This function uses the globals xPos and yPos
	// return: div element that the current cursor is on.
	getCurrentCursorElement() {
		return document.querySelector(`.row-${this.yPos} .col-${this.xPos}`);
	}

	// input: none
	// reutrn: cursor - this is returned so that the calling function can update the highlight or innerHTML accordingly.
	prepCursorMove() {
		let cursor = this.getCurrentCursorElement();
		cursor.classList.remove("cursor");
		// return cursor element so that the calling function can move the cursor and draw highlights
		return cursor;
	}

	//input: none
	//return: none
	//This function is run after the xPos and yPos have been updated from a cursor move.
	//It also assumes that the highlights have been taken care of by the calling function.
	finishCursorMove() {
		// have to get the cursor element because the cursor has moved
		let cursor = this.getCurrentCursorElement();
		cursor.classList.remove("highlight");
		cursor.classList.add("cursor");
	}

	// input: highlights - array of tile level divs that will be highlighted
	// output: none.  This function adds class highlight to all the elemnts in the list highlights
	drawHighlights(highlights) {
		highlights.forEach( (item) => {
			// this check is here since it would be inefficient to go through the list to remove the element with class cursor
			// only to go through the list again to add the highlight class.
			// usually it's better to have these functions be more generic, but I feel like this is an exception.
			if (!item.classList.contains("cursor")) {
				item.classList.add("highlight");
			}
		});
	}

	// input: none.  This function uses the globals xPos and yPos
	// return: array of div elements in the same row as the cursor
	getHorizHighlights() {
		return document.querySelectorAll(`.row-${this.yPos} .tile`);
	}

	// input: none.  This function uses the globals xPos and yPos
	// return: array of div elements in the same col as the cursor
	getVertHighlights() {
		return document.querySelectorAll(`.col-${this.xPos}`);
	}

	//input: none.  Queries all the elemnts that has class highlight
	//output: none.  This function removes the class highlight from all elements found to contain it
	removeHighlights() {
		const highlights = document.querySelectorAll(".highlight");
		highlights.forEach( (item) => {
			item.classList.remove("highlight");
		});
	}

}


//-------------------------------------------------------------------------------------------------------------------------
// Simulate what the server will provide.
//-------------------------------------------------------------------------------------------------------------------------
// - letters transfer all the letters at the beginning of the game, only parse them out when signaled by server (should figure how to hide this array)
// 	- I could shuffle the array locally before passing the next two letters, so konwing all the letters beforehand won't help them formulate a way to quickly complete their board at each turn.
//		- If I have the server validate the board, I can send a message to the other players that a validation is pending.  This will add a lot of server calls an probably can't be implemented unless I can make money off this game somehow.  For now, I need to stay under the limit for free aws server usage
// - notification when someone has filled out their board and adds more letters to your word bank
// - notification when the game is over
// - somewhere to recieve a notification that you have filled out your board.
// - check a filled out board (not sure if I should do this locally) I think I should to keep the server from being spammed.
//

class SimulateServer {
	constructor() {
		// {	"a":6,  "b":1, "c":2, "d":4, "e":13, "f":1, "g":5, "h":3, "i":9,
		// 	"j":1,  "k":1, "l":4, "m":1, "n":7,  "o":6, "p":2, "q":1, "r":7,
		// 	"s":10, "t":6, "u":3, "v":1, "w":1,  "x":1, "y":1, "z":1, "*":2  }
		this.numPlayers = 4;
		this.numLetters = 100;
		this.letters = ["a", "a", "a", "a", "a", "a", "b", "c", "c", "d", "d", "d", "d", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e",
					 "e", "f", "g", "g", "g", "g", "g", "h", "h", "h", "i", "i", "i", "i", "i", "i", "i", "i", "i", "j", "k", "l", "l", "l", "l",
					 "m", "n", "n", "n", "n", "n", "n", "n", "o", "o", "o", "o", "o", "o", "p", "p", "q", "r", "r", "r", "r", "r", "r", "r", "s",
					 "s", "s", "s", "s", "s", "s", "s", "s", "s", "t", "t", "t", "t", "t", "t", "u", "u", "u", "v", "w", "x", "y", "z", "*", "*"];
	}

	getLetters() {
		let returnLetters = [];
		let numLetters = this.getNumLetters();
		this.shuffleLetters();
		for (let i = 0; i < numLetters; i++) {
			returnLetters.push(this.letters.pop());
		}
		return returnLetters;
	}

	shuffleLetters() {
		for (let numShuffles = 0; numShuffles < 3; numShuffles++) {
			for (let x = 0; x < this.letters.length; x ++) {
				let y = Math.random() * this.numLetters;
				// splicing out element y from the array, adding element x in it's place and taking the first element in the returned array containing element y to assign to x.
				this.letters[x] = this.letters.splice(y, 1, this.letters[x])[0];
			}
		}
	}

	getNumLetters() {
		// make sure we don't try to return more letters than there are.
		return Math.floor(this.numLetters / this.numPlayers);
	}
};


//-------------------------------------------------------------------------------------------------------------------------
// Event Listeners
//-------------------------------------------------------------------------------------------------------------------------

function keyHandler(e){
	// TODO:  This isn't needed for everything, so maybe just put it in the if statements that it's needed in?
	const cursor = gameObj.getCurrentCursorElement();
	// Arrow Keys handler
	if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
		switch(e.keyCode) {
			case 37:	// left button
				gameObj.moveCursorLeft();
				break;
			case 39:	// right button
				gameObj.moveCursorRight();
				break;
			case 38:	// up button
				gameObj.moveCursorUp()
				break;
			case 40:	// down butt
				gameObj.moveCursorDown();
				break;
			default:
				console.log("ALERT!! Got into arrow handler with non arrow key!");
				break;
		}
	}

	// Spacebar handler
	// spacebar: 32
	if (e.keyCode === 32) {
		gameObj.rotateHighlights();
	}

	// Letter handler
	// [a..z]: [65..90]
	if (e.keyCode >= 65 && e.keyCode <= 90) {
		const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
		const letter = letters[e.keyCode-65];

		// first check if there is already a letter on the tile so we can put it back in the letterBank
		if (cursor.innerHTML !== "") {
			if  (cursor.innerHTML === letter) {
				// if the tile already contains the letter pressed, just call addLetter with same letter
				gameObj.addLetter(letter);
			}else if (checkLetter(letter)) {
				// otherwise, make sure the letter is ok and update lettersForBank display it.
				lettersForBank.push(cursor.innerHTML);
				displayLetters(lettersForBank);
				gameObj.addLetter(letter);
			}  // if there is already a letter in the tile and the letter pressed is not the same letter or is not in the letter bank, do nothing
		} else if (checkLetter(letter)) {
			// the tile is blank so we just need to check the pressed letter is in the letter bank and update the letter bank and set the tile with the letter
			displayLetters(lettersForBank);
			gameObj.addLetter(letter);
		}
		// if check letter fails, do nothing.
	}

	//Backspace handler
	//backspacd: 8
	if (e.keyCode === 8) {
		if (cursor.innerHTML !== "") {
			lettersForBank.push(cursor.innerHTML);
			displayLetters(lettersForBank);
		}
		gameObj.backspace();
	}

	// TODO: not sure if I want this.
	// Delete handler
	// delete: 46
	if (e.keyCode === 46) {
		if (cursor.innerHTML !== "") {
			lettersForBank.push(cursor.innerHTML);
			displayLetters(lettersForBank);
		}
		gameObj.delete();
	}

	// TODO: implement checking that a board is filled out with real words.
	// Enter handler
	// enter: 13
	if (e.keyCode === 13) {
		validateBoard();
	}

	// TODO: handle * key
}

function preventKeyScrolling(e) {
	switch(e.keyCode) {
		case 37: case 38: case 39: case 40: 	// catch arrow keys
		case 32: e.preventDefault(); break;		// and catch spacebar
		default: break;								// allow everything else.
	}
}

function checkLetter(letter) {
	let index = lettersForBank.indexOf(letter);
	if (index > -1) {
		lettersForBank.splice(index, 1);
		return true;
	}
	return false;
}

function displayLetters(arr) {
	letterBank.innerHTML = arr.join(" | ");

}


// TODO: implement moving the cursor by clicking the mouse.
// TODO: figure out if I should use keypress event instead.  I think I need to since I'm using the * (56) character
window.addEventListener('keyup', keyHandler);
window.addEventListener('keydown', preventKeyScrolling);

const gameObj = new GameObject();
const simServ = new SimulateServer();

//-------------------------------------------------------------------------------------------------------------------------
// Local
//-------------------------------------------------------------------------------------------------------------------------
// - Not sure if I should keep the letters in gameObj.  I think this will become more clear when I have it more fleshed out.

const letterBank = document.querySelector("#letters");
var lettersFromServer = simServ.getLetters();
var lettersForBank = lettersFromServer.splice(0,5);
displayLetters(lettersForBank);

function validateBoard() {
	let boardValid = true;
	// if the board is valid and there are more letters left, add more letters to the bank
	// if the board is valid and there are not more letters left, then check with server to see if you won
	// if the board is not valid, give a warning.
	if (boardValid) {
		if (lettersFromServer.length > 1) {
			// Have to assign letters so we don't lose track of the letters in the bank.
			// Maybe move the letterbank into an object.
			lettersForBank = lettersForBank.concat(lettersFromServer.splice(0,2));
			displayLetters(lettersForBank);
		} else {
			console.assert("Game Over!");
		}
	}
}


