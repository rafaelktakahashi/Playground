// --- Some globals ---

// Point that appears on click
var A = null; // perhaps an array of points instead? or an enumerator?
// Point that follows the mouse
var B = null;
// Main canvas - initialized on load
var canvas = null;
// Use the context rather than the canvas itself for drawing.
var ctx = null;

// Constants, mostly for initialization
var INITIAL_CANVAS_WIDTH = 500;
var INITIAL_CANVAS_HEIGHT = 500;
var INITIAL_GRID_WIDTH = INITIAL_CANVAS_WIDTH / 10;
var INITIAL_GRID_HEIGHT = INITIAL_CANVAS_HEIGHT / 10;

// --- No globals declared beyond this point ---


// Creates the canvas and sets up stuff that will stay there
// for the duration of the program.
function initialize() {
    // this is a div that already exists:
    var main = document.getElementById("main");
    // make a new canvas:
    canvas = document.createElement("canvas");
    canvas.height = INITIAL_CANVAS_HEIGHT;
    canvas.width = INITIAL_CANVAS_WIDTH;
    canvas.id = "mainCanvas";
    canvas.style.cursor = "none";
    main.appendChild(canvas);
    // remember its context
    ctx = canvas.getContext("2d");
    canvas.style.border = "1px solid black";
}

// On mouse click, set point A.
function onclick(e) {
    A = {x: e.clientX, y: e.clientY};
}

// On secondary mouse click, clear point A.
function onrightclick(e) {
    e.preventDefault();
    A = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Redraw on mouse move. Keep point B at mouse's position.
function onmousemove(e) {
    B = {x: e.clientX, y: e.clientY};
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderPoints();
    renderMainLine();
}



// Rendering functions (these do not clear the canvas)

// Render the grid behind
function renderGrid() {
    for (var i = 0; i < INITIAL_GRID_WIDTH; i++) {
        for (var j = 0; j < INITIAL_GRID_HEIGHT; j++) {
            // Place a square here
        }
    }
}

// Render each point that exists.
function renderPoints() {
    if (A) {
        ctx.fillStyle = "#CC1111";
        ctx.fillRect(A.x - 1, A.y - 1, 3, 3);
    }
    if (B) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(B.x - 1, B.y - 1, 3, 3);
    }
}

// Render the main line from A to B.
function renderMainLine() {
    if (A) {
        ctx.fillStyle="#000000";
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.stroke();
    }
}


// Register events
document.addEventListener("click", onclick);
document.addEventListener("contextmenu", onrightclick);
document.addEventListener("mousemove", onmousemove);
window.addEventListener("load", initialize);