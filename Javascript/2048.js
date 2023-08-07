let moved = false;
let score = 0;
let moves = 0;
let gameOver = false;
const colors = {
    "4": "#3385FF",
    "8": "#3365FF",
    "16": "#3345FF",
    "32": "#3325FF",
    "64": "#3305FF",
    "128": "#7a05FF",
    "256": "#e00000",
    "512": "#a00000",
    "1024": "#4c03f4",
    "2048": "#b433ff",
    "4096": "#black",
}
const grid = document.querySelector('.grid');
const tileContainer = document.querySelector('.tile-container');
const winMessage = document.querySelector('.win-message');
const loseMessage = document.querySelector('.lose-message');
const scoreBoard = document.querySelector('.score');
const moveBoard = document.querySelector('.moves-made');
const resetButton = document.querySelector('.reset');

function buildGrid() {
    for (let i = 0; i < 4; i++) {
        const newRow = document.createElement('div');
        newRow.classList.add('grid-row');
        for (let j = 0; j < 4; j++) {
            const newGridBlock = document.createElement('div');
            newGridBlock.classList.add('grid-block');
            newRow.appendChild(newGridBlock);
        }
        grid.appendChild(newRow);
    }
}

function placeNewTile() {
    let newRow, newColumn;
    do {
        newRow = Math.trunc(Math.random() * 4) + 1;
        newColumn = Math.trunc(Math.random() * 4) + 1;
    } while (document.querySelectorAll(`.pos-${newRow}-${newColumn}`).length > 0)

    const newTile = document.createElement('div');
    newTile.classList.add('tile');
    newTile.classList.add(`pos-${newRow}-${newColumn}`);

    const newInnerTile = document.createElement('div');
    newInnerTile.classList.add('inner-tile');
    newInnerTile.textContent = Math.random() < 0.9 ? 2 : 4;
    newInnerTile.style.animationName = "tile-grow";

    if (newInnerTile.textContent == 4) { newInnerTile.style.backgroundColor = colors["4"]; }

    newTile.appendChild(newInnerTile);
    tileContainer.appendChild(newTile);
}

function placeMergedTile(row, column, num) {
    const newTile = document.createElement('div');
    newTile.classList.add('tile'); 
    newTile.classList.add(`pos-${row}-${column}`);

    const newInnerTile = document.createElement('div');
    newInnerTile.classList.add('inner-tile');
    newInnerTile.textContent = num;
    newInnerTile.style.animationName = "tile-pop";
    
    newInnerTile.style.backgroundColor = colors["" + num];
    score += num;
    scoreBoard.textContent = `Score: ${score}`;
    if (num == 2048) {
        winMessage.classList.add('fade-in-animation');
    }

    newTile.appendChild(newInnerTile);
    tileContainer.appendChild(newTile);
}

function placeFirstTiles() {
    placeNewTile(); placeNewTile();
}

function moveBlock(block, path, dir) {
    const blockPos = block.classList[1];
    let blockRow = Number(blockPos.split('-')[1]);
    let blockColumn = Number(blockPos.split('-')[2]);
    if (path == "horizontial") {
        while (blockColumn >= 1 && blockColumn <= 4) {
            const newSpot = `.pos-${blockRow}-${blockColumn + dir}`;
            if (document.querySelectorAll(newSpot).length > 0) {
                if (document.querySelector(newSpot).textContent === block.textContent &&
                    !document.querySelector(newSpot).classList.contains('merged')) {
                    document.querySelector(newSpot).classList.add('merged');
                    block.classList.add('merged');
                    blockColumn += dir;
                    placeMergedTile(blockRow, blockColumn, Number(block.textContent) * 2);
                } 
                break;
            }
            if (blockColumn + dir < 1 || blockColumn + dir > 4) { break; }
            blockColumn += dir;
        }
    } else if (path == "vertical") {
        while (blockRow >= 1 && blockRow <= 4) {
            const newSpot = `.pos-${blockRow + dir}-${blockColumn}`;
            if (document.querySelectorAll(newSpot).length > 0) {
                if (document.querySelector(newSpot).textContent === block.textContent &&
                    !document.querySelector(newSpot).classList.contains('merged')) {
                    document.querySelector(newSpot).classList.add('merged');
                    block.classList.add('merged');
                    blockRow += dir;
                    placeMergedTile(blockRow, blockColumn, Number(block.textContent) * 2);
                }
                break;
            }
            if (blockRow + dir < 1 || blockRow + dir > 4) { break; }
            blockRow += dir;
        }
    }
    const newPosition = `pos-${blockRow}-${blockColumn}`;
    if (blockPos != newPosition) {
        moved = true;
    }
    block.classList.remove(blockPos);
    block.classList.add(newPosition);
}

function moveBlocks(code) {
    moved = false;
    let tiles = document.querySelectorAll('.tile');
    tiles = Array.from(tiles);
    tiles = tiles.sort((a, b) => {
        return a.classList[1]> b.classList[1] ? 1 : -1;
    });
    switch (code) {
        case "ArrowRight":
            //console.log("right");
            tiles.reverse().forEach((tile) => {moveBlock(tile, "horizontial", 1);});
            break;
        case "ArrowLeft":
            //console.log("left");
            tiles.forEach((tile) => {moveBlock(tile, "horizontial", -1);});
            break;
        case "ArrowUp":
            //console.log("up");
            tiles.forEach((tile) => {moveBlock(tile, "vertical", -1);});
            break;
        case "ArrowDown":
            //console.log("down");
            (tiles.reverse()).forEach((tile) => {moveBlock(tile, "vertical", 1);});
            break;
        default: 
        //console.log("Not an option lol.");
    }
}

function clearMerged() {
    const merged = document.querySelectorAll('.merged');
    merged.forEach((m) => tileContainer.removeChild(m));
}

function checkGameOver() {
    let tiles = document.querySelectorAll('.tile');
    tiles = Array.from(tiles);
    tiles = tiles.sort((a, b) => {
        return a.classList[1]> b.classList[1] ? 1 : -1;
    });
    if (tiles.length == 16) {
        for (let i = 0; i <= 12; i += 4) {
            for (let j = 0; j <= 2; j++) {
                if (tiles[j + i].firstChild.textContent == tiles[j + i + 1].firstChild.textContent) {
                    gameOver = false;
                    return false;
                }
            }
        }
        for (let i = 0; i <= 8; i += 4) {
            for (let j = 0; j <= 3; j++) {
                if (tiles[j + i].firstChild.textContent == tiles[j + i + 4].firstChild.textContent) {
                    gameOver = false;
                    return false;
                }
            }
        }
        loseMessage.classList.add('fade-in-animation');
        return true;
    }
    return false;
}

function reset() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile) => {tileContainer.removeChild(tile)});
    score = 0;
    moves = 0;
    gameOver = false;
    scoreBoard.textContent = `Score: 0`;
    moveBoard.textContent = `Moves Made: 0`;
    const messages = document.querySelectorAll('.fade-in-animation');
    if (messages.length > 0) {
        messages.forEach((message) => message.classList.remove('fade-in-animation'));
    }
    placeFirstTiles();
}

window.addEventListener('keydown', (e) => {
    if (!gameOver) {
        clearMerged();
        if (!checkGameOver()) {
            moveBlocks(e.code);
            if (moved) {
                moves += 1;
                moveBoard.textContent = `Moves Made: ${moves}`;
                placeNewTile();
            }
        }
    }
});

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

window.addEventListener('click', () => {
    winMessage.classList.remove('fade-in-animation');
})

resetButton.addEventListener('click', reset);

buildGrid();
placeFirstTiles();