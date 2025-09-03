import ControlBar from "../../Components/Utils/ControlBar";
import { useState } from "react";

function TitleBox({title, photo}) {
    const [display, setDisplay] = useState(false);

    return (
        <div className="flex flex-col w-fit h-fit">
            <ControlBar name="Proj0Title" setDisplay={setDisplay}/>
            <div className={`flex flex-col rounded-bl-md rounded-br-md overflow-auto p-4 bg-white border-x-4 border-b-4 border-black text-black text-left`}>
                <img src={photo} class="max-w-64 max-h-64 object-contain" />
            </div>
        </div>
    );
}

export default TitleBox;