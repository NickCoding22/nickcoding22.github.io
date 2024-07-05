function ControlBar({setDisplay, name}) {
    return (
        <div className="handle">
            <div className="border-4 border-black rounded-tl-md rounded-tr-md w-full bg-neutral-400 flex flex-row p-2 gap-2">
                <div className="w-4 h-4 rounded-full bg-red-600 hover:bg-red-800" onClick={() => setDisplay(false)}/>
                <div className="w-4 h-4 rounded-full bg-green-500"/>
            </div>
        </div>
    )
}

export default ControlBar;