const boardSize = 10;
const board = document.querySelector("#board");


let xPos = 3;
let yPos = 4;
let horizDirection = true;

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
}



function moveCursor(e){
	// up:    38
	// down:  40
	// left:  37
	// right: 39
	if (e.keyCode === 32 || e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
		const cursor = document.querySelector(`.row-${yPos} .col-${xPos}`);
		cursor.classList.remove("cursor");
		switch(e.keyCode) {
			case 32: //	spacebar
				horizDirection = !horizDirection;
				break;
			case 37:	// left button
				--xPos < 0 ? (xPos = boardSize-1) : "";
				console.log(xPos);
				break;
			case 38:	// up button
				--yPos < 0 ? (yPos = boardSize-1) : "";
				break;
			case 39:	// right button
				++xPos > boardSize-1 ? (xPos = 0) : "";
				break;
			case 40:	// down button
				++yPos > boardSize-1 ? (yPos = 0) : "";
				break;
			default:
				break;
		}
		drawCursor();
	}
}

function drawCursor() {
	const cursor = document.querySelector(`.row-${yPos} .col-${xPos}`);
	let highlight;

	cursor.classList.toggle("cursor");
	if (cursor.classList.contains("highlight")) {
		cursor.classList.remove("highlight");
	}
	// if (horizDirection) {
	// 	highlight = document.querySelectorAll(`.row-${yPos} .tile`);
	// 	drawHighlight(highlight);
	// } else {
	// 	highlight = document.querySelectorAll(`.col-${xPos}`);
	// 	drawHighlight(highlight);
	// }
}

// input: highlight - array of tile level divs.
function drawHighlight(highlight) {
	for (let i = 0; i < highlight.length; i++) {
		if (!highlight[i].classList.contains("cursor")) {
			highlight[i].classList.add("highlight");
		}
	}
}

function preventKeyScrolling(e) {
	switch(e.keyCode) {
		case 37: case 38: case 39: case 40: 	// catch arrow keys
		case 32: e.preventDefault(); break;		// catch spacebar
		default: break;								// allow everything else.
	}

}
// TODO: make sure the board is completely visable

window.addEventListener('keyup', moveCursor);
window.addEventListener('keydown', preventKeyScrolling);

createBoard(boardSize);