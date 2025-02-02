const cellNumber = 5;
let cols = cellNumber;
let rows = cellNumber;
let cellSize;
let currentSquare = 0;
let donuts = [];

function setup() {
    let canvasSize = windowHeight * 0.9;
    let canvas = createCanvas(canvasSize, canvasSize);
    canvas.position((windowWidth - canvasSize) / 2, (windowHeight - canvasSize) / 2);

    // Create a gradient background
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let inter = map(x + y, 0, width + height, 0, 1);
            let c = lerpColor(color(255, 255, 100, 100), color(0, 0, 0, 100), inter);
            stroke(c);
            point(x, y);
        }
    }

    cellSize = min(width / cols, height / rows);

    // Initialize 25 donuts, one for each cell
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let x = col * cellSize + cellSize / 2;
            let y = row * cellSize + cellSize / 2;
            donuts.push(new Donut(x, y));
        }
    }
}

function draw() {
    // Calculate the current square index based on frameCount
    let totalSquares = cols * rows;
    let period = 100; // Control period by a parameter
    currentSquare = floor((frameCount / period) % totalSquares); // Switch based on the period

    // Calculate the row and column of the current square
    let currentCol = currentSquare % cols;
    let currentRow = floor(currentSquare / cols);

    // Calculate the position of the point
    let pointX = currentCol * cellSize + cellSize / 2;
    let pointY = currentRow * cellSize + cellSize / 2;

    // Draw the point
    fill(255, 0, 0); // Red color for the point
    noStroke();

    // Draw all donuts
    donuts.forEach(donut => donut.draw());
}