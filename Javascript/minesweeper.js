//Game Info
const EASY = {height: 8, width: 15, mines: 24};
const NORMAL = {height: 16, width: 30, mines: 99};
const HARD = {height: 24, width: 45, mines: 222};
let difficulty = {};
const boardHeight = 512;
const boardWidth = 960;
let mineLocations = [];
let firstClick = true;
let gameOver = false;
let win = false;
let flags = 0;
let totalSelected = 0;
//html objects
const gameContainer = document.querySelector(".game-container");
const resetButton = document.querySelector(".reset-btn");
const diffSelector = document.querySelector(".diff-change");
const flagDisplay = document.querySelector(".flag-tracker");
const instructionsDisplay = document.querySelector(".instructions");
const instructionsText = document.querySelector(".instructions-text");

//Resets variables to starting values and removes all blocks
function clearBoard() {
    mineLocations = [];
    firstClick = true;
    gameOver = false;
    totalSelected = 0;
    const blocks = document.querySelectorAll(".block");
    blocks.forEach((block) => {
        gameContainer.removeChild(block);
    });
}

//Sets gameOver to true and selects all bombs while altering any
//wrongly placed flags
function gameOverEvent() {
    const bombs = document.querySelectorAll(".bomb");
    const flagged = document.querySelectorAll(".flagged");
    bombs.forEach((bomb) => {
        if (!bomb.classList.contains("flagged")) {
            bomb.style.backgroundColor = "red";
        }
    });
    flagged.forEach((flag) => {
        if (!flag.classList.contains("bomb")) {
            flag.textContent = "X";
            flag.style.backgroundColor = "red";
        }
    });
    gameOver = true;
    console.log("The game has ended");
}

//Sets win to true, clears the board and has a message.
function winEvent () {
    clearBoard();
    gameContainer.innerHTML = "YOU WIN !";
}

//Returns a block's surrounding blocks and updates its amount
//of bombs around or flags around
function getBlocksAround(block, className) {
    const blocksAround = [];
    let totalBombsAround = 0;
    let totalFlagsAround = 0;
    let blockRow = Number(block.id.split("_")[1]);
    let blockCol = Number(block.id.split("_")[2]);
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j<= 1; j++) {
            let row = blockRow + i;
            let column = blockCol + j;
            if (!(i == 0 && j == 0) &&
                !(row < 0 || column < 0) && 
                !(row >= difficulty.height || column >= difficulty.width)) {
                const blockID = `#_${row}_${column}`;
                const otherBlock = document.querySelector(blockID);
                if (className == "bomb" && otherBlock.classList.contains("bomb")) {
                    totalBombsAround++;
                } else if (className == "flagged" && otherBlock.classList.contains("flagged")) {
                    totalFlagsAround++;
                }
                blocksAround.push(otherBlock);
            }
        }
    }
    if (className == "bomb") {
        return [totalBombsAround, blocksAround];
    } else if (className == "flagged") {
        return [totalFlagsAround, blocksAround];
    }
}

//Selects the block and, if no bombs around, selects surrounding blocks
function selectBlock(block) {
    let blocksAround = [];
    let totalBombsAround = 0;

    if (!block.classList.contains("selected") && !block.classList.contains("flagged")) {
        if (block.classList.contains("bomb")) {
            gameOverEvent();
        } else {
            totalSelected++;
            block.classList.add("selected");
            const bombsAndBlocks = getBlocksAround(block, "bomb");
            totalBombsAround = bombsAndBlocks[0];
            blocksAround = bombsAndBlocks[1];
            if (totalBombsAround > 0) {
                block.innerHTML = `${totalBombsAround}`;
            } else {
                blocksAround.forEach((blockAround) => selectBlock(blockAround));
            }
        }
    }
    console.log(totalSelected);
    console.log(difficulty.height * difficulty.width - difficulty.mines);
    if (totalSelected == difficulty.height * difficulty.width - difficulty.mines) {
        winEvent();
    }
}

//Generates new board with new block positions (no bombs till first click).
function generateNewBoard() {
    //Clearing old blocks and resetting flag count
    clearBoard();
    flags = difficulty.mines;
    flagDisplay.textContent = `Flags Left: ${flags}`;
    //Adding new blocks to the board
    const h = (boardHeight / difficulty.height) - 4;
    const w = (boardWidth / difficulty.width) - 4;
    for (let r = 0; r < difficulty.height; r++) {
        for (let c = 0; c < difficulty.width; c++) {
            createAndAddNewBlock(r, c, h, w);
        }
    }
}

//Determines bomb positions after first click (1 block radius safe zone
//around first click).
function determineAndPlaceBombs(safeSpots) {
    //Getting total amount of mines and potentials spots.
    let totalMines = difficulty.mines;
    let totalSpots = difficulty.height * difficulty.width;
    for (let i = 0; i < totalMines; i++) {
        const newSpot = Math.trunc(Math.random() * totalSpots);
        if (mineLocations.includes(newSpot)) {
            //No repeats, if the mine was already chosen then it can't be again.
            i--; 
        } else {
            //Adds location to the associated array, gets the new points on the board and 
            //adds the bomb id to the given block.
            mineLocations.push(newSpot);
            const row = Math.trunc(newSpot / difficulty.width);
            const column = Math.trunc(newSpot % difficulty.width);
            const newID = `#_${row}_${column}`;
            if (!safeSpots.includes(newID)) {
                const bombBlock = document.querySelector(newID);
                bombBlock.classList.add("bomb");
            } else {
                i--;
            }
        }
    }
    mineLocations.sort();
}

//Adds block event listeners
function addEventListeners(block) {
    //Right Click flags or unflags a block
    block.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (!gameOver && !block.classList.contains("selected")) {
            if (block.classList.contains("flagged")) {
                block.classList.remove("flagged");
                flags++;
            } else if (flags != 0) {
                block.classList.add("flagged");
                flags--;
            }
            flagDisplay.textContent = `Flags Left: ${flags}`;
        }
    }, false);
    //Clicking selects spot or starts game 
    block.addEventListener('click', () => {
        if (!block.classList.contains("flagged") && !gameOver) {
            if (firstClick) {
                let safeRow = Number(block.id.split("_")[1]);
                let safeColumn = Number(block.id.split("_")[2]);
                const safeSpots = [];
                for (let r = -1; r <= 1; r++) {
                    for (let c = -1; c <= 1; c++) {
                        safeSpots.push(`#_${safeRow + r}_${safeColumn + c}`);
                    }
                }
                determineAndPlaceBombs(safeSpots);
                firstClick = false;
            } 
            selectBlock(block);
        }
    });
    //Dbl Clicking reveals all the adjacent blocks if the correct amount of flags are placed
    block.addEventListener('dblclick', () => {
        if (block.classList.contains("selected") && !gameOver) {
            const flagsAndBlocks = getBlocksAround(block, "flagged");
            let numFlagsAround = flagsAndBlocks[0];
            let blocksAround = flagsAndBlocks[1];
            if (numFlagsAround == Number(block.textContent)) {
                blocksAround.forEach((blockAround) => selectBlock(blockAround));
            }
        }
    });
}

//Generates a new block at a new position with associated dimensions.
function createAndAddNewBlock(row, column, height, width) {
    //Creating the new block and establishing style and dimensions.
    const newBlock = document.createElement('div');
    newBlock.style.cssText = `width: ${width}px; height: ${height}px; line-height: ${height}px;`;
    newBlock.classList.add("block");
    const newID = `_${row}_${column}`
    newBlock.setAttribute('id', newID);
    //Adding new event listeners for the block
    addEventListeners(newBlock);
    //Append new block to the gamecontainer
    gameContainer.appendChild(newBlock);
}

//Resets board
function reset() {
    switch(diffSelector.value) {
        case "EASY":
            difficulty = EASY;
            break;
        case "NORMAL":
            difficulty = NORMAL;
            break;
        case "HARD":
            difficulty = HARD;
            break;
    }
    clearBoard();
    gameContainer.innerHTML = "";
    generateNewBoard();
}

//Establishes reset button event 
resetButton.addEventListener('click', reset);

//Establishes instructions button event
instructionsDisplay.addEventListener('click', () => {
    instructionsText.classList.toggle("hidden");
});

//Default starting values and generates first game
difficulty = NORMAL;
generateNewBoard();