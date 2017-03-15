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

		this.getCurrentCursorElement().classList.add("cursor");
		this.drawHighlights(this.getHorizHighlights());
	},

	sizeTiles: function() {
		// scale the font as well
		const tiles = document.querySelectorAll(".tile");
		const tileSideLength = Math.floor((100 - 20 /* board margin is 10% on each side */) / Math.max(gameObj.xLength, gameObj.yLength));
		// // TODO: make this into a css variable, so it's not a style in html.
		tiles.forEach( (tile) => {
			tile.style.width = `${tileSideLength}vw`
			tile.style.height = `${tileSideLength}vw`
		});

	},

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

	addLetter: function(letter) {
		let cursor = this.getCurrentCursorElement();
		cursor.innerHTML = letter;
		cursor.classList.remove("cursor");
		cursor.classList.add("highlight");
		if (this.horizHighlight) {
			++this.xPos > this.xLength - 1 ? this.increaseBoardSizeX() : "";
		} else {
			++this.yPos > this.yLength - 1 ? this.increaseBoardSizeY() : "";
		}
		cursor = this.getCurrentCursorElement();
		cursor.classList.add("cursor");
		cursor.classList.remove("highlight");

	},

	// input: none.  This function uses the globals xPos and yPos
	// return: div element that the current cursor is on.
	getCurrentCursorElement: function() {
		return document.querySelector(`.row-${this.yPos} .col-${this.xPos}`);
	},

	// input: none.  This function uses the globals xPos and yPos
	// return: none.  This function adds the class cursor to the element that represents xPos and yPos
	drawCursor: function() {
		const cursor = document.querySelector(`.row-${this.yPos} .col-${this.xPos}`);
		cursor.classList.add("cursor");
	},

	moveCursorLeft: function() {
		--this.xPos < 0 ? (this.xPos = this.xLength-1) : "";
	},

	moveCursorUp: function() {
		--this.yPos < 0 ? (this.yPos = this.yLength-1) : "";
	},

	moveCursorRight: function() {
		++this.xPos > this.xLength - 1 ? (this.xPos = 0) : "";
	},

	moveCursorDown: function() {
		++this.yPos > this.yLength - 1 ? (this.yPos = 0) : "";
	},

	backspace: function() {
		let cursor = this.getCurrentCursorElement();
		cursor.innerHTML = "";
		cursor.classList.remove("cursor");
		cursor.classList.add("highlight");
		if (this.horizHighlight) {
			--this.xPos < 0 ? (this.xPos = this.xLength-1) : "";
		} else {
			--this.yPos < 0 ? (this.yPos = this.yLength-1) : "";
		}
		cursor = this.getCurrentCursorElement();
		cursor.classList.add("cursor");
		cursor.classList.remove("highlight");
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

	rotateHighlights: function() {
		let highlights;
		this.horizHighlight = !this.horizHighlight;
		this.removeHighlights();
		this.horizHighlight ? highlights = this.getHorizHighlights() : highlights = this.getVertHighlights();
		this.drawHighlights(highlights);
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
		let cursor = gameObj.getCurrentCursorElement();
		cursor.classList.remove("cursor");
		// if we're moving in the same direction as the highlight, we only need to update 2 divs.
		// if we're moving in the perpendicular direction, we need to erase the previous line and
		// 	create a new line of highlights.
		switch(e.keyCode) {
			case 37:	// left button
			case 39:	// right button
				if (gameObj.horizHighlight) {
					cursor.classList.add("highlight");
				}
				if (e.keyCode === 37) {
					gameObj.moveCursorLeft();
				} else {
					gameObj.moveCursorRight();
				}
				if (!gameObj.horizHighlight) {
					gameObj.removeHighlights();
					gameObj.drawHighlights(gameObj.getVertHighlights());
				}
				break;
			case 38:	// up button
			case 40:	// down button
				if (!gameObj.horizHighlight) {
					cursor.classList.add("highlight");
				}
				if (e.keyCode === 38) {
					gameObj.moveCursorUp()
				} else {
					gameObj.moveCursorDown();
				}
				if (gameObj.horizHighlight) {
					gameObj.removeHighlights();
					gameObj.drawHighlights(gameObj.getHorizHighlights());
				}
				break;
			default:
				console.alert("ALERT!! Got into arrow handler with non arrow key!");
				break;
		}
		// assuming that the cursor was moved.
		// if this is not the case, we should get an error from the previous switch statement.
		cursor = gameObj.getCurrentCursorElement();
		cursor.classList.remove("highlight");
		cursor.classList.add("cursor");
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