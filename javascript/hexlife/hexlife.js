

// x is vertical
// y is horizontal

// Width in hexagons
var HEXWIDTH = 60;

// Height in hexagons
var HEXHEIGHT = 50;

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
// do not change these here, there are options on the page
var B = [2];
var S = [3,4];

// functions to check if a number matches a rule
function matchesB(number) {
    for (var i = 0; i < B.length; i++) {
        if (B[i] == number) {
            return true;
        }
    }
    return false;
}
function matchesS(number) {
    for (var i = 0; i < S.length; i++) {
        if (S[i] == number) {
            return true;
        }
    }
    return false;
}

// timer
var running = false;
var intervalId = null;

// colors
var COLOR_BACKGROUND = "#4080b0";
var COLOR_MESH = "#4080b0";
var COLOR_ALIVE_DANGER = "#440000";
var COLOR_ALIVE_SAFE = "#003300";
var COLOR_DEAD_STERILE = "#ffffff";
var COLOR_DEAD_FERTILE = "#e0ffe0";

// entry point
window.onload = function() {

    // select the default rules on the page:
    document.getElementById("B2").checked = true;
    document.getElementById("S3").checked = true;
    document.getElementById("S4").checked = true;

    canvas = document.getElementById("lifeCanvas");
    canvasContext = canvas.getContext('2d');

    // put a border around the canvas
    canvas.style.border = "10px solid " + COLOR_BACKGROUND;

    // vertical distance between hexes is 3/4 side
    // 1.5 * side overcounts one;
    // then add side/2 for first and for last
    canvas.height = Math.floor(
        1.5 * (HEXHEIGHT - 1) * HEXRADIUS + 2 * HEXRADIUS
    );

    // to calculate the width of a single hexagon, we do
    // sqrt(3) times radius
    // add half width to compensate for offset rows
    canvas.width = Math.floor(
        HEXWIDTH * HEXRADIUS * SQRT3
        + HEXRADIUS * SQRT3/2
    );

    // Instantiate new grids
    mainGrid = new Grid();
    sideGrid = new Grid();

    // the canvas gets a listener
    canvas.addEventListener("click", function(event) {
        var x = event.pageX - canvas.offsetLeft;
        var y = event.pageY - canvas.offsetTop;

        // figure out which hex was clicked and toggle it
        var q = (x * SQRT3/3 - y / 3) / HEXRADIUS;
        var r = (y * 2/3) / HEXRADIUS;
        // q and r are in fractional axial coordinates

        // round q and r to the nearest hex
        var clickCoord
            = cube_to_oddr(
                cube_round({
                    x: q,
                    y: 0 - q - r,
                    z: r
                })
            );

        var xHex = clickCoord.x;
        var yHex = clickCoord.y;
        
        // try to get the cell
        var cell = mainGrid.getCell(xHex, yHex);

        if (cell != null) {
            cell.toggle();
            // toggle will also update colors
            // including neighbors
        }

    }, false);
    
    // fill with background color
    canvasContext.fillStyle = COLOR_BACKGROUND;
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    // draw the initial grid
    canvasContext.strokeStyle = COLOR_MESH;
    mainGrid.drawOnCanvas();

    // put those colors in the textboxes as well
    document.getElementById("aliveSafeColorBox").value = COLOR_ALIVE_SAFE.slice(1);
    document.getElementById("aliveDangerColorBox").value = COLOR_ALIVE_DANGER.slice(1);
    document.getElementById("deadFertileColorBox").value = COLOR_DEAD_FERTILE.slice(1);
    document.getElementById("deadSterileColorBox").value = COLOR_DEAD_STERILE.slice(1);
    document.getElementById("backgroundColorBox").value = COLOR_BACKGROUND.slice(1);
    document.getElementById("meshColorBox").value = COLOR_MESH.slice(1);
}

// function that converts cube coordinates to odd-r coordinates
function cube_to_oddr(cube) {
    var col = cube.x
        + (cube.z - (cube.z & 1))
        / 2;
    col = col - (cube.z & 1 ? 0 : 1);
    var row = cube.z - 1;
    return {
        x: col,
        y: row
    }
}

// function that rounds a floating-point cube coordinate
function cube_round(cube) {
    var rx = Math.round(cube.x);
    var ry = Math.round(cube.y);
    var rz = Math.round(cube.z);

    var x_diff = Math.abs(rx - cube.x);
    var y_diff = Math.abs(ry - cube.y);
    var z_diff = Math.abs(rz - cube.z);

    if (x_diff > y_diff && x_diff > z_diff) {
        rx = 0 -ry -rz;
    }
    else if (y_diff > z_diff) {
        ry = 0 -rx -rz;
    }
    else {
        rz = 0 -rx -ry;
    }

    return {
        x: rx,
        y: ry,
        z: rz
    };
}

// called by start button
function start() {
    if (!running) {
        intervalId = setInterval(advanceGeneration, 200);
        running = true;
    }
}

// called by stop button
function stop() {
    if (intervalId != null && running) {
        clearInterval(intervalId);
        running = false;
    }
}

// called by advance button, and also periodically while running
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

// called by randomize button
// if the percentage isn't a number from 0 to 100, this function does nothing.
function randomize() {
    // get percentage
    var percentage
        = parseInt(document.getElementById("randomizePercentage").value);
    if (isNaN(percentage)) {return;}

    if (percentage < 0 || percentage > 100) {return;}

    mainGrid.randomize(percentage); // also draws on canvas
}

// called when clicking a rule checkbox
function updateRule() {
    B = [];
    for (var i = 0; i < 7; i++) {
        if (document.getElementById("B" + i).checked) {
            B.push(i);
        }
    }
    S = [];
    for (var i = 0; i < 7; i++) {
        if (document.getElementById("S" + i).checked) {
            S.push(i);
        }
    }
    mainGrid.drawOnCanvas();
}

// called when user changes a color
// possible values: "alive_danger", "alive_safe",
// "dead_fertile", "dead_sterile", "background", "mesh".
// if none of these match, the function does nothing.
// if the colors is not a valid rgb, this function does nothing.
function setColor(type, colorBoxId) {
    var re = /[0-9a-fA-F]{6}/;
    var color = document.getElementById(colorBoxId).value;
    if (re.exec(color).length == 0) {
        // not a match
        return;
    }
    color = "#" + color;
    
    if (type == "alive_danger")
    {COLOR_ALIVE_DANGER = color;}
    else if (type == "alive_safe")
    {COLOR_ALIVE_SAFE = color;}
    else if (type == "dead_fertile")
    {COLOR_DEAD_FERTILE = color;}
    else if (type == "dead_sterile")
    {COLOR_DEAD_STERILE = color;}
    else if (type == "background")
    {COLOR_BACKGROUND = color;}
    else if (type == "mesh")
    {COLOR_MESH = color;}
    else
    {return;}

    // rerender everything on the canvas
    canvasContext.fillStyle = COLOR_BACKGROUND;
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    // draw the initial grid
    canvasContext.strokeStyle = COLOR_MESH;
    mainGrid.drawOnCanvas();
}

// Class for a single hexagonal cell
function Cell(x, y, parent) {
    this.x = x;
    this.y = y;
    this.parent = parent;
    this.alive = Boolean(Math.round(Math.random()));

    this.aliveNextGeneration = function() {
        // true if this cell is going to be alive next
        // generation, regardless of whether it's alive now.
        var nNeighbors = parent.countLiveNeighbors(this.x, this.y);

        if (this.alive) {
            // if this is alive, it needs to survive
            return matchesS(nNeighbors);
        }
        else {
            // if this is dead, it needs to be born
            return matchesB(nNeighbors);
        }

    }

    // invert this cell
    // then update this and its neighbors
    this.toggle = function() {
        this.alive = !this.alive;

        for (var offsetX = -1; offsetX <= 1; offsetX++) {
            for (var offsetY = -1; offsetY <= 1; offsetY++) {

                // for odd-rows:
                if (this.y&1) {
                    // skip top-left and bottom-left
                    if (offsetX == -1 && offsetY != 0)
                    {continue;}
                }
                else {
                    // for even-rows:
                    // skip top-right and bottom-right
                    if (offsetX == 1 && offsetY != 0)
                    {continue;}
                }

                // update the cell
                newX = this.x + offsetX;
                newY = this.y + offsetY;
                if (newX < 0 || newX >= HEXWIDTH
                || newY < 0 || newY >= HEXHEIGHT) {
                    continue;
                }

                this.parent.getCell(newX, newY).drawOnCanvas();

            }
        }

        

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
        var xCoordPx = HEXRADIUS * SQRT3 * this.x
            + HEXRADIUS * SQRT3 / 2
            
        // y coordinate (px) is side, plus 1.5 side for each y.
        var yCoordPx = HEXRADIUS + 1.5 * HEXRADIUS * this.y;

        // then, find the points around the center.
        canvasContext.beginPath();
        var point = hex_corner(xCoordPx, yCoordPx, HEXRADIUS, 0, this.y % 2 == 1);
        canvasContext.moveTo(point.x, point.y);
        // clockwise:
        for (var i = 1; i < 6; i++) {
            var point = hex_corner(xCoordPx, yCoordPx, HEXRADIUS, i, this.y % 2 == 1);
            canvasContext.lineTo(point.x, point.y);
        }
        canvasContext.closePath();

        var nNeighbors = parent.countLiveNeighbors(this.x, this.y);
        if (this.alive) {
            
            if (matchesS(nNeighbors))
            {canvasContext.fillStyle = COLOR_ALIVE_SAFE;}
            else
            {canvasContext.fillStyle = COLOR_ALIVE_DANGER;}

            canvasContext.fill();
            canvasContext.stroke();
        }
        else {

            if (matchesB(nNeighbors))
            {canvasContext.fillStyle = COLOR_DEAD_FERTILE;}
            else
            {canvasContext.fillStyle = COLOR_DEAD_STERILE;}

            canvasContext.fill();
            canvasContext.stroke();
        }
    }
}

// centerx and centery are coordinates of the hexagon's center
// size is the edge of the hexagon
// i is the corner's number, from 0 to 5 (5 is top)
// oddRow is true if 
function hex_corner(centerx, centery, size, i, oddRow) {
    var angle_deg = 60 * i + 30;
    var angle_rad = Math.PI / 180 * angle_deg;
    return {
        x: centerx + size * Math.cos(angle_rad)
            + ( (oddRow ? 1 : 0) * SQRT3/2 * HEXRADIUS),
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

    // this method returns null if indices are out of bounds.
    this.getCell = function(x, y) {
        if (x >= HEXWIDTH || y >= HEXHEIGHT) {
            return null;
        }
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

                // for odd-rows:
                if (y&1) {
                    // skip top-left and bottom-left
                    if (offsetX == -1 && offsetY != 0)
                    {continue;}
                }
                else {
                    // for even-rows:
                    // skip top-right and bottom-right
                    if (offsetX == 1 && offsetY != 0)
                    {continue;}
                }

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

    this.randomize = function(percentage) {
        
        for (var i = 0; i < HEXWIDTH; i++) {
            for (var j = 0; j < HEXHEIGHT; j++) {
                this.cells[i][j].alive
                    = Math.floor(Math.random() * 100) + 1 <= percentage;
            }
        }

        this.drawOnCanvas();
    }
}