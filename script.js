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

let xWinCount = 0
let oWinCount = 0
let winner = null
let winPosition = null

const grid = document.querySelectorAll('.grid')
const gridBackground = document.querySelector('.grid-background') 


const checkRow = (player) => {
    
    for (r = 1; r <=3; r++){
        let count = 0
        for (c = 1; c <=3; c++){
            moveTracker[`c${c}r${r}`]===player?++count:null
            console.log(`row ${count}`)
            if (count === 3) {
                winPosition = `r${r}`
                winner = player
                return true
            }
            
        }
    }    
} 

const checkCol = (player) => {
    
    for (c = 1; c <= 3; c++){
        let count = 0
        for (r = 1; r <= 3; r++){
            moveTracker[`c${c}r${r}`]===player?++count:null
            console.log(`col ${count}`)
            if (count === 3) {
                winPosition = `c${c}`
                winner = player
                return true
            }
            
        }
    }    
}

const checkDia = (player) =>{
    if (moveTracker.c2r2 === player) {
        if (moveTracker.c1r1 === player && moveTracker.c3r3 === player){
            winPosition ='d1'
            winner = player
            return true
        } else if (moveTracker.c3r1 === player && moveTracker.c1r3 === player){
            winPosition = 'd2'
            winner = player
            return true
        } 
    }
}

const drawWin = () => {
    const lineWin = document.createElement('div')

    if (winPosition === 'c1' || winPosition === 'c2' || winPosition === 'c3') {
        lineWin.className = 'col'
        if (winPosition === 'c1') {
            lineWin.style.left = '96px'
        } else if (winPosition === 'c2') {
            lineWin.style.left = '300px'
        } else {
            lineWin.style.left = '504px'
        }
        if (winner === 'x'){
            lineWin.style.backgroundColor = 'green'
        } else {
            lineWin.style.backgroundColor = 'red'
        }

    } else if (winPosition === 'r1' || winPosition === 'r2' || winPosition === 'r3') {
        lineWin.className = 'row'
        if (winPosition === 'r1') {
            lineWin.style.top = '96px'
        } else if (winPosition === 'r2') {
            lineWin.style.top = '300px'
        } else {
            lineWin.style.top = '504px'
        }
        if (winner === 'x'){
            lineWin.style.backgroundColor = 'green'
        } else {
            lineWin.style.backgroundColor = 'red'
        }

    } else {
        lineWin.className = 'dia'
        winner === 'x'?lineWin.style.backgroundColor = 'green':lineWin.style.backgroundColor ='red'
        winPosition === 'd1'?lineWin.style.transform = 'rotate(-45deg)':lineWin.style.transform = 'rotate(45deg)'
    }
    lineWin.classList.add('winLine')
    gridBackground.appendChild(lineWin)

}

const printWin = (player) => {
    console.log(`${player} wins!`)
    drawWin()
    const playerCap = player.toUpperCase()
    const winSplash = document.createElement('div')
    winSplash.className = "winSplash"
    winSplash.innerHTML = `${playerCap} has Won!<br /><small><small>(click anywhere to clear and play again)</small></small>`
    winSplash.addEventListener('click', acknowledgeWin)
    gridBackground.appendChild(winSplash)
    player==='x'?xWinCount++:oWinCount++
    
    console.log(`Win Position = ${winPosition} || Winner = ${winner}`)

}

const checkTie = () => {
    if (turnCount === 9) {
        const lineWin = document.createElement('div')        
        lineWin.classList.add('winLine')
        gridBackground.appendChild(lineWin)
        const winSplash = document.createElement('div')
        winSplash.className = "winSplash"
        winSplash.innerHTML = `DRAW!<br /><small><small>(click anywhere to clear and play again)</small></small>`
        winSplash.addEventListener('click', acknowledgeWin)
        gridBackground.appendChild(winSplash) 

    }
}

const checkWin = (player) => {
    (checkCol(player)==true||checkRow(player)==true||checkDia(player)==true)?printWin(player):checkTie()
}



const drawX = () => {
    event.target.classList.add('playerx')
    event.target.innerText = 'X'
    const id = event.target.id
    moveTracker[id] = 'x'
    checkWin('x')
}

const drawO = () => {
    event.target.classList.add('playero')
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
        grid[i].addEventListener('click', drawAny, {once: true})
    }
}
document.addEventListener('DOMContentLoaded', pushListener)

const clearAll = () => {
    for (i = 0; i < grid.length; i++){
        grid[i].className="grid";
        grid[i].innerText='';
    }    
    turnCount = 1;
    pushListener();
    for (r = 1; r <=3; r++){
        for (c = 1; c <=3; c++){
            moveTracker[`c${c}r${r}`] = ''    
        }
    }
}

const acknowledgeWin = () => {
    document.querySelector('.winSplash').remove()
    document.querySelector('.winLine').remove()
    clearAll()
    winner = null
    document.querySelector('#win-tracker').innerText = `Player X Wins = ${xWinCount} || Player O Wins = ${oWinCount}`
}

const resetAlert = () => {
    let text = "Warning! Resetting will clear the game board and reset the win counters\nClick 'OK' to proceed of 'Cancel' to go back."
    if (confirm(text) === true) {
        clearAll()
        if (winner != null) {
            document.querySelector('.winSplash').remove()
            document.querySelector('.winLine').remove()
        }
        xWinCount = 0
        oWinCount = 0
        document.querySelector('#win-tracker').innerText = `Player X Wins = ${xWinCount} || Player O Wins = ${oWinCount}`
    }
}
