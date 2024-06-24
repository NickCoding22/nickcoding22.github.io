import './MineSweeper/minesweeper.css';
import StartSnake from './MineSweeper/minesweeper.js';
import { useEffect, useRef, useState } from 'react';
import ControlBar from '../Utils/ControlBar.jsx';
import Draggable from 'react-draggable';

function MineSweeper({display, setDisplay}) {
    const gameContainerRef = useRef(null);
    const gameInitializedRef = useRef(false);

    useEffect(() => {
        const startGame = () => {
            if (gameContainerRef.current && !gameInitializedRef.current) {
                StartSnake(window);
                gameInitializedRef.current = true;
            }
        };

        if(display) {
            startGame();
        }

        return () => {
        };
    }, [display]);

    const offSetX = 75;
    const offSetY = 50;
        
    return (
        <div class={`main-display ${display ? 'flex' : 'hidden'}`}>
        <Draggable
            handle=".handle"
            defaultPosition={{x: offSetX, y: offSetY}}
            bounds={{top:0, bottom:null, left:null, right:null}}
        >
            <div className="absolute border-b-2 border-black rounded-bl-md rounded-br-md">
                <ControlBar name="Minesweeper"setDisplay={setDisplay}/>
                <div id="game-container" ref={gameContainerRef}>
                    <div class = "overflow-container">
                        <div class = "dash-board">
                            <p class = "flag-tracker">Flags Left: 00</p>
                            <label class = "diff-label"> Difficulty: 
                                <select class = "diff-change">
                                    <option class = "diff-option" value = "EASY">Easy</option>
                                    <option class = "diff-option" value = "NORMAL" selected>Normal</option>
                                    <option class = "diff-option" value = "HARD">Hard</option>
                                </select>
                            </label>
                            <button class = "reset-btn">Reset</button>
                            <button class = "instructions">How to Play
                                <div class = "instructions-text hidden">
                                    <p>Select Block: Left Click<br />
                                    Flag Block: Right Click<br />
                                    Select Adjacent Blocks: Double Click
                                    </p>
                                </div>
                            </button>
                        </div>
                        <div className = "game-container-mine"></div>
                    </div>
                </div>
            </div>
        </Draggable>
        </div>
    )
}

export default MineSweeper;