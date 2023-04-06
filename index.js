const speedSlider = document.getElementById("speed-slider");
const speedValue = document.querySelector(".slider-value");
SIMULATION_SPEED = speeds[speedSlider.value];

speedSlider.addEventListener("change", function() {
    SIMULATION_SPEED = speeds[this.value];
});

// add event listener to reset-button
document.querySelector('#reset-button').addEventListener('click', ()=>{
    window.location.reload();
});

const gameBoard = document.querySelector('.game-board');
gameBoard.style.gridTemplateColumns = `repeat(${NCOLS}, 1fr)`;
gameBoard.style.gridTemplateRows = `repeat(${NROWS}, 1fr)`;

let emptyCells = [];
let possibleInserts = [2,4];

// add 100 game cells to the game board



function lose(){
    console.log("lost") ;
}


  
function startGame(){
    // remove event listener from start-button
    document.querySelector('#start-button').removeEventListener('click', startGame);
    // remove event listener from game cells
    const gameCells = document.querySelectorAll('.game-cell');
    gameCells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
    // change instruction
    document.querySelector('.instruction').innerHTML = 'Game started';
    // start game
    simulate();
}

initBoard() ;

function runIters(){
    // get #nIters
    let nIters = document.querySelector('#nIters').value ;
    runIterations(nIters) ;
}


