import { IconFileText, IconBomb, IconWall, IconApple } from '@tabler/icons-react';
import { useState } from "react";
import FileIcon from './Icons/FileIcon.jsx';

function IconColumn({displays, setDisplays}) {
    const [highlight, setHighlight] = useState(null);

    return (
        <div className="flex flex-col w-32 pt-5 pl-10 gap-2">
            <FileIcon yOffSet={0 * 96} display={displays[0]} setDisplay={setDisplays[0]} highlight={highlight} setHighlight={setHighlight} Icon={IconFileText} name="Opening.pdf"/>
            <FileIcon yOffSet={1 * 96} display={displays[1]} setDisplay={setDisplays[1]} highlight={highlight} setHighlight={setHighlight} Icon={IconFileText} name="Projects.pdf"/>
            <FileIcon yOffSet={2 * 96} display={displays[5]} setDisplay={setDisplays[5]} highlight={highlight} setHighlight={setHighlight} Icon={IconFileText} name="Experience.pdf"/>
            <FileIcon yOffSet={3 * 96} display={displays[2]} setDisplay={setDisplays[2]} highlight={highlight} setHighlight={setHighlight} Icon={IconApple} name="Snake"/>
            <FileIcon yOffSet={4 * 96} display={displays[3]} setDisplay={setDisplays[3]} highlight={highlight} setHighlight={setHighlight} Icon={IconBomb} name="MineSweeper"/>
            <FileIcon yOffSet={5 * 96} display={displays[4]} setDisplay={setDisplays[4]} highlight={highlight} setHighlight={setHighlight} Icon={IconWall} name="2048"/>
        </div>
    )
}

export default IconColumn;