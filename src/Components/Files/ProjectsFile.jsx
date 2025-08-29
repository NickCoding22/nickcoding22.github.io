import Draggable from 'react-draggable';
import ControlBar from '../Utils/ControlBar.jsx';
import ascIcon from '../../Graphics/hume_img.png'
import twitterIcon from '../../Graphics/Twitter_Icon.png';
import dartIcon from '../../Graphics/dart_logo.jpeg';
import htmlIcon from '../../Graphics/html_logo.png';

function ProjectsFile({mobile, display, setDisplay, z, changeOrder}) {
    const offSetX = mobile ? window.innerWidth * (.5 / 12) : (window.innerWidth / 2 + 60) - 10;
    const offSetY = mobile ? 910 : 10;
    const width = mobile ? 'w-11/12' : 'w-4/12';
    const mainStyle = `absolute overflow-auto rounded-sm pb-4 ${width}`;

    return (
        display ?
        <div class={z} onMouseDown={() => changeOrder()}>
            <Draggable
                handle=".handle"
                defaultPosition={{x: offSetX, y: offSetY}}
                bounds={{top:0, bottom:null, left:null, right:null}}
            >
                <div className={mainStyle}>
                    <ControlBar name="Projects" setDisplay={setDisplay}/>
                    <div className="flex flex-col gap-4 h-[548px] border-x-4 border-b-4 border-black overflow-auto bg-white rounded-bl-md rounded-br-md p-5">
                        <h2 class="font-bold text-3xl">Projects:</h2>
                        <div>
                            <h3 class="italic font-semibold">Article Sentiment Comprehension (ASC)</h3>
                            <div class="flex flex-row items-center gap-5">
                                <p class="text-sm">A website which, when given a webpage's url, parses a page's 
                                contents, identifies its sentiment bias (negative, positive, neutral), 
                                and summarizes its key points and their associated tone.</p>
                                <img src={ascIcon} class="w-20 h-20 rounded-full text-wrap" />
                            </div>
                        </div>
                        <div>
                            <h3 class="italic font-semibold">Twitter (X) Bot Identifier</h3>
                            <div class="flex flex-row items-center gap-5">
                                <p class="text-sm">An X bot which samples random instances of activity, 
                                determines if the associated accounts are bots, and creates a confidence 
                                interval to approximate the true proportion of active users on X that are automated.</p>
                                <img src={twitterIcon} class="w-20 h-20 rounded-full text-wrap" />
                            </div>
                        </div>
                        <div>
                            <h3 class="italic font-semibold">Dartboard Investing</h3>
                            <div class="flex flex-row items-center gap-5">
                                <p class="text-sm">A modified electric dartboard (using a Raspberry Pi 4) where stocks 
                                are able to be chosen by random dart throws. Using the Alpaca Trade API, the board automatically 
                                verifys, assesses, and invests in the associated stocks.</p>
                                <img src={dartIcon} class="w-20 h-20 rounded-full text-wrap" />
                            </div>
                        </div>
                        <div>
                            <h3 class="italic font-semibold">Personal Website</h3>
                            <div class="flex flex-row items-center gap-5">
                                <p class="text-sm">A React-based website that acts as a fully-interactive desktop 
                                inspired by early Mac designs. Files (including multiple playable games) 
                                and windows can be opened, closed, and moved.</p>
                                <img src={htmlIcon} class="w-20 h-20 rounded-full text-wrap" />
                            </div>
                        </div>
                    </div>
                </div>
            </Draggable>
        </div>
        : null
    )
}

export default ProjectsFile;