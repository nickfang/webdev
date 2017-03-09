const boardSize = 10;
const board = document.querySelector("#board");

let xPos = 0;
let yPos = 0;
let horizHighlight = true;


function createBoard(numTilesPerSide) {
	const iDiv = document.createElement("div");
	for (let i = 0; i < numTilesPerSide; i++) {
		iDiv.className = `row-${i} row`;
		board.appendChild(iDiv.cloneNode());
	}
	boardRows = board.children;
	for (let i = 0; i < boardRows.length; i++) {
		for (let j = 0; j < numTilesPerSide; j++) {
			iDiv.className = `col-${j} tile`;
			boardRows[i].appendChild(iDiv.cloneNode());
		}
	}

	// have to assign tiles here since it doesn't exist before now.
	const tiles = document.querySelectorAll(".tile");
	const tileSideLength = Math.floor((100 - 25 /* board margin is 10% on each side */) / numTilesPerSide);
	// TODO: make this into a css variable, so it's not a style in html.
	tiles.forEach( (tile) => {
		tile.style.width = `${tileSideLength}vw`
		tile.style.height = `${tileSideLength}vw`
	});

	getCurrentCursorElement().classList.add("cursor");
	drawHighlights(getHorizHighlights());
}


function keyHandler(e){
	// up:    38
	// down:  40
	// left:  37
	// right: 39
	if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
		let cursor = getCurrentCursorElement();
		cursor.classList.remove("cursor");
		// if we're moving in the same direction as the highlight, we only need to update 2 divs.
		// if we're moving in the perpendicular direction, we need to erase the previous line and
		// 	create a new line of highlights.
		switch(e.keyCode) {
			case 37:	// left button
			case 39:	// right button
				if (horizHighlight) {
					cursor.classList.add("highlight");
				}
				if (e.keyCode === 37) {
					--xPos < 0 ? (xPos = boardSize-1) : "";
				} else {
					++xPos > boardSize-1 ? (xPos = 0) : "";
				}
				if (!horizHighlight) {
					removeHighlights();
					drawHighlights(getVertHighlights());
				}
				break;
			case 38:	// up button
			case 40:	// down button
				if (!horizHighlight) {
					cursor.classList.add("highlight");
				}
				if (e.keyCode === 38) {
					--yPos < 0 ? (yPos = boardSize-1) : "";
				} else {
					++yPos > boardSize-1 ? (yPos = 0) : "";
				}
				if (horizHighlight) {
					removeHighlights();
					drawHighlights(getHorizHighlights());
				}
				break;
			default:
				console.alert("ALERT!! Got into arrow handler with non arrow key!");
				break;
		}
		// assuming that the cursor was moved.
		// if this is not the case, we should get an error from the previous switch statement.
		cursor = getCurrentCursorElement();
		cursor.classList.remove("highlight");
		cursor.classList.add("cursor");
	}

	// spacebar: 32
	if (e.keyCode === 32) {
		let highlights;
		horizHighlight = !horizHighlight;
		removeHighlights();
		horizHighlight ? highlights = getHorizHighlights() : highlights = getVertHighlights();
		drawHighlights(highlights);
	}
}

// input: none.  This function uses the globals xPos and yPos
// return: div element that the current cursor is on.
function getCurrentCursorElement() {
	return document.querySelector(`.row-${yPos} .col-${xPos}`);
}

// input: none.  This function uses the globals xPos and yPos
// return: array of div elements in the same row as the cursor
function getHorizHighlights() {
	return document.querySelectorAll(`.row-${yPos} .tile`);
}

// input: none.  This function uses the globals xPos and yPos
// return: array of div elements in the same col as the cursor
function getVertHighlights() {
	return document.querySelectorAll(`.col-${xPos}`);
}

// input: none.  This function uses the globals xPos and yPos
// return: none.  This function adds the class cursor to the element that represents xPos and yPos
function drawCursor() {
	const cursor = document.querySelector(`.row-${yPos} .col-${xPos}`);
	cursor.classList.add("cursor");
}

// input: highlights - array of tile level divs that will be highlighted
// output: none.  This function adds class highlight to all the elemnts in the list highlights
function drawHighlights(highlights) {
	highlights.forEach( (item) => {
		// this check is here since it would be inefficient to go through the list to remove the element with class cursor
		// only to go through the list again to add the highlight class.
		// usually it's better to have these functions be more generic, but I feel like this is an exception.
		if (!item.classList.contains("cursor")) {
			item.classList.add("highlight");
		}
	});
}

//input: none.  Queries all the elemnts that has class highlight
//output: none.  This function removes the class highlight from all elements found to contain it
function removeHighlights() {
	const highlights = document.querySelectorAll(".highlight");
	highlights.forEach( (item) => {
		item.classList.remove("highlight");
	});
}

function preventKeyScrolling(e) {
	switch(e.keyCode) {
		case 37: case 38: case 39: case 40: 	// catch arrow keys
		case 32: e.preventDefault(); break;		// and catch spacebar
		default: break;								// allow everything else.
	}
}

window.addEventListener('keyup', keyHandler);
window.addEventListener('keydown', preventKeyScrolling);

createBoard(boardSize);

// TODO: convert alerts into console logs before release
// TODO: make sure the board is completely visable