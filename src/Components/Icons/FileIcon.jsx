import Draggable from 'react-draggable';
import { useState } from "react";

function FileIcon({yOffSet, highlight, setHighlight, Icon, name, color, display, setDisplay}) {
    color = !color ? "black" : color;
    function updateHighlight () {
        setHighlight(name);
        //console.log(highlight);
    }

    function updateDisplay () {
        if (!display) {
            setDisplay(!display);
        } 
    }

    return (
        <div>
            <Draggable
                bounds={{top:-20 - yOffSet, bottom:null, left:null, right:null}}
            >
                <div className={`flex flex-col items-center`} onDoubleClick={updateDisplay} onMouseDownCapture={updateHighlight}>
                    <Icon color={`black`} fill={`white`} size={64} />
                    <p className={`px-1 rounded-sm ${color == "black" ? "text-black" : `text-${color}-500`} ${highlight == name ? 'bg-black text-white' : 'bg-white'} max-w-fit`}>
                        {name}
                    </p>
                </div>
            </Draggable>
        </div>
    )
}

export default FileIcon;