const gamma = 0.8 ;
const living_reward = 0.1 ;
const NCOLS = 4, NROWS = 4;
const dying_reward = 1 ;
const dp = new Map();
moves = [swipeDown,swipeLeft,swipeRight,swipeUp] ;

function optimize(carry){
    let prevGrid = [] ;
    for(let i = 0 ; i < NROWS ; i ++){
        prevGrid.push(grid[i].slice());
    }
    // choose next move at random
    let nextMove = moves[Math.floor(Math.random() * moves.length)] ;
    if(!nextMove()){
        let val = parseInt(carry) - parseInt(dying_reward) ;
        if(dp.has(prevGrid)){
            val = Math.max(val,dp.get(prevGrid)) ;
        }
        dp.set(val) ;
        console.log(val) ;
        return val ;
    }
    let newVal = gamma*optimize(grid) + living_reward ;
    let val = newVal ;
    if(dp.has(prevGrid)){
        val = Math.max(val,dp.get(prevGrid)) ;
    }
    dp.set(prevGrid,val) ;
    console.log(val) ;
    return val ;
}

async function train(){
    while(true){
        initBoard() ;
        optimize(0) ;
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}