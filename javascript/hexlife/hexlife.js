

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

// shortcut
var SQRT3 = Math.sqrt(3);

// timer
var intervalId = null;

// entry point
window.onload = function() {
    canvas = document.getElementById("lifeCanvas");
    context = canvas.getContext('2d');

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
    ;
}

// Class for a single hexagonal cell
function Cell(x, y, parent) {
    this.x = x;
    this.y = y;
    this.parent = parent;
    this.alive = (y / 2 == 1 ? true : false);

    this.aliveNextGeneration = function() {
        // true if this cell is going to be alive next
        // generation, regardless of whether it's alive now.
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
            var point = hex_corder(xCoordPx, yCoordPx, HEXRADIUS, 0);
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
        return 0;
    }

    this.drawOnCanvas = function() {
        for (var i = 0; i < HEXWIDTH; i++) {
            for (var j = 0; j < HEXHEIGHT; j++) {
                this.cells[i][j].drawOnCanvas();
            }
        }
    }
}