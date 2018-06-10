"use strict"



// -- Globals --

// Size of each square, in pixels
var cell_size = 50;

// Number of cells vertically
var vertical_cell_count = 15;
var horizontal_cell_count = 15;

// Coordinate, in cells, of the origin point
var origin_x = 7;
var origin_y = 7;

// Reference to a grid
var grid = null;

// -- End Globals --

window.addEventListener('load', (ev) => {
    // Instantiating this will also create the canvas.
    // Not the best design choice, but I'm not too worried
    // about that stuff. Just needs to work.
    grid = new Grid(
        vertical_cell_count,
        horizontal_cell_count,
        origin_x,
        origin_y,
        cell_size
    );
});

document.addEventListener('mousemove', (ev) => {
    grid.setPointT(ev.clientX, ev.clientY);
    grid.render();
});

document.addEventListener('click', (ev) => {
    grid.addBlockingPoint(ev.clientX, ev.clientY);
    grid.render();
});

document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    grid.clearBlockingPoints();
    grid.render();
});