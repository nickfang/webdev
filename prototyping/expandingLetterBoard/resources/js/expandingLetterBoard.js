const gameObj = {
	board: document.querySelector("#board"),

	xPos: 0,
	yPos: 0,
	xLength: 3,
	yLength: 3,
	horizHighlight: true,

	createBoard: function() {
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

		this.sizeTiles();

		this.drawHighlights(this.getHorizHighlights());
		this.finishCursorMove();
	},

	addLetter: function(letter) {
		let cursor = this.prepCursorMove();
		cursor.innerHTML = letter;
		cursor.classList.add("highlight");
		if (this.horizHighlight) {
			++this.xPos > this.xLength - 1 ? this.increaseBoardSizeX() : "";
		} else {
			++this.yPos > this.yLength - 1 ? this.increaseBoardSizeY() : "";
		}
		this.finishCursorMove();
	},

	moveCursorLeft: function() {
		let cursor = this.prepCursorMove();
		this.horizHighlight ? cursor.classList.add("highlight") : "";
		--this.xPos < 0 ? (this.xPos = this.xLength-1) : "";
		if (!this.horizHighlight) {
			this.removeHighlights();
			this.drawHighlights(this.getVertHighlights());
		}
		this.finishCursorMove();
	},

	moveCursorUp: function() {
		let cursor = this.prepCursorMove();
		!this.horizHighlight ? cursor.classList.add("highlight") : "";
		--this.yPos < 0 ? (this.yPos = this.yLength-1) : "";
		if (this.horizHighlight) {
			this.removeHighlights();
			this.drawHighlights(this.getHorizHighlights());
		}
		this.finishCursorMove();
	},

	moveCursorRight: function() {
		let cursor = this.prepCursorMove();
		this.horizHighlight ? cursor.classList.add("highlight") : "";
		++this.xPos > this.xLength - 1 ? (this.xPos = 0) : "";
		if (!this.horizHighlight) {
			this.removeHighlights();
			this.drawHighlights(this.getVertHighlights());
		}
		this.finishCursorMove();
	},

	moveCursorDown: function() {
		let cursor = this.prepCursorMove();
		!this.horizHighlight ? cursor.classList.add("highlight") : "";
		++this.yPos > this.yLength - 1 ? (this.yPos = 0) : "";
		if (this.horizHighlight) {
			this.removeHighlights();
			this.drawHighlights(this.getHorizHighlights());
		}
		this.finishCursorMove();
	},

	rotateHighlights: function() {
		let highlights;
		this.horizHighlight = !this.horizHighlight;
		this.removeHighlights();
		this.horizHighlight ? highlights = this.getHorizHighlights() : highlights = this.getVertHighlights();
		this.drawHighlights(highlights);
	},

	backspace: function() {
		let cursor = this.prepCursorMove();
		cursor.classList.add("highlight");
		cursor.innerHTML = "";
		if (this.horizHighlight) {
			--this.xPos < 0 ? (this.xPos = this.xLength-1) : "";
		} else {
			--this.yPos < 0 ? (this.yPos = this.yLength-1) : "";
		}
		this.finishCursorMove();
	},

	// remove outer rows and columns that are empty.
	shrinkBoard: function() {
		console.log("TODO: finish shrinkBoard()")
	},

	// internal functions

	// input: none
	// return: none
	// This will size each tile so that it is square and will fit on the screen
	sizeTiles: function() {
		// TODO: scale the font as well
		const tiles = document.querySelectorAll(".tile");
		const tileSideLength = Math.floor((100 - 20 /* board margin is 10% on each side */) / Math.max(gameObj.xLength, gameObj.yLength));
		// // TODO: make this into a css variable, so it's not a style in html.
		tiles.forEach( (tile) => {
			tile.style.width = `${tileSideLength}vw`
			tile.style.height = `${tileSideLength}vw`
		});

	},

	// input: none
	// return: none
	// If a letter is pressed at the right side of the board, this is used to add a new column on the right side.
	increaseBoardSizeX: function() {
		const rows = document.querySelectorAll(".row");
		rows.forEach( (row, i) => {
			row.appendChild(row.lastChild.cloneNode());
			row.lastChild.classList = `col-${this.xLength} tile`;
			if (i === this.yPos) {
				row.lastChild.classList.add("highlight")
			}
		});
		this.xLength++;
		this.sizeTiles();
	},

	// input: none
	// return: none
	// If a letter is pressed at the bottom of the board, this is used to add a new row at the bottom.
	increaseBoardSizeY: function() {
		const newRow = document.createElement("div");
		const iDiv = document.createElement("div");
		for (let x = 0; x < this.xLength; x++) {
			iDiv.className = `col-${x} tile`;
			newRow.appendChild(iDiv.cloneNode());
		}
		newRow.classList = `row-${this.yLength} row`;
		gameObj.board.appendChild(newRow);
		this.yLength++;
		this.sizeTiles();
	},


	// input: none.  This function uses the globals xPos and yPos
	// return: div element that the current cursor is on.
	getCurrentCursorElement: function() {
		return document.querySelector(`.row-${this.yPos} .col-${this.xPos}`);
	},

	// input: none
	// reutrn: cursor - this is returned so that the calling function can update the highlight or innerHTML accordingly.
	prepCursorMove: function() {
		let cursor = this.getCurrentCursorElement();
		cursor.classList.remove("cursor");
		return cursor;
	},

	//input: none
	//return: none
	//This function is run after the xPos and yPos have been updated from a cursor move.
	//It also assumes that the highlights have been taken care of by the calling function.
	finishCursorMove: function() {
		cursor = this.getCurrentCursorElement();
		cursor.classList.remove("highlight");
		cursor.classList.add("cursor");
	},

	// input: highlights - array of tile level divs that will be highlighted
	// output: none.  This function adds class highlight to all the elemnts in the list highlights
	drawHighlights: function(highlights) {
		highlights.forEach( (item) => {
			// this check is here since it would be inefficient to go through the list to remove the element with class cursor
			// only to go through the list again to add the highlight class.
			// usually it's better to have these functions be more generic, but I feel like this is an exception.
			if (!item.classList.contains("cursor")) {
				item.classList.add("highlight");
			}
		});
	},

	// input: none.  This function uses the globals xPos and yPos
	// return: array of div elements in the same row as the cursor
	getHorizHighlights: function() {
		return document.querySelectorAll(`.row-${this.yPos} .tile`);
	},

	// input: none.  This function uses the globals xPos and yPos
	// return: array of div elements in the same col as the cursor
	getVertHighlights: function() {
		return document.querySelectorAll(`.col-${this.xPos}`);
	},

	//input: none.  Queries all the elemnts that has class highlight
	//output: none.  This function removes the class highlight from all elements found to contain it
	removeHighlights: function() {
		const highlights = document.querySelectorAll(".highlight");
		highlights.forEach( (item) => {
			item.classList.remove("highlight");
		});
	}
}

console.log(gameObj);


function keyHandler(e){
	// Arrow Keys handler
	// up:    38
	// down:  40
	// left:  37
	// right: 39
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
			case 40:	// down button
				gameObj.moveCursorDown();
				break;
			default:
				console.alert("ALERT!! Got into arrow handler with non arrow key!");
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
		gameObj.addLetter(letters[e.keyCode-65]);
	}

	//Backspace handler
	//backspacd: 8
	if (e.keyCode === 8) {
		gameObj.backspace();
	}

	// TODO: not sure if I want this.
	//Delete handler
	//delete: 46
}

function preventKeyScrolling(e) {
	switch(e.keyCode) {
		case 37: case 38: case 39: case 40: 	// catch arrow keys
		case 32: e.preventDefault(); break;		// and catch spacebar
		default: break;								// allow everything else.
	}
}

// TODO: Put the functions below into an object along with xPos and yPos and horizHighlight
// 	This will mean I need to pass around this object or make it a global like the variables already are.


window.addEventListener('keyup', keyHandler);
window.addEventListener('keydown', preventKeyScrolling);

gameObj.createBoard();

// TODO: convert alerts into console logs before release
// TODO: make sure the board is completely visable