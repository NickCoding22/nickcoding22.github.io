import ControlBar from "../../Components/Utils/ControlBar";
import Draggable from 'react-draggable';
import { useState } from "react";

function TitleBox({title, subtitle}) {
    const [display, setDisplay] = useState(false);

    return (
        <Draggable
            handle=".handle"
        >
        <div className="flex flex-col w-fit h-fit">
            <ControlBar name="Proj0Title" setDisplay={setDisplay}/>
            <div className={`flex flex-col rounded-bl-md rounded-br-md overflow-auto p-4 bg-white border-x-4 border-b-4 border-black text-black text-left`}>
                <h1 className={`font-semibold ${subtitle ? "text-3xl" : "text-6xl"}`}>
                    {title}
                </h1>
            </div>
        </div>
        </Draggable>
    );
}

export default TitleBox;