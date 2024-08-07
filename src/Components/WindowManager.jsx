import OpeningFile from './Files/OpeningFile.jsx';
import ProjectsFile from './Files/ProjectsFile.jsx';
import Snake from './Files/Snake.jsx';
import MineSweeper from './Files/MineSweeper.jsx';
import The2048 from './Files/The2048.jsx';
import ExperienceFile from './Files/ExperienceFile.jsx';
import { useState } from 'react';

function WindowManager({frameWidth, displays, setDisplays}) {
    const zSettings = ['z-0', 'z-10', 'z-20', 'z-30', 'z-40', 'z-50'];
    const [zOpening, setZOpening] = useState(zSettings[0]);
    const [zProjects, setZProjects] = useState(zSettings[0]);
    const [zExperience, setZExperience] = useState(zSettings[0]);
    const [zSnake, setZSnake] = useState(zSettings[0]);
    const [zMineSweeper, setZMineSweeper] = useState(zSettings[0]);
    const [z2048, setZ2048] = useState(zSettings[0]);

    const [windowNames, setWindowNames] =  useState(["Opening", "Projects", "Experience", "Snake", "MineSweeper", "2048"]);
    
    const updateZs = () => {
        setZOpening(zSettings[windowNames.indexOf("Opening")]);
        setZProjects(zSettings[windowNames.indexOf("Projects")]);
        setZExperience(zSettings[windowNames.indexOf("Experience")]);
        setZSnake(zSettings[windowNames.indexOf("Snake")]);
        setZMineSweeper(zSettings[windowNames.indexOf("MineSweeper")]);
        setZ2048(zSettings[windowNames.indexOf("2048")]);
    }

    const makeChangeOrder = (name) => {
        return () => {
            const location = windowNames.indexOf(name);
            let temp = windowNames
            temp.splice(location, 1);
            temp.push(name);
            setWindowNames(temp);
            updateZs();
        }
    }

    const gameSnake = displays[2] ? <Snake display={displays[2]} setDisplay={setDisplays[2]} z={zSnake} changeOrder={makeChangeOrder("Snake")} /> : null;
    const gameMS = displays[3] ? <MineSweeper display={displays[3]} setDisplay={setDisplays[3]} z={zMineSweeper} changeOrder={makeChangeOrder("MineSweeper")} /> : null;

    // const game2048 = displays[4] ? <The2048 display={displays[4]} setDisplay={setDisplays[4]} /> : null;
    return (
        frameWidth > 755 ?
        <div class="flex flex-col">
            <OpeningFile display={displays[0]} setDisplay={setDisplays[0]} z={zOpening} changeOrder={makeChangeOrder("Opening")} />
            <ProjectsFile display={displays[1]} setDisplay={setDisplays[1]} z={zProjects} changeOrder={makeChangeOrder("Projects")} />
            <ExperienceFile display={displays[5]} setDisplay={setDisplays[5]} z={zExperience} changeOrder={makeChangeOrder("Experience")} />
            {gameSnake}
            {gameMS}
            <The2048 display={displays[4]} setDisplay={setDisplays[4]} z={z2048} changeOrder={makeChangeOrder("2048")} />
        </div> :
        <div class="flex flex-col">
            <OpeningFile display={displays[0]} setDisplay={setDisplays[0]} mobile={true} z={zOpening} changeOrder={makeChangeOrder("Opening")} />
            <ProjectsFile display={displays[1]} setDisplay={setDisplays[1]} mobile={true} z={zProjects} changeOrder={makeChangeOrder("Projects")} />
            <ExperienceFile display={displays[5]} setDisplay={setDisplays[5]} mobile={true} z={zExperience} changeOrder={makeChangeOrder("Experience")} />
        </div>
    )
}
export default WindowManager;