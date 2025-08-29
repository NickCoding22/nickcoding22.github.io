import IconColumn from './IconColumn.jsx'
import NavBar from './Utils/NavBar.jsx'
import WindowManager from './WindowManager.jsx';
import { useState, useEffect } from 'react';

function PageManager() {
    const [openingDisplay, setOpeningDisplay] =  useState(true);
    const [projectsDisplay, setProjectsDisplay] = useState(true);
    const [experienceDisplay, setExperienceDisplay] = useState(true);
    const [academicDisplay, setAcademicDisplay] = useState(true);
    const [snakeDisplay, setSnakeDisplay] = useState(false);
    const [mineSweeperDisplay, setMineSweeperDisplay] = useState(false);
    const [the2048Display, setthe2048Display] = useState(false);
    const displays = [openingDisplay, projectsDisplay, snakeDisplay, mineSweeperDisplay, the2048Display, experienceDisplay, academicDisplay];
    const setDisplays = [setOpeningDisplay, setProjectsDisplay, setSnakeDisplay, setMineSweeperDisplay, setthe2048Display, setExperienceDisplay, setAcademicDisplay];

    const [frameWidth, setFrameWidth] = useState(window.innerWidth);
    const colorList = ["bg-neutral-500", "bg-orange-500", "bg-red-500", "bg-blue-500", "bg-green-500", "bg-purple-500"];
    const [bColor, setBColor] = useState(colorList[Math.trunc(Math.random() * 6)]);
    useEffect(() => {
        const handleResize = () => {
            setFrameWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div class={`flex flex-col relative h-screen w-screen overflow-x-hidden overflow-y-auto ${bColor} font-mono`}>
            <NavBar setColor={setBColor} colorList={colorList} />
            <div class="flex flex-row">
                {frameWidth > 755 ? <IconColumn displays={displays} setDisplays={setDisplays} /> : null}
                <WindowManager frameWidth={frameWidth} displays={displays} setDisplays={setDisplays} />
            </div>
        </div>
    )
}

export default PageManager;