/* script.js */
const DEFAULT_COLOR = "black";
const DEFAULT_MODE = "plaint";
const DEFAULT_SIZE = 10;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

// Create Grid
const grid = document.querySelector("#grid-container");
const gridButtons = document.querySelectorAll(".extendGrid");
const colorButtons = document.querySelectorAll(".changeColor");
const eraseButton = document.querySelector(".eraseColor");
const clearButton = document.querySelector(".clear");

function clearGrid() {
    let child = document.getElementById("s0");
    for(let i = 0; i < (currentSize * currentSize); i++) {
        child.style.backgroundColor = "white";
        child = document.getElementById(`s${i+1}`);
    }
}

clearButton.addEventListener("click", clearGrid);

let mouseDown = false;
document.body.onmousedown = () => {mouseDown = true;};
document.body.onmouseup = () => {mouseDown = false;};

function changeColor(e) {
    if (e.type === "mouseenter" && !mouseDown) return
    if (currentMode === "erase")
        e.target.style.backgroundColor = "white";
    else
        e.target.style.backgroundColor = currentColor;
}

colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        currentColor = button.id;
    })
})

eraseButton.addEventListener("click", () => {currentMode = "erase"});

function createGrid(height, width) {
    grid.removeAttribute("class") 

    let child = grid.lastElementChild;
    while (child) {
        grid.removeChild(child);
        child = grid.lastElementChild;
    }

    grid.classList.add(`grid-${height}x${width}`);
    for(let i = 0; i < height * width; i++) {
        const square = document.createElement("div");
        square.setAttribute("class", "square");
        square.id = `s${i}`;
        square.addEventListener("mouseenter", changeColor);
        square.addEventListener("mousedown", changeColor)
        grid.appendChild(square);
    }
}

gridButtons.forEach((button) => {
    button.addEventListener("click", () => {
        currentSize = button.id
        createGrid(currentSize, currentSize);
    });
})

createGrid(DEFAULT_SIZE, DEFAULT_SIZE);