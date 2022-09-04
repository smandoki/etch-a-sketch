//initialization variables and function calls
const gridSideLength = 600;
const grid = document.querySelector('#grid');
const colorPicker = document.querySelector('#color-picker');
const slider = document.querySelector('#grid-size');
const sliderLabel = document.querySelector('label');
let mode = 'draw';
let gridSize = Number(slider.value);
let hue = 0;
let saturation = 100;
let brightness = 100;
createGrid(grid, gridSize, gridSideLength);


/*
    Handle mode selection
*/
const buttons = Array.from(document.querySelectorAll('button'));
buttons.pop(); //omit clear button since it is not a selectable mode

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        const selectedButton = document.querySelector(`#${mode}`);
        selectedButton.classList.remove('selected')

        if (button === e.target) {
            button.classList.add('selected');
            mode = button.id;
        }
    });
});



/*
    Handle range slider input
*/
slider.oninput = () => {
    gridSize = Number(slider.value);
    sliderLabel.innerText = `Grid Size ${gridSize}x${gridSize}`;
}

slider.addEventListener('mouseup', () => {
    createGrid(grid, gridSize, gridSideLength);
});


//populate grid with divs
function createGrid(grid, gridSize, gridSideLength) {
    //remove original grid
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    //create new grid
    const divSideLength = gridSideLength / gridSize;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const div = document.createElement('div');
        div.style.height = `${divSideLength}px`;
        div.style.width = `${divSideLength}px`;

        div.addEventListener('mouseover', onMouseover);

        grid.appendChild(div);
    }
}

//drawing function
function onMouseover(e) {
    const div = e.target;

    switch (mode) {
        case 'draw':
            div.style.backgroundColor = 'black';
            break;

        case 'erase':
            div.style.backgroundColor = 'white';
            break;

        case 'rainbow':
            break;

        case 'shading':
            break;
    }
}