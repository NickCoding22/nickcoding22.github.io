import './2048/2048.css';
import Start2048 from './2048/2048.js';
import { useEffect, useRef, useState } from 'react';
import ControlBar from '../Utils/ControlBar.jsx';
import Draggable from 'react-draggable';

function The2048({display, setDisplay}) {
  const gameContainerRef = useRef(null);
  const gameInitializedRef = useRef(false);
  const [removals, setRemovals] = useState([]);

  useEffect(() => {
    const startGame = () => {
      if (gameContainerRef.current && !gameInitializedRef.current) {
        if (removals.length == 0) {
          const temp = Start2048(window);
          setRemovals(temp);
        }
        gameInitializedRef.current = true;
      }
    };

    startGame();
    if (display && removals.length > 0) {
      window.addEventListener("keydown", removals[0]);
      window.addEventListener("keydown", removals[1], false);
      window.addEventListener("click", removals[2]);
    }

    return () => {
      if (removals.length > 0) {
        window.removeEventListener("keydown", removals[0]);
        window.removeEventListener("keydown", removals[1]);
        window.removeEventListener("click", removals[2]);
      }
    };
  }, [display]);

  const offSetX = 100;
  const offSetY = 75;
    
  return (
    <div class={`main-display ${display ? 'flex' : 'hidden'}`}>
      <Draggable
        handle=".handle"
        defaultPosition={{x: offSetX, y: offSetY}}
        bounds={{top:0, bottom:null, left:null, right:null}}
      >
        <div className="absolute">
          <ControlBar name="2048" setDisplay={setDisplay}/>
          <div id="game-container" ref={gameContainerRef}>
              <div class = "overflow-container">
              <div class = "dashboard">
                  <div class = "score">Score: 0</div>
                  <div class = "moves-made">Moves Made: 0</div>
                  <button class = "reset bg-neutral-500 px-2 rounded-lg text-white">Restart</button>
              </div>
              <div class = "game-container rounded-bl-md rounded-br-md">
                  <div class = "grid">
                  </div>
                  <div class = "tile-container">
                  </div>
                  <div class = "win-message">Congratulations!<br />Click to continue</div>
                  <div class = "lose-message">Game Over!<br />Click "Restart" to play again</div>
              </div>
              </div>
          </div>
        </div>
      </Draggable>
    </div>
  )
}

export default The2048;