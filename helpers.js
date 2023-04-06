let grid = [];

function mergeCells(arr){
    let i = 0;
    let newArr = [];
    while(i<arr.length){
        if(i<arr.length && arr[i] == arr[i+1]){
            newArr.push(arr[i]*2);
            i ++ ;
        }
        newArr.push(arr[i]);
        i ++ ;
    }
    return newArr;
}

function insertValue(){
    if(emptyCells.length == 0){
        lose() ;
        return false ;
    }
    let index = Math.floor(Math.random() * emptyCells.length);
    let i = emptyCells[index][0];
    let j = emptyCells[index][1];
    let value = possibleInserts[Math.floor(Math.random() * possibleInserts.length)];
    document.querySelector(`#cell-${i}-${j}`).classList.add(`cell-${value}`);
    document.querySelector(`#cell-${i}-${j}`).innerHTML = value;
    grid[i][j] = value;
    emptyCells.splice(index, 1);
    return true ;
}

// update board
function updateBoard(prevGrid){
    for(let i = 0; i < NROWS; i++){
        for(let j = 0; j < NCOLS; j++){
            document.querySelector(`#cell-${i}-${j}`).classList.remove(`cell-${prevGrid[i][j]}`);
            document.querySelector(`#cell-${i}-${j}`).classList.add(`cell-${grid[i][j]}`);
            document.querySelector(`#cell-${i}-${j}`).classList.add(`game-cell`);
            if(grid[i][j])
                document.querySelector(`#cell-${i}-${j}`).innerHTML = `${grid[i][j]}` ;
            else
                document.querySelector(`#cell-${i}-${j}`).innerHTML = `` ;

        }
    }
        
}

function swipeRight() {
    newEmptyCells = [];
    let prevGrid = [] ;
    for(let i = 0 ; i < NROWS ; i ++){
        prevGrid.push(grid[i].slice());
    }
    for (let x = 0; x < NROWS; x++) {
        let elems = [] ;
        for (let y = NCOLS - 1 ; y >= 0 ; y--) {
            if(grid[x][y])
                elems.push(grid[x][y]) ;
        }
        elems = mergeCells(elems);
        let y = NCOLS-1 ;
        for(let k = 0 ; k < elems.length ; k ++){
            grid[x][y] = elems[k] ;
            y -- ;
        }
        while(y >= 0){
            grid[x][y] = 0 ;
            newEmptyCells.push([x,y]);
            y -- ;
        }
    }
    emptyCells = newEmptyCells;
    updateBoard(prevGrid);
    return insertValue() ;
}

function swipeLeft(){
    newEmptyCells = [];
    let prevGrid = [] ;
    for(let i = 0 ; i < NROWS ; i ++){
        prevGrid.push(grid[i].slice());
    }
    for (let x = 0; x < NROWS; x++) {
        let elems = [] ;
        for (let y = 0 ; y < NCOLS ; y++) {
            if(grid[x][y])
                elems.push(grid[x][y]) ;
        }
        elems = mergeCells(elems);
        let y = 0 ;
        for(let k = 0 ; k < elems.length ; k ++){
            grid[x][y] = elems[k] ;
            y ++ ;
        }
        while(y < NCOLS){
            grid[x][y] = 0 ;
            newEmptyCells.push([x,y]);
            y ++ ;
        }
    }
    emptyCells = newEmptyCells ;
    updateBoard(prevGrid) ;
    return insertValue() ;
}
function swipeUp(){
    newEmptyCells = [];
    let prevGrid = [] ;
    for(let i = 0 ; i < NROWS ; i ++){
        prevGrid.push(grid[i].slice());
    }
    for (let y = 0; y < NCOLS; y++) {
        let elems = [] ;
        for (let x = 0 ; x < NROWS ; x++) {
            if(grid[x][y])
                elems.push(grid[x][y]) ;
        }
        elems = mergeCells(elems);
        let x = 0 ;
        for(let k = 0 ; k < elems.length ; k ++){
            grid[x][y] = elems[k] ;
            x ++ ;
        }
        while(x < NROWS){
            grid[x][y] = 0 ;
            newEmptyCells.push([x,y]);
            x ++ ;
        }
    }
    emptyCells = newEmptyCells ;
    updateBoard(prevGrid) ;
    return insertValue() ;
}
function swipeDown(){
    newEmptyCells = [];
    let prevGrid = [] ;
    for(let i = 0 ; i < NROWS ; i ++){
        prevGrid.push(grid[i].slice());
    }
    for (let y = 0; y < NCOLS; y++) {
        let elems = [] ;
        for (let x = NROWS - 1 ; x >= 0 ; x--) {
            if(grid[x][y])
                elems.push(grid[x][y]) ;
        }
        elems = mergeCells(elems);
        let x = NROWS-1 ;
        for(let k = 0 ; k < elems.length ; k ++){
            grid[x][y] = elems[k] ;
            x --;
        }
        while(x >= 0){
            grid[x][y] = 0 ;
            newEmptyCells.push([x,y]);
            x -- ;
        }
    }
    emptyCells = newEmptyCells ;
    updateBoard(prevGrid) ;
    return insertValue() ;
}

function initBoard(){
    grid = [] ;
    gameBoard.innerHTML = "" ;
    for (let i = 0; i < NROWS ; i++) {
        row = [];
        for (let j = 0; j < NCOLS ; j++) {
            const cell = document.createElement('div');
            cell.classList.add('game-cell');
            // give cell id "cell-i-j"
            cell.id = `cell-${i}-${j}`;
            row.push(0);
            emptyCells.push([i,j]);
            gameBoard.appendChild(cell);
        }
        grid.push(row.slice());
    }
}