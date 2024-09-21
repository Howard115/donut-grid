let cols = 10;
let rows = 10;
let cellSize;
let currentSquare = 0;

function setup() {
    let canvasSize = windowHeight * 0.9;
    let canvas = createCanvas(canvasSize, canvasSize);
    canvas.position((windowWidth - canvasSize) / 2, (windowHeight - canvasSize) / 2);
    background(220);
    cellSize = min(width / cols, height / rows);
}

function draw() {
    background(220); // Clear the canvas each frame

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * cellSize;
            let y = j * cellSize;
            stroke(0);
            strokeWeight(1);
            noFill();
            rect(x, y, cellSize, cellSize);
        }
    }

    // Calculate the current square index based on frameCount
    let totalSquares = cols * rows;
    currentSquare = floor((frameCount / 30) % totalSquares); // Switch every 0.5 seconds (60 frames per second * 0.5)

    // Calculate the row and column of the current square
    let currentCol = currentSquare % cols;
    let currentRow = floor(currentSquare / cols);

    // Calculate the position of the point
    let pointX = currentCol * cellSize + cellSize / 2;
    let pointY = currentRow * cellSize + cellSize / 2;

    // Draw the point
    fill(255, 0, 0); // Red color for the point
    noStroke();
    ellipse(pointX, pointY, 10, 10); // Draw the point with a diameter of 10 pixels
}