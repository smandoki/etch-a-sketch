//initialization variables and function calls
const grid = document.querySelector('#grid');
const colorPicker = document.querySelector('#color-picker');
const slider = document.querySelector('#grid-size');
const sliderLabel = document.querySelector('label');
const clearButton = document.querySelector('#clear');
let mode = 'draw';
let gridSize = Number(slider.value);
createGrid(grid, gridSize);


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
    createGrid(grid, gridSize);
});


//populate grid with divs
function createGrid(grid, gridSize) {
    //remove original grid
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    //create new grid
    grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    
    for (let i = 0; i < gridSize ** 2; i++) {
        const div = document.createElement('div');
        div.addEventListener('mouseover', onMouseover);
        grid.appendChild(div);
    }
}

//drawing function
function onMouseover(e) {
    const div = e.target;
    
    switch (mode) {
        case 'draw':
            div.style.backgroundColor = colorPicker.value;
            break;

        case 'erase':
            div.style.backgroundColor = 'white';
            break;

        case 'rainbow':
            div.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`
            break;
    }
}

//clear functionality
clearButton.onclick = () => {
    createGrid(grid, gridSize);
}