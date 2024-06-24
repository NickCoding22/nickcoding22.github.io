import OpeningFile from './Files/OpeningFile.jsx';
import ProjectsFile from './Files/ProjectsFile.jsx';
import Snake from './Files/Snake.jsx';
import MineSweeper from './Files/MineSweeper.jsx';
import The2048 from './Files/The2048.jsx';
import ExperienceFile from './Files/ExperienceFile.jsx';

function WindowManager({frameWidth, displays, setDisplays}) {
    const gameSnake = displays[2] ? <Snake display={displays[2]} setDisplay={setDisplays[2]} /> : null;
    const gameMS = displays[3] ? <MineSweeper display={displays[3]} setDisplay={setDisplays[3]} /> : null;
    // const game2048 = displays[4] ? <The2048 display={displays[4]} setDisplay={setDisplays[4]} /> : null;
    return (
        frameWidth > 755 ?
        <div class="flex flex-col">
            <OpeningFile display={displays[0]} setDisplay={setDisplays[0]} />
            <ProjectsFile display={displays[1]} setDisplay={setDisplays[1]} />
            <ExperienceFile display={displays[5]} setDisplay={setDisplays[5]} />
            {gameSnake}
            {gameMS}
            <The2048 display={displays[4]} setDisplay={setDisplays[4]} />
        </div> :
        <div class="flex flex-col">
            <OpeningFile display={displays[0]} setDisplay={setDisplays[0]} mobile={true} />
            <ProjectsFile display={displays[1]} setDisplay={setDisplays[1]} mobile={true} />
            <ExperienceFile display={displays[5]} setDisplay={setDisplays[5]} mobile={true} />
        </div>
    )
}
export default WindowManager;