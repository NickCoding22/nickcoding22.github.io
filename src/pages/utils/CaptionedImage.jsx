import ControlBar from "../../Components/Utils/ControlBar";
import { useState } from "react";

function CaptionedImage({photo, title, caption}) {
    const [display, setDisplay] = useState(false);

    return (
        <div className="flex flex-col w-fit h-fit">
            <ControlBar name="Proj0Title" setDisplay={setDisplay}/>
            <div className={`flex flex-col rounded-bl-md rounded-br-md overflow-auto p-4 bg-white border-x-4 border-b-4 border-black text-black text-left whitespace-pre-line`}>
                <img src={photo} class="max-w-96 max-h-96 object-contain" />
                <p className="font-bold">{title}</p>
                <p>{caption}</p>
            </div>
        </div>
    );
}

export default CaptionedImage;