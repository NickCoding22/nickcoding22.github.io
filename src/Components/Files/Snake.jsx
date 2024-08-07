import './Snake/snake.css';
import StartSnake from './Snake/snake.js';
import { useEffect, useRef, useState } from 'react';
import ControlBar from '../Utils/ControlBar.jsx';
import Draggable from 'react-draggable';

function Snake({display, setDisplay, z, changeOrder}) {
    const gameContainerRef = useRef(null);
    const gameInitializedRef = useRef(false);
    const [removals, setRemovals] = useState([]);

    useEffect(() => {
        const startGame = () => {
        if (gameContainerRef.current && !gameInitializedRef.current) {
            if (removals.length == 0) {
                const temp = StartSnake(window);
                setRemovals(temp);
            }
            gameInitializedRef.current = true;
        }
        };

        startGame();
        if (display && removals.length > 0) {
            window.addEventListener("keydown", removals[0]);
            window.addEventListener("keydown", removals[1], false);
        }

        return () => {
        if (removals.length > 0) {
            window.removeEventListener("keydown", removals[0]);
            window.removeEventListener("keydown", removals[1]);
        }
        };
    }, [display]);

    const offSetX = 50;
    const offSetY = 25;
        
    return (
        <div class={`main-display ${display ? 'flex' : 'hidden'} ${z}`} onMouseDown={() => changeOrder()}>
        <Draggable
            handle=".handle"
            defaultPosition={{x: offSetX, y: offSetY}}
            bounds={{top:0, bottom:null, left:null, right:null}}
        >
            <div className="absolute">
                <ControlBar name="Snake" setDisplay={setDisplay}/>
                <div id="game-container" ref={gameContainerRef}>
                    <div class = "total-container">
                        <div class = "row-1">
                            <div class = "dashboard">
                                <div class = "score-window">Score: 0</div>
                                <label class = "board-size"> Board: 
                                    <select class = "board-change">
                                        <option class = "s-option" value = "11">Easy</option>
                                        <option class = "s-option" value = "21" selected>Normal</option>
                                        <option class = "s-option" value = "31">Hard</option>
                                    </select>
                                </label>
                                <label class = "snake-speed"> Speed: 
                                    <select class = "speed-change">
                                        <option class = "s-option" value = "250">Easy</option>
                                        <option class = "s-option" value = "125" selected>Normal</option>
                                        <option class = "s-option" value = "75">Hard</option>
                                    </select>
                                </label>
                            </div>
                            <button class="bg-neutral-500 text-white hover:bg-black" id = "play-button">Play Again</button>
                        </div>
                        <div class = "row-2">
                            <div class = "game-container-main rounded-bl-md rounded-br-md"></div>
                            <div class = "colors">Colors:</div>
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
        </div>
    )
}

export default Snake;