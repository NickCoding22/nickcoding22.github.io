import { useState } from 'react';
import { IconFileText } from '@tabler/icons-react';

import NavBar from '../Components/Utils/NavBar';
import FileIcon from '../Components/Icons/FileIcon';

import Proj0 from './projects/Proj0';
import Proj1 from './projects/Proj1';

export default function CS180() {
    const colorList = ["bg-neutral-500", "bg-orange-500", "bg-red-500", "bg-blue-500", "bg-green-500", "bg-purple-500"];
    const [bColor, setBColor] = useState(colorList[Math.trunc(Math.random() * 6)]);
    const display = null;
    const setDisplay = () => {};
    const [highlight, setHighlight] = useState(null);

    const [projNum, setProjNum] = useState(1);
    const projects = [<Proj0 />, <Proj1 />]

    return (
        <div class={`flex flex-col relative h-screen w-screen overflow-x-hidden overflow-y-auto ${bColor} font-mono`}>
            <NavBar setColor={setBColor} colorList={colorList} projNum={0} />
            {/* Project 0 */}
            <div className="flex flex-row">
                <div className="flex flex-col gap-4 pt-4 px-4">
                    {[...Array(2)].map((_, i) => (
                        <div 
                            className="-z-10 lg:z-0"
                            onClick={() => setProjNum(i)}>
                            <FileIcon yOffSet={0 * 96} display={display} setDisplay={setDisplay} highlight={highlight} setHighlight={setHighlight} Icon={IconFileText} name={`P${i}.pdf`}/>
                        </div>
                    ))}
                </div>
                {projects[projNum]}
            </div>
        </div>
    );
}
