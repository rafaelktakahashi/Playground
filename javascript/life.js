// size of the grid in squares
var WIDTH = 50;
var HEIGHT = 25;

var squareSize = 20;

// rules for birth and survival
var B = [3];
var S = [2,3];

// objects backing the grids
var mainGrid = null;
var sideGrid = null;

// timer
var intervalId = null;

// debug paragraph
var debug = document.getElementById("debug").innerHTML;

window.onload = function() {
	var canvas = document.getElementById("lifeCanvas");
	var context = canvas.getContext("2d");
	
	debug += "1";

	canvas.width = WIDTH * squareSize;
	canvas.height = HEIGHT * squareSize;

	debug += "2";
	// Instantiate two grids, alternate between them
	mainGrid = new Grid();
	sideGrid = new Grid();

	debug += "3";
	// the canvas gets a listener
	canvas.addEventListener("click", handleClick);
	
}

// activates or deactivates a cell
function handleClick(event) {
	var x = event.pageX - elemLeft;
	var y = event.pageY - elemTop;

	// figure out which square was clicked and toggle it
	xSquare = x / WIDTH;
	ySquare = y / HEIGHT;

	mainGrid.getCell(xSquare, ySquare).toggle();
	return;
}

// begins the cycles
function start() {
	intervalId = setInterval(advanceGeneration, 500);
}

// stops the cycles
function stop() {
	if (intervalId != null) {
		clearInterval(intervalId);
	}
}

// advance a generation and rerender the grid
function advanceGeneration() {
	// use the side grid to store new values
	for (var i = 0; i < WIDTH; i++) {
		for (var j = 0; j < HEIGHT; j++) {
			sideGrid.getCell(i, j).alive
				= mainGrid.getCell(i, j).aliveNextGeneration();
		}
	}

	// then, switch grids and rerender
	var temp = mainGrid;
	mainGrid = sideGrid;
	sideGrid = temp;
	mainGrid.drawOnCanvas(document.getElementById("lifeCanvas"));
}

// handle a click

// Class for a single cell in the game
// x and y are 0-indexed integers.
// parent is the parent grid.
function Cell(x, y, parent) {
	this.x = x;
	this.y = y;
	this.alive = false;
	this.parent = parent;

	this.aliveNextGeneration = function() {
		var nNeighbors = parent.countLiveNeighbors(this.x, this.y);

		var arrayToCompare = null;
		if (this.alive) {
			// if this is alive, it needs to survive
			arrayToCompare = S;
		} else {
			// if this is dead, is needs to be born
			arrayToCompare = B;
		}

		for (var i = 0; i < arrayToCompare.length; i++) {
			if (arrayToCompare[i] == nNeighbors) {
				return true;
			}
		}
	
		return false;
	}

	this.toggle = function() {
		this.alive = !this.alive;
	}

	this.drawOnCanvas = function(canvas) {
		var ctx = canvas.getContext("2d");
		ctx.fillRect(squareSize * this.x,
			squareSize * this.y,
			x, y);
	}
	this.clearOnCanvas = function(canvas) {
		var ctx = canvas.getContext("2d");
		ctx.clearRect(squareSize * this.x,
			squareSize * this.y,
			x, y);
	}

}

function makeGrid() {
	// used only one in the Grid constructor
	var cells = [];
	for (var i = 0; i < WIDTH; i++) {
		cells[i] = [];
		for (var j = 0; i < HEIGHT; j++) {
			cells[i][j] = new Cell(i, j, this);
		}
	}
	return cells;
}

// Class for a grid
function Grid() {

	// cells:
	this.cells = makeGrid();

	this.getCell = function(x, y) {
		return cells[i][j];
	}

	this.countLiveNeighbors = function(x, y) {
		var count = 0;
		
		var xright = x + 1;
		if (x == WIDTH) {
			x = 0;
		}
		var xleft = x - 1;
		if (x == -1) {
			x = WIDTH - 1;
		}
		var ytop = y + 1;
		if (y == HEIGHT) {
			y = 0;
		}
		var ybottom = y - 1;
		if (y == -1) {
			y = HEIGHT - 1;
		}
		
		// no time to do it right

		if (cells[xleft][y].alive) count++;
		if (cells[xright][y].alive) count++;
		if (cells[x][ytop].alive) count++;
		if (cells[x][ybottom].alive) count++;

		if (cells[xleft][ytop].alive) count++;
		if (cells[xleft][ybottom].alive) count++;
		if (cells[xright][ytop].alive) count++;
		if (cells[xright][ybottom].alive) count++;

		return count;

	}

	// render this grid on a canvas on screen
	this.drawOnCanvas = function(canvas) {
		for (var i = 0; i < WIDTH; i++) {
			for (var j = 0; j < HEIGHT; j++) {
				// render this square
				if (cells[i][j].alive) {
					cells[i][j].drawOnCanvas(canvas);
				} else {
					// clear
					cells[i][j].clearInterval(canvas);
				}
			}
		}
	}
}