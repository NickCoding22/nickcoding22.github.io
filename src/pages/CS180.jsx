import { useState } from 'react';
import { IconFileText, IconBomb, IconWall, IconApple } from '@tabler/icons-react';

import NavBar from '../Components/Utils/NavBar';
import TitleBox from './utils/TitleBox';
import PhotoBox from './utils/PhotoBox';
import PortionBox from './utils/PortionBox';

import selfie1 from '../Graphics/selfie1.jpg';
import selfie2 from '../Graphics/selfie2.jpg';

import closePhoto from '../Graphics/closeBuilding.jpg';
import farPhoto from '../Graphics/farBuilding.jpg';
import FileIcon from '../Components/Icons/FileIcon';

export default function CS180() {
    const colorList = ["bg-neutral-500", "bg-orange-500", "bg-red-500", "bg-blue-500", "bg-green-500", "bg-purple-500"];
    const [bColor, setBColor] = useState(colorList[Math.trunc(Math.random() * 6)]);
    const display = null;
    const setDisplay = () => {};
    const [highlight, setHighlight] = useState(null);

    return (
        <div class={`flex flex-col relative h-screen w-screen overflow-x-hidden overflow-y-auto ${bColor} font-mono`}>
            <NavBar setColor={setBColor} colorList={colorList} projNum={0} />
            {/* Project 0 */}
            <div className="absolute top-[60px] left-[30px] flex flex-col gap-4">
                {[...Array(7)].map((_, i) => (
                    <div className="-z-10 lg:z-0">
                        <FileIcon yOffSet={0 * 96} display={display} setDisplay={setDisplay} highlight={highlight} setHighlight={setHighlight} Icon={IconFileText} name={`P${i}.pdf`}/>
                    </div>
                ))}
            </div>
            <div className="flex flex-col items-center justify-start p-10 gap-10">
                <div className="flex flex-col items-center gap-4">
                    <TitleBox title="Project 0: Becoming Friends with your Camera" />
                    <div className="flex flex-col lg:flex-row gap-4 justify-between items-center w-full">
                        <div className="flex flex-col gap-4 justify-start items-start w-fit">
                            <PortionBox title="Part 1: Right vs Wrong" photos={[selfie1, selfie2]} />
                        </div>
                        <div className="flex flex-col gap-4 justify-start items-start w-fit">
                            <PortionBox title="Part 2: Buildings' Perspective" photos={[farPhoto, closePhoto]} />
                        </div>
                        <div className="flex flex-col gap-4 justify-start items-center w-fit">
                            <PortionBox title="Part 3: The Dolly Zoom" photos={["https://i.imgflip.com/a4xoh3.gif"]}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
