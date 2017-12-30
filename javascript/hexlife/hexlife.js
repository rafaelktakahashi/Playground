

// Width in hexagons
var HEXWIDTH = 200;

// Height in hexagons
var HEXHEIGHT = 100;

// Radius is actually the distance between center and vertex
// For a hexagon, that's the same thing as the length of an edge.
var HEXRADIUS = 10;

// Objects backing the grids
var mainGrid = null;
var sideGrid = null;
// instantiate in entry point

// Objects for the canvas and its 2d context
var canvas = null;
var canvasContext = null;
// instantiate in entry point

// shortcut variable
var SQRT3 = Math.sqrt(3);

// rules for birth and survival
var B = [3];
var S = [3,4];

// timer
var intervalId = null;

// entry point
window.onload = function() {
    canvas = document.getElementById("lifeCanvas");
    canvasContext = canvas.getContext('2d');

    // vertical distance between hexes is 3/4 side
    // 1.5 * side overcounts one;
    // then add side/2 for first and for last
    canvas.height = Math.floor(
        1.5 * (HEXHEIGHT - 1) * HEXRADIUS + HEXRADIUS
    );

    // to calculate the width of a single hexagon, we do
    // sqrt(3)/2 times height
    canvas.width = Math.floor(
        HEXWIDTH * (HEXRADIUS * 2) * SQRT3
    );

    // Instantiate new grids
    mainGrid = new Grid();
    sideGrid = new Grid();

    // the canvas gets a listener
    canvas.addEventListener("click", function(event) {
        var x = event.pageX - canvas.offsetLeft;
        var y = event.pageY - canvas.offsetTop;

        // figure out which hex was clicked and toggle it
        var xHex = 2;
        var yHex = 2;
        // TODO

        mainGrid.getCell(xHex, yHex).toggle();
        // also ask just that cell to redraw
        mainGrid.getCell(xHex, yHex).drawOnCanvas();
    }, false);
    
    // draw the initial grid
    mainGrid.drawOnCanvas();
}

function start() {
    intervalId = setInterval(advanceGeneration, 200);
}

function stop() {
    if (intervalId != null) {
        clearInterval(intervalId);
    }
}

function advanceGeneration() {
    // use the side grid to store new values
    for (var i = 0; i < HEXWIDTH; i++) {
        for (var j = 0; j < HEXHEIGHT; j++) {
            sideGrid.getCell(i, j).alive
                = mainGrid.getCell(i, j).aliveNextGeneration();
        }
    }

    // then, switch grids and rerender
    var temp = mainGrid;
    mainGrid = sideGrid;
    sideGrid = temp;
    mainGrid.drawOnCanvas();
}

// Class for a single hexagonal cell
function Cell(x, y, parent) {
    this.x = x;
    this.y = y;
    this.parent = parent;
    this.alive = (y % 2 == 1 ? true : false);

    this.aliveNextGeneration = function() {
        // true if this cell is going to be alive next
        // generation, regardless of whether it's alive now.
        var nNeighbors = parent.countLiveNeighbors(this.x, this.y);

        var arrayToCompare = null;

        if (this.alive) {
            // if this is alive, it needs to survive
            arrayToCompare = S;
        }
        else {
            // if this is dead, it needs to be born
            arrayToCompare = B;
        }

        for (var i = 0; i < arrayToCompare.length; i++) {
            if (arrayToCompare[i] == nNeighbors) {
                return true;
            }
        }

        return false;
    }

    // method for convenience
    this.toggle = function() {
        this.alive = !this.alive;
    }

    // draws this cell on the global canvas
    this.drawOnCanvas = function() {
        if (canvas == null) {
            throw {
                name: "null exception",
                message: "canvas was null"
            };
        }

        // first, find the center point of this hexagon
        // x coordinnate (px) is width times x (hex), plus half width
        xCoordPx = (HEXRADIUS * 2) * SQRT3 * this.x
            + (HEXRADIUS * 2) * SQRT3 / 2
            
        // y coordinate (px) is side, plus 1.5 side for each y.
        yCoordPx = HEXRADIUS + 1.5 * HEXRADIUS * this.y;

        // then, find the points around the center.
        canvasContext.fillStyle = '#f00';
        canvasContext.beginPath();
        canvasContext.moveTo(xCoordPx, yCoordPx + HEXRADIUS);
        // clockwise:
        for (var i = 0; i < 5; i++) {
            var point = hex_corner(xCoordPx, yCoordPx, HEXRADIUS, 0);
            canvasContext.lineTo(point.x, point.y);
        }
        canvasContext.closePath();
        canvasContext.fill();
    }
}

function hex_corner(centerx, centery, size, i) {
    var angle_deg = 60 * i + 30;
    var angle_rad = Math.PI / 180 * angle_deg;
    return {
        x: centerx + size * Math.cos(angle_rad),
        y: centery + size * Math.sin(angle_rad)
    }
}

function makeGrid(parent) {
    // used only once in the Grid constructor
    var cells = [];
    for (var i = 0; i < HEXWIDTH; i++) {
        cells[i] = [];
        for (var j = 0; j < HEXHEIGHT; j++) {
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

        // centers are like in a square grid
        // but skip top-left and bottom-left
        for (var offsetX = -1; offsetX <= 1; offsetX++) {
            for (var offsetY = -1; offsetY <= 1; offsetY++) {
                // skip center
                if (offsetX == 0 && offsetY == 0)
                {continue;}
                // skip top-left and bottom-left
                if (offsetX == -1 && offsetY != 0)
                {continue;}

                var newX = x + offsetX;
                var newY = y + offsetY;

                // safety checks
                if (newX == -1)
                {newX = HEXWIDTH - 1;}

                if (newX == HEXWIDTH)
                {newX = 0;}

                if (newY == -1)
                {newY = HEXHEIGHT - 1;}

                if (newY == HEXHEIGHT)
                {newY = 0;}

                if (this.cells[newX][newY].alive)
                {count++;}

            }
        }
        return count;
    }

    // calls drawOnCanvas on every cell
    this.drawOnCanvas = function() {
        for (var i = 0; i < HEXWIDTH; i++) {
            for (var j = 0; j < HEXHEIGHT; j++) {
                this.cells[i][j].drawOnCanvas();
            }
        }
    }
}