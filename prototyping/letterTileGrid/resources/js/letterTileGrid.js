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
	for (let i = 0; i < tiles.length; i++) {
		// tiles[i].innerHTML = i;
		tiles[i].style.width = `${tileSideLength}vw`
		tiles[i].style.height = `${tileSideLength}vw`
	}

	// TODO: this line is used in several places.  figure out how to refactor
	const cursor = document.querySelector(`.row-${yPos} .col-${xPos}`);
	cursor.classList.add("cursor");
	// TODO: this line is used in several places.  figure out how to refactor
	const highlights = document.querySelectorAll(`.row-${yPos} .tile`);
	drawHighlights(highlights);
}

function keyHandler(e){
	// up:    38
	// down:  40
	// left:  37
	// right: 39
	if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
		let cursor = document.querySelector(`.row-${yPos} .col-${xPos}`);
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
					highlights = document.querySelectorAll(`.col-${xPos}`);
					drawHighlights(highlights);
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
					highlights = document.querySelectorAll(`.row-${yPos} .tile`);
					drawHighlights(highlights);
				}
				break;
			default:
				break;
		}
		cursor = document.querySelector(`.row-${yPos} .col-${xPos}`);
		cursor.classList.remove("highlight");
		cursor.classList.add("cursor");
	}
	// spacebar: 32
	if (e.keyCode === 32) {
		let highlights;
		horizHighlight = !horizHighlight;
		removeHighlights();
		if (horizHighlight) {
			highlights = document.querySelectorAll(`.row-${yPos} .tile`);
		} else {
			highlights = document.querySelectorAll(`.col-${xPos}`);
		}
		drawHighlights(highlights);
	}
}

function drawCursor() {
	const cursor = document.querySelector(`.row-${yPos} .col-${xPos}`);
	cursor.classList.add("cursor");
}

// input: highlights - array of tile level divs that will be highlighted
function drawHighlights(highlights) {
	for (let i = 0; i < highlights.length; i++) {
		// this is here since it would be inefficient to go through the list to remove the element with class cursor
		// only to go through the list again to add the highlight class.
		// usually it's better to have these functions be more generic, but I feel like this is an exception.
		if (!highlights[i].classList.contains("cursor")) {
			highlights[i].classList.add("highlight");
		}
	}
}

function removeHighlights() {
	const highlights = document.querySelectorAll(".highlight");
	// for (let i = 0; i < highlights.length; i++) {
	// 	highlights[i].classList.remove("highlight");
	// }
	highlights.forEach( (item) => {
		item.classList.remove("highlight");
	});
}

function preventKeyScrolling(e) {
	switch(e.keyCode) {
		case 37: case 38: case 39: case 40: 	// catch arrow keys
		case 32: e.preventDefault(); break;		// catch spacebar
		default: break;								// allow everything else.
	}

}
// TODO: make sure the board is completely visable

window.addEventListener('keyup', keyHandler);
window.addEventListener('keydown', preventKeyScrolling);

createBoard(boardSize);