import NavIcon from '../Icons/NavIcon.jsx';
import TimeBox from './TimeBox.jsx';
import { IconSettings } from '@tabler/icons-react';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faAddressBook, faSmile } from '@fortawesome/free-regular-svg-icons'
import { useEffect, useState } from 'react';

function NavBar({setColor, colorList, projNum}) {
    const [frameWidth, setFrameWidth] = useState(window.innerWidth);
    const [pickColor, setPickColor] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setFrameWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const settingsArea = frameWidth < 755 ? null :
                        <div class="flex flex-row items-center border-r-2 pr-5 border-black">
                            <IconSettings class="hover:rotate-90 hover:scale-125 transition duration-500 cursor-pointer" color={"black"} size={32} onClick={() => setPickColor(!pickColor)}/>
                            <div class={`${!pickColor ? "-translate-x-72" : " translate-x-10"} absolute flex flex-row bg-white border-4 border-black p-1 rounded-lg gap-2 transition duration-1000 `}>
                                {colorList.map((color) => {
                                    return <div class={`w-4 h-4 cursor-pointer ${color} rounded-full`} onClick={() => setColor(color)}/>
                                })}
                            </div>
                        </div>;
    const navOrientation = frameWidth < 755 ? 'justify-center' : 'justify-between';
    const timeBox = frameWidth < 755 ? null : <TimeBox />;

    console.log(projNum);

    if (projNum >= 0) {
        return (
            <div class="flex flex-col items-start">
                <div class={`flex flex-row ${navOrientation} flex-wrap items-center bg-white border-b-2 border-black w-full p-2`}>
                    <div class={`flex flex-row flex-wrap justify-center items-center ${frameWidth < 755 ? '' : 'pl-5'}`}>
                        {settingsArea}
                        <div class={`flex flex-row flex-wrap justify-center gap-4 ${frameWidth < 755 ? '' : 'pl-5'}`}>
                            {[...Array(projNum+1)].map((_, i) => (
                                <NavIcon icon={faSmile} name={`Project ${i}`} />
                            ))}
                        </div>
                    </div>
                    {timeBox}
                </div>
            </div>
        )
    }

    return (
        <div class="flex flex-col items-start">
            <div class={`flex flex-row ${navOrientation} flex-wrap items-center bg-white border-b-2 border-black w-full p-2`}>
                <div class={`flex flex-row flex-wrap justify-center items-center ${frameWidth < 755 ? '' : 'pl-5'}`}>
                    {settingsArea}
                    <div class={`flex flex-row flex-wrap justify-center gap-4 ${frameWidth < 755 ? '' : 'pl-5'}`}>
                        <NavIcon icon={faLinkedin} name="LinkedIn" link="https://www.linkedin.com/in/nicholasangelici/"/>
                        <NavIcon icon={faGithub} name="Github" link="https://github.com/NickCoding22"/>
                        <NavIcon icon={faAddressBook} name="Resume" link="https://github.com/NickCoding22"/>
                    </div>
                </div>
                {timeBox}
            </div>
        </div>
    )
}

export default NavBar;