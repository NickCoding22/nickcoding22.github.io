export default function StartSnake (container) {
    let board = [];
    let boardSize = 21;
    let boardDimension = 536 - 8;
    let direction = "ArrowRight";
    let leadIndex = [];
    let appleIndex = [];
    let gameStart = false;
    let gameID = "";
    let score = 0;
    let snakes = [];
    let snakeColor = "black";
    let directionChosen = "false";
    const gameContainer = document.querySelector('.game-container-main');
    const scoreBoard = document.querySelector('.score-window');
    const boardSizeSelector = document.querySelector('.board-change');
    const speedSelector = document.querySelector('.speed-change');
    const playButton = document.querySelector('#play-button');
    const colorSelector = document.querySelector('.colors');
    const colors = ["black", "blue", "purple", "orange", "yellow", "brown", "green"]
    const keyCodes = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    const keysOpposites = {
        "ArrowUp": "ArrowDown",
        "ArrowDown": "ArrowUp",
        "ArrowLeft": "ArrowRight",
        "ArrowRight": "ArrowLeft"
    };

    function instantiateBoard() {
        for (let i = 0; i < boardSize; i++) {
            const newArray = [];
            for (let j = 0; j < boardSize; j++) {
                const newSpot = document.createElement('div');
                const newDimension = boardDimension / boardSize;
                newSpot.style.cssText = `width: ${newDimension}px; height: ${newDimension}px;`;
                newSpot.classList.add('empty-space');
                newArray.push(newSpot);
                gameContainer.appendChild(newSpot);
            }
            board.push(newArray);
        }
    }

    function instantiateSnake(numBlocks) {
        const snakeStart = Math.trunc(boardSize / 2);
        board[snakeStart][snakeStart].classList.add('snake-block');
        board[snakeStart][snakeStart].style.backgroundColor = snakeColor;
        snakes.push(board[snakeStart][snakeStart]);
        leadIndex = [snakeStart, snakeStart];
        for (let i = 1; i < numBlocks; i++) {
            board[snakeStart][snakeStart - i].classList.add('snake-block');
            board[snakeStart][snakeStart - i].style.backgroundColor = snakeColor;
            snakes.push(board[snakeStart][snakeStart - i]);
        }
    }

    function checkGameOver() {
        if (leadIndex[0] < 0 || leadIndex[0] > boardSize - 1 || 
            leadIndex[1] < 0 || leadIndex[1] > boardSize - 1 ||
            board[leadIndex[0]][leadIndex[1]].classList.contains('snake-block')) {
            endGame();
            return true;
        }
    }

    function randomizeApple() {
        appleIndex = [Math.trunc(Math.random() * boardSize), Math.trunc(Math.random() * boardSize)];
        // console.log(appleIndex);
        while (board[appleIndex[0]][appleIndex[1]].classList.contains("snake-block")) {
            appleIndex = [Math.trunc(Math.random() * boardSize), Math.trunc(Math.random() * boardSize)];
        }
        board[appleIndex[0]][appleIndex[1]].classList.add("apple");
        board[appleIndex[0]][appleIndex[1]].style.backgroundColor = "red";
    }

    function checkApple() {
        return board[leadIndex[0]][leadIndex[1]].classList.contains('apple'); 
    }

    function moveBlocks() {
        if (direction == "ArrowRight") {
            leadIndex[1] = leadIndex[1] + 1;
        } else if (direction == "ArrowLeft") {
            leadIndex[1] = leadIndex[1] - 1;
        } else if (direction == "ArrowUp") {
            leadIndex[0] = leadIndex[0] - 1;
        } else if (direction == "ArrowDown") {
            leadIndex[0] = leadIndex[0] + 1;
        }
        if (!checkGameOver()) {
            if (!checkApple()) {
                const lastSnakeBlock = snakes.pop();
                lastSnakeBlock.classList.remove('snake-block');
                changeSnakeColor(lastSnakeBlock, "white");
            } else { 
                score++;
                scoreBoard.textContent = `Score: ${score}`;
                board[leadIndex[0]][leadIndex[1]].classList.remove('apple')
                randomizeApple(); 
            }
            board[leadIndex[0]][leadIndex[1]].classList.add('snake-block');
            changeSnakeColor(board[leadIndex[0]][leadIndex[1]], snakeColor);
            snakes.unshift(board[leadIndex[0]][leadIndex[1]]);
        }
    }

    function changeSnakeColor(block, color) {
        block.style.backgroundColor = color;
    }

    function startGame() {
        randomizeApple();
        gameID = window.setInterval(() => {
            directionChosen = false;
            moveBlocks();
        }, Number(speedSelector.value));
    }

    function endGame() {
        window.clearInterval(gameID);
        snakes.forEach((snake) => changeSnakeColor(snake, "red"));
    }

    function reset() {
        boardSize = Number(boardSizeSelector.value);
        board.forEach((row) => {
            row.forEach((block) => {
                gameContainer.removeChild(block);
            });
        });
        board = [];
        direction = "ArrowRight";
        leadIndex = [];
        appleIndex = [];
        gameStart = false;
        gameID = "";
        score = 0;
        snakes = [];
        instantiateBoard();
        instantiateSnake(5);
    }

    function establishColors() {
        colors.forEach((color) => {
            const newColor = document.createElement('div');
            newColor.classList.add("color");
            newColor.classList.add(color);
            newColor.style.backgroundColor = color;
            newColor.addEventListener('click', () => {
                snakes.forEach((snake) => changeSnakeColor(snake, color));
                snakeColor = color;
            });
            colorSelector.appendChild(newColor);
        });
    }

    function keyDownFirst(e) {
        if (keyCodes.includes(e.code) && 
            keysOpposites[direction] != e.code &&
            !directionChosen) {
            direction = `${e.code}`;
        }
        if (!gameStart) {
            startGame();
            gameStart = true;
        }
        directionChosen = true;
    }

    function keyDownList(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }

    if (container) {
        container.addEventListener('keydown', keyDownFirst);

        container.addEventListener("keydown", keyDownList, false);

        playButton.addEventListener('click', () => reset());
        establishColors();

        instantiateBoard();
        instantiateSnake(5);
    }

    return [keyDownFirst, keyDownList];
}