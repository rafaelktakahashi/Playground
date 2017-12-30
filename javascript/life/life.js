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
	
	canvas.width = WIDTH * squareSize;
	canvas.height = HEIGHT * squareSize;

	// Instantiate two grids, alternate between them
	mainGrid = new Grid();
	sideGrid = new Grid();

	// the canvas gets a listener
	canvas.addEventListener("click", function(event) {
		var x = event.pageX - canvas.offsetLeft;
		var y = event.pageY - canvas.offsetTop;
		
		// figure out which square was clicked and toggle it
		var xSquare = Math.floor(x / squareSize);
		var ySquare = Math.floor(y / squareSize);

		mainGrid.getCell(xSquare, ySquare).toggle();
		// also ask just the changed cell to redraw
		mainGrid.getCell(xSquare, ySquare).drawOnCanvas(canvas);
		return;
		
	}, false);
	canvas.addEventListener("click", handleClick);
	
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
		var drawStrat = null;

		if (this.alive) {
			drawStrat = function(a,b,c,d) {
				ctx.fillRect(a,b,c,d);
			}
		} else {
			drawStrat = function(a,b,c,d) {
				ctx.clearRect(a,b,c,d);
			}
		}

		drawStrat(squareSize * this.x,
			squareSize * this.y,
			squareSize, squareSize);
	}

}

function makeGrid(parent) {
	// used only one in the Grid constructor
	var cells = [];
	for (var i = 0; i < WIDTH; i++) {
		cells[i] = [];
		for (var j = 0; j < HEIGHT; j++) {
			cells[i][j] = new Cell(i, j, parent);
		}
	}
	return cells;
}

// Class for a grid
function Grid() {

	// cells:
	this.cells = makeGrid(this);

	this.getCell = function(x, y) {
		return this.cells[x][y];
	}

	this.countLiveNeighbors = function(x, y) {
		var count = 0;
		
		var xright = x + 1;
		if (xright == WIDTH) {
			xright = 0;
		}
		var xleft = x - 1;
		if (xleft == -1) {
			xleft = WIDTH - 1;
		}
		var ytop = y + 1;
		if (ytop == HEIGHT) {
			ytop = 0;
		}
		var ybottom = y - 1;
		if (ybottom == -1) {
			ybottom = HEIGHT - 1;
		}
		
		// no time to do it right

		if (this.cells[xleft][y].alive) count++;
		if (this.cells[xright][y].alive) count++;
		if (this.cells[x][ytop].alive) count++;
		if (this.cells[x][ybottom].alive) count++;

		if (this.cells[xleft][ytop].alive) count++;
		if (this.cells[xleft][ybottom].alive) count++;
		if (this.cells[xright][ytop].alive) count++;
		if (this.cells[xright][ybottom].alive) count++;

		return count;

	}

	// render this grid on a canvas on screen
	this.drawOnCanvas = function(canvas) {
		for (var i = 0; i < WIDTH; i++) {
			for (var j = 0; j < HEIGHT; j++) {
				// render this square
				this.cells[i][j].drawOnCanvas(canvas);
			}
		}
	}
}