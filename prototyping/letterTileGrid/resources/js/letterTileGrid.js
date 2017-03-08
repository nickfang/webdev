const board = document.querySelector("#board");

function createBoard(sideLength) {
	const iDiv = document.createElement("div");
	iDiv.className = "row tile";
	for (let i = 0; i < sideLength; i++) {
		board.appendChild(iDiv.cloneNode());
	}
	iDiv.className = "col tile";
	boardRows = board.children;
	for (let i = 0; i < boardRows.length; i++) {
		for (let j = 0; j < sideLength; j++) {
			boardRows[i].appendChild(iDiv.cloneNode());
		}
	}
}

createBoard(3);