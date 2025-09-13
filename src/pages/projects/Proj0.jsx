import TitleBox from '../utils/TitleBox';
import PortionBox from '../utils/PortionBox';

import selfie1 from '../../Graphics/selfie1.jpg';
import selfie2 from '../../Graphics/selfie2.jpg';

import closePhoto from '../../Graphics/closeBuilding.jpg';
import farPhoto from '../../Graphics/farBuilding.jpg';

function Proj0() {
    return (
        <div className="flex flex-col items-center justify-start p-10 pl-4 pt-4 gap-10">
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
    )
}

export default Proj0;