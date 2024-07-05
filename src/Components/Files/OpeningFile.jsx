import Draggable from 'react-draggable';
import ControlBar from '../Utils/ControlBar.jsx';
import { useState } from 'react';

function OpeningFile({mobile, display, setDisplay}) {
    const offSetX = mobile ? window.innerWidth * (.5 / 12) : 40;
    const offSetY = mobile ? 10 : 20;
    //const width = window.innerWidth * 11 / 12;
    const [width, setWidth] = useState(window.innerWidth * 11 / 12);
    console.log(width);
    const mainStyle = `absolute overflow-auto rounded-sm ${mobile ? `w-11/12` : 'w-6/12'}`;

    return (
        display ?
        <div>
            <Draggable
                handle=".handle"
                defaultPosition={{x: offSetX, y: offSetY}}
                bounds={{top:0, bottom:null, left:null, right:null}}
            >
                <div className={mainStyle}>
                    <ControlBar name="Opening" setDisplay={setDisplay}/>
                    <div className={`flex flex-col rounded-bl-md rounded-br-md overflow-auto h-[548px] ${mobile ? 'py-6 px-4' : 'px-10 pt-6 pb-7'} bg-white border-x-4 border-b-4 border-black text-black text-left`}>
                        <h1 className={`font-semibold ${mobile ? 'text-6xl' : 'text-8xl'}`}>
                            Nicholas Angelici
                        </h1>
                        <br />
                        <p className="text-black text-lg">
                            Hello! I'm Nicholas Angelici, a student at UC Berkeley double majoring 
                            in <b>Computer Science</b> and <b>Data Science</b>. 
                            When I'm not working on projects, 
                            I like to spend my time reading, playing golf,
                            going to the gym, and improving my rankings in Nintendo Switch Sports. 
                        </p>
                        <br />
                        <p className="text-black text-lg">
                            This is an interactive website inspired by early mac desktops. Meaning, you 
                            can drag, open, close, and interact with the files! You can contact me at 
                            <br/><b className="font-extrabold italic">nickangelici@berkeley.edu</b>. Go Bears!
                        </p>
                    </div>
                </div>
            </Draggable>
        </div>
        : null
    );
}

export default OpeningFile;