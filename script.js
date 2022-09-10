let turnCount = 1

const moveTracker = {
    c1r1 : '',
    c2r1 : '',
    c3r1 : '',
    c1r2 : '',
    c2r2 : '',
    c3r2 : '',
    c1r3 : '',
    c2r3 : '',
    c3r3 : '',
}


const grid = document.querySelectorAll('.grid')

const checkCol = (player) => {
    let count = 0
    for (r = 1; r <=3; r++){
        
        for (c = 1; c <=3; c++){
            if(moveTracker[`c${c}r${r}`]===player){
                count += 1}
            console.log(`col ${count}`)
            return count === 3?true:false
            
        }
    }    
} 

const checkRow = (player) => {
    let count = 0
    for (c = 1; c <= 3; c++){
        
        for (r = 1; r <= 3; r++){
            moveTracker[`c${c}r${r}`]===player?++count:null
            console.log(`row ${count}`)
            return count === 3?true:false
            
        }
    }    
} 

const checkWin = (player) => {
    (checkCol(player)==true||checkRow(player)==true)?console.log(`${player} wins!`):console.log(`No win yet...`)
}

const drawX = () => {
    event.target.classList.add('playerx')
    event.target.innerText = 'X'
    const id = event.target.id
    moveTracker[id] = 'x'
    checkWin('x')
}

const drawO = () => {
    event.target.classList.add('player0')
    event.target.innerText = 'O'
    const id = event.target.id
    moveTracker[id] = 'o'    
    checkWin('o')
}
 
const drawAny = () => {
    (turnCount % 2 === 0)?drawO():drawX();
    turnCount++;
    console.log(moveTracker)
}

const pushListener = () => {
    for (i = 0; i < grid.length; i++) {
        grid[i].addEventListener('click', drawAny)
    }
}
document.addEventListener('DOMContentLoaded', pushListener)


