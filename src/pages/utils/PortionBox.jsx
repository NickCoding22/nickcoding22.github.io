import ControlBar from "../../Components/Utils/ControlBar";
import Draggable from 'react-draggable';
import { useState } from "react";

function PortionBox({title, photos}) {
    const [display, setDisplay] = useState(false);

    const justifyClass = photos.length === 1 ? "justify-center" : "justify-between";


    return (
        <Draggable
            handle=".handle"
        >
        <div className="flex flex-col w-fit h-fit">
            <ControlBar name="Proj0Title" setDisplay={setDisplay}/>
            <div className={`flex flex-col gap-2 rounded-bl-md rounded-br-md overflow-auto p-4 bg-white border-x-4 border-b-4 border-black text-black text-left`}>
                <h1 className={`font-semibold text-3xl`}>
                    {title}
                </h1>
                <div className={`flex flex-row ${justifyClass}`}>
                    {photos.map((photo, key) => 
                        <img src={photo} key={key} class="max-w-64 max-h-64 object-contain border-4 border-black" />
                    )}
                </div>
            </div>
        </div>
        </Draggable>
    );
}

export default PortionBox;