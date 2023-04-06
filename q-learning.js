const NCOLS = 4, NROWS = 4;
const gamma = 0.8 ;
const living_reward = 0.1, dying_reward = 1 ;
let RANDOM_THRESHOLD = 0.5 ;
const RANDOM_THRESHOLD_DEC = 0.00005 ;

moves = [swipeDown,swipeLeft,swipeRight,swipeUp] ;
movesNames = ["D","L","R","U"] ;

function mTS(grid){
    let s = "" ;
    for(let i = 0 ; i < NROWS ; i ++){
        for(let j = 0 ; j < NCOLS ; j ++){
            s += grid[i][j] ;
        }
    }
    return s ;
}

let steps = 0 ;

function optimize(carry){
    steps ++ ;
    let prevGrid = [] ;
    for(let i = 0 ; i < NROWS ; i ++){
        prevGrid.push(grid[i].slice());
    }
    // choose next move at random
    let moveIdx = 0 , score = 0 ;
    movesNames.forEach((element,idx) => {
        const state = JSON.stringify([prevGrid,element]) ;
        if(dp.has(state) && dp.get(state) > score){
            moveIdx = idx ;
            score = dp.get(state) ;
        }
    });
    let nextMove = moves[moveIdx] ;
    if(Math.random() > RANDOM_THRESHOLD){
        moveIdx = Math.floor(Math.random() * moves.length) ;
        nextMove = moves[moveIdx] ;        
    }

    let val = 0 ;
    if(!nextMove()){
        val = parseInt(carry) - parseInt(dying_reward) ;
        // console.log(carry) ;
        // console.log(val) ;
        return val ;
    }else{
        // console.log(carry + living_reward) ;
        val = gamma*optimize(parseInt(carry) + parseInt(living_reward));
    }
    const state = JSON.stringify([prevGrid,movesNames[moveIdx]]) ;

    if(dp.has(state)){
        val = Math.max(val,dp.get(state)) ;
    }
    dp.set(state,val) ;
    // console.log(val) ;
    return val ;
}

function mapToTable(map) {
    // Create a new table element
    const table = document.querySelector("table")
  
    dp.forEach((value, key) => {
        // Create a new row element
        console.log(key,value) ;
        // row = "<tr></tr>"
        // row = `<tr><td>${key}</td><td>${value}</td></tr>`
        // table.innerHTML += row ;
    });
  
    return table;
  }
  
function saveTraining(){    
    // convert the Map object to a JSON string
    const json = JSON.stringify(Array.from(dp.entries()));
    
    // create a new Blob object from the JSON string
    const blob = new Blob([json], { type: 'application/json' });
    
    // create a new URL for the blob
    const url = URL.createObjectURL(blob);
    
    // create a new link element to download the file
    const link = document.createElement('a');
    link.href = url;
    link.download = 'myMap.json';
    
    // add the link to the document and click it to start the download
    document.body.appendChild(link);
    link.click();
    
    // clean up by revoking the URL
    URL.revokeObjectURL(url);
}

async function train(){
    i = 0 ;
    while(true){
        steps = 0 ;
        RANDOM_THRESHOLD -= RANDOM_THRESHOLD_DEC ;
        initBoard() ;
        optimize(0) ;
        // await new Promise(resolve => setTimeout(resolve, 1000));
        i ++ ;
        if(i%10 == 0)
            console.log("iteration "+i+ " finished with "+steps+" steps") ;  
        if(i > 1000)
            break ;
    }
    // const table = mapToTable(dp);
    saveTraining() ;

}