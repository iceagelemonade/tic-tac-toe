let turnCount = 1
let vsComputer = false
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

const playerInd = (player) => {
    let text = ''
    if (vsComputer == 'true' && player == 'O') {
        text = `(computer) `
        } else if (vsComputer == 'true' && player == 'X') {
        text = `(player) `
    }
    return `Player ${player}'s ${text}turn\n(pick any empty square)`
}
const checkRow = (player,value) => {
    
    for (r = 1; r <=3; r++){
        let count = 0
        for (c = 1; c <=3; c++){
            moveTracker[`c${c}r${r}`]===player?++count:null
            if (count === value) {
                winPosition = `r${r}`
                winner = player
                return true
            }
            
        }
    }    
} 

const checkCol = (player,value) => {
    
    for (c = 1; c <= 3; c++){
        let count = 0
        for (r = 1; r <= 3; r++){
            moveTracker[`c${c}r${r}`]===player?++count:null
            if (count === value) {
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
    
    drawWin()
    const playerCap = player.toUpperCase()
    const winSplash = document.createElement('div')
    winSplash.className = "winSplash"
    winSplash.innerHTML = `${playerCap} has Won!<br /><small><small>(click anywhere to clear and play again)</small></small>`
    winSplash.addEventListener('click', acknowledgeWin)
    gridBackground.appendChild(winSplash)
    player==='x'?xWinCount++:oWinCount++

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
    (checkCol(player,3)==true||checkRow(player,3)==true||checkDia(player)==true)?printWin(player):checkTie()
}



const drawX = () => {
    event.target.classList.add('playerx')
    event.target.innerText = 'X'
    const id = event.target.id
    moveTracker[id] = 'x'
    checkWin('x')
    document.querySelector('.instructions').innerText = playerInd('O')
}

const drawO = () => {
    event.target.classList.add('playero')
    event.target.innerText = 'O'
    const id = event.target.id
    moveTracker[id] = 'o'    
    checkWin('o')
    document.querySelector('.instructions').innerText = playerInd('X')
}
 
const drawAny = () => {
    (turnCount % 2 === 0)?drawO():drawX()
    ++turnCount
    if (vsComputer === 'true' && turnCount%2 === 0  && document.querySelector('.winSplash') === null) {
        // added a timer because the computer was moving so quickly i got freaked out
        setTimeout(function(){
            aiMoveCalc()
        }, 350);
    }
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
    document.querySelector('.instructions').innerText = `Player X's Turn\n(click any square to start)`
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
        if (document.querySelector('.winSplash') != undefined) {
            document.querySelector('.winSplash').remove()
        }
        if (document.querySelector('.winLine') != undefined){
            document.querySelector('.winLine').remove()
        }
        
        xWinCount = 0
        oWinCount = 0
        document.querySelector('#win-tracker').innerText = `Player X Wins = ${xWinCount} || Player O Wins = ${oWinCount}`
    }
}

const gameTypeAlert = () =>{
    if (turnCount > 1) {
        let text = "Warning! Changing the game type in the middle of a game will clear the game board and reset the win counters\nClick 'OK' to proceed of 'Cancel' to go back."
        if (confirm(text) === true) {
            clearAll()
            xWinCount = 0
            oWinCount = 0
            document.querySelector('#win-tracker').innerText = `Player X Wins = ${xWinCount} || Player O Wins = ${oWinCount}`
            vsComputer = document.querySelector('#type').value
            if (document.querySelector('.winSplash') != undefined) {
                document.querySelector('.winSplash').remove()
            }
            if (document.querySelector('.winLine') != undefined){
                document.querySelector('.winLine').remove()
            }
        } else {
            document.querySelector('#type').value = "false"
        }
    } else {
        xWinCount = 0
        oWinCount = 0
        document.querySelector('#win-tracker').innerText = `Player X Wins = ${xWinCount} || Player O Wins = ${oWinCount}`
        vsComputer = document.querySelector('#type').value
        if (document.querySelector('.winSplash') != undefined) {
            document.querySelector('.winSplash').remove()
        }
        if (document.querySelector('.winLine') != undefined){
            document.querySelector('.winLine').remove()
        }
    }
}

//this is probably super inefficient. I didn't define win conditions as an object when just building player vs player, so i do it here and use my win check events to dictate the computers move. chunky chunky.
//given more time I would allow for the computer to go first by just tweaking these events with more params but that will wait
const aiMoveCalc = () => {
    let diaMove =''
    const winCondition = {
        r1 : ['c1r1','c2r1','c3r1'],
        r2 : ['c1r2','c2r2','c3r2'],
        r3 : ['c1r3','c2r3','c3r3'],
        c1 : ['c1r1','c1r2','c1r3'],
        c2 : ['c2r1','c2r2','c2r3'],
        c3 : ['c3r1','c3r2','c3r3'],
        d1 : ['c1r1','c2r2','c3r3'],
        d2 : ['c3r1','c2r2','c1r3'],
    }
    const aiDiaCheck = (player, pos) => {
        count = 0
        for (let value of winCondition[pos]) {
            if (moveTracker[value] === player) {
                count++
            }
            if (count === 2) {
                for (let newVal of winCondition[pos]) {
                    if (moveTracker[newVal] === '') {
                        diaMove = newVal
                        return true
                    }
                }
            }    
        }
        return false
    }
    const nextBestOne =() => {
        for (let value of winCondition[winPosition]){
            if (moveTracker[value] === 'x') {
                return false
            } 
        } 
        return true
    }
   const aiMove = () => {
        if (checkRow('o',2) === true) {
            for(let value of winCondition[winPosition]) {
                if (moveTracker[value] === '') {
                    return value
                } winPosition = null
            }
        } 
        if (checkCol('o',2) === true) {
            for(let value of winCondition[winPosition]) {
                if (moveTracker[value] === '') {
                    return value
                } winPosition = null
            }
        }
        if (aiDiaCheck('o','d1')===true){
            return diaMove    
        }
        if (aiDiaCheck('o','d2')===true){
            return diaMove           
        }
        if (checkRow('x',2) === true) {
            for(let value of winCondition[winPosition]) {
                if (moveTracker[value] === '') {
                    return value
                } winPosition = null
            }
        } 
        if (checkCol('x',2) === true) {
            for(let value of winCondition[winPosition]) {
                if (moveTracker[value] === '') {
                    return value
                } winPosition = null
            }
        }
        if (aiDiaCheck('x','d1')===true){
            return diaMove    
        }
        if (aiDiaCheck('x','d2')===true){
            return diaMove            
        }
        if (checkRow('o',1) === true && nextBestOne() === true) {
            for(let value of winCondition[winPosition]) {
                if (moveTracker[value] === '') {
                    return value
                } winPosition = null
            }
        }
        if (checkCol('o',1) === true && nextBestOne() === true) {
            for(let value of winCondition[winPosition]) {
                if (moveTracker[value] === '') {
                    return value
                } winPosition = null
            }
        }
        if (moveTracker.c2r2 === '') {
            return 'c2r2'
         
        } 
        if (moveTracker.c2r2 === 'x'){
            return 'c1r1'
        }
            const arr = []
            for (let [prop, value] of Object.entries(moveTracker)) {
                if (value === '') {
                    arr.push(prop)
                }  winPosition = null             
            }
            const rand = Math.floor(Math.random() * arr.length)
            return  arr[rand]
          
    }
    const move = aiMove()
    document.getElementById(`${move}`).click();
    
}

