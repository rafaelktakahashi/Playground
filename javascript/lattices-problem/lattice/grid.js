// Class for representing a grid.
// Only one instance of this class needs to exist.
// It takes care of the grid on the page.
class Grid {
    constructor(height, width, origin_x, origin_y, cell_size) {
        // Number of cells, vertically (corresponding to Y)
        this.height = height;
        // Number of cells, horizontally (corresponding to X)
        this.width = width;
        // Adds N cells horizontally to the origin
        this.origin_x = origin_x;
        // Adds N cells vertically to the origin
        this.origin_y = origin_y;
        // Size of each cell, in pixels
        this.cell_size = cell_size;
        // I must assume all parameters are valid
        // (non-negative integers only)

        // Target point of the line from the origin
        this.target = {
            x: this.origin_x * this.cell_size,
            y: this.origin_y * this.cell_size
        };
        // Extra points placed at will
        this.blockingPoints = []
        // This may be filled with many {x,y},
        // with 0 <= x,y < 1
        
        // 'main' is a div on the page
        var main = document.getElementById('main');
        // make a new canvas
        var canvas = document.createElement('canvas');
        canvas.height = height * cell_size;
        canvas.width = width * cell_size;
        canvas.id = 'mainCanvas';
        canvas.style.cursor = 'none';
        main.appendChild(canvas);

        // remember its context and place it in this object
        this.ctx = canvas.getContext('2d');
        canvas.style.border = '1px solid black';

        this._renderGrid();
    }

    // Renders only the grid lines.
    _renderGrid() {
        this.ctx.strokeStyle = '#000000';
        var height_px = this.height * this.cell_size;
        var width_px = this.width * this.cell_size;
        // Render vertical lines
        for (var i = 0; i < this.width; i++) {
            var horizontalPos = i * cell_size;
            this.ctx.beginPath();
            this.ctx.moveTo(horizontalPos, 0);
            this.ctx.lineTo(horizontalPos, height_px);
            if (i == this.origin_x) {
                this.ctx.strokeStyle = '#0080F0';
            } else {
                this.ctx.strokeStyle = '#000000';
            }
            this.ctx.stroke();
        }
        // Render horizontal lines
        for (var i = 0; i < this.height; i++) {
            var verticalPos = i * cell_size;
            this.ctx.beginPath();
            this.ctx.moveTo(0, verticalPos);
            this.ctx.lineTo(width_px, verticalPos);
            if (i == this.origin_y) {
                this.ctx.strokeStyle = '#0080F0';
            } else {
                this.ctx.strokeStyle = '#000000';
            }
            this.ctx.stroke();
        }
    }

    // Renders the origin point
    _renderOrigin() {
        var origin_x_px = this.origin_x * this.cell_size;
        var origin_y_px = this.origin_y * this.cell_size;
        this.ctx.strokeStyle = '#0080F0';
        this.ctx.strokeRect(
            origin_x_px - 3,
            origin_y_px - 3,
            7, 7
        );
    }

    // 0 <= x,y < 1
    // Renders a point at every square
    _renderPoint(x, y, color) {
        this.ctx.fillStyle = color;
        for (var i = 0; i < this.height; i++) {
            for (var j = 0; j < this.width; j++) {
                var newX = j * this.cell_size + x;
                var newY = i * this.cell_size + y;
                // make a 3x3 square for a point
                this.ctx.fillRect(
                    newX - 1,
                    newY - 1,
                    3, 3
                );
            }
        }
    }

    // Sets the target point
    setPointT(x_px, y_px) {
        if (x_px > this.width * this.cell_size
            || y_px > this.height * this.cell_size) {
                return;
        }
        this.target = {
            x: x_px,
            y: y_px
        };
    }

    // Renders the whole thing
    render() {
        this.ctx.clearRect(
            0, 0,
            this.width * this.cell_size,
            this.height * this.cell_size
        );
        this._renderGrid();
        this._renderOrigin();

        // render target point
        this._renderPoint(
            this.target.x % this.cell_size,
            this.target.y % this.cell_size,
            '#000000'
        );

        // also render blocking points
        for (var i = 0; i < this.blockingPoints.length; i++) {
            this._renderPoint(
                this.blockingPoints[i].x,
                this.blockingPoints[i].y,
                '#F00000'
            );
        }

        // make a line from the origin
        this.ctx.beginPath();
        this.ctx.moveTo(
            this.origin_x * this.cell_size,
            this.origin_y * this.cell_size
        );
        this.ctx.lineTo(
            this.target.x,
            this.target.y
        );
        this.ctx.strokeStyle = '#000000';
        this.ctx.stroke();
    }

    // Add a blocking point
    addBlockingPoint(x_px, y_px) {
        if (x_px > this.width * this.cell_size
            || y_px > this.height * this.cell_size) {
                return;
        }
        // stored as modulo cell_size, since a blocking
        // point doesn't exist in any particular cell
        this.blockingPoints.push({
            x: x_px % this.cell_size,
            y: y_px % this.cell_size
        });
    }

    clearBlockingPoints() {
        this.blockingPoints = [];
    }
}