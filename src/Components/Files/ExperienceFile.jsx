import Draggable from 'react-draggable';
import ControlBar from '../Utils/ControlBar.jsx';
import execifyIcon from '../../Graphics/execify.png';
import nexaIcon from '../../Graphics/Nexa.jpeg';
import bmunIcon from '../../Graphics/bmun_icon.jpeg';
import aiIcon from '../../Graphics/ai61A.png';

function ProjectsFile({mobile, display, setDisplay, z, changeOrder}) {
    const offSetX = mobile ? window.innerWidth * (.5 / 12) : window.innerWidth / 2 + 60;;
    const offSetY = mobile ? 608 : 275 + 43;
    const width = mobile ? 'w-11/12' : 'w-4/12';
    const mainStyle = `absolute overflow-auto rounded-sm ${width}`;
    return (
        display ?
        <div class={z} onMouseDown={() => changeOrder()}>
            <Draggable
                handle=".handle"
                defaultPosition={{x: offSetX, y: offSetY}}
                bounds={{top:0, bottom:null, left:null, right:null}}
            >
                <div className={mainStyle}>
                    <ControlBar name={"Experience"} setDisplay={setDisplay}/>
                    <div className="flex flex-col gap-4 max-h-[250px] border-x-4 border-b-4 border-black overflow-auto bg-white rounded-bl-md rounded-br-md p-5">
                        <h2 class="font-bold text-3xl">Experience:</h2>
                        <div>
                            <h3 class="italic font-semibold">Execify</h3>
                            <div class="flex flex-row items-center gap-5">
                                <p class="text-sm">Currently, I am helping to develop an email terminal that is cross compatible 
                                with Outlook and Gmail that can, in real time, handle sending, receiving, and updating emails, 
                                all while maintaing a comprehensive and intuitive UI.</p>
                                <img src={execifyIcon} class="w-20 h-20 rounded-full text-wrap"/>
                            </div>
                        </div>
                        <div>
                            <h3 class="italic font-semibold">Nexa Speech</h3>
                            <div class="flex flex-row items-center gap-5">
                                <p class="text-sm">I developed a fully streaming, low latency speech-to-speech pipeline 
                                for user-to-LLM communication. I also created a TTS streaming endpoint with the open source 
                                StyleTTS2 and developed an associated API for its use.</p>
                                <img src={nexaIcon} class="w-20 h-20 rounded-full text-wrap" />
                            </div>
                        </div>
                        <div>
                            <h3 class="italic font-semibold">Berkeley Model United Nations</h3>
                            <div class="flex flex-row items-center gap-5">
                                <p class="text-sm">I helped to automated BMUN's invoice system to asynchronously handle 
                                the finances of over 2,000 students (6 figures, annually). I integrated the financial 
                                system into BMUN’s user-facing website Huxley along with providing numerous bug fixes. In 
                                addition, I developed two topic synopses (regarding the relationship between technology and 
                                labor rights) totaling over 50 pages, and 5 committee sessions to be attended by 70 students 
                                from around the world.</p>
                                <img src={bmunIcon} class="w-20 h-20 rounded-full text-wrap" />
                            </div>
                        </div>
                        <div>
                            <h3 class="italic font-semibold">Academic Intern - CS61A</h3>
                            <div class="flex flex-row items-center gap-5">
                                <p class="text-sm">As an AI, I provided one-on-one tutoring for Berkeley&#39;s largest 
                                computer science course with a class size of over 1500 students, which involved teaching students 
                                programming concepts such as recursion, currying and data structures using Python, Scheme, and SQL</p>
                                <img src={aiIcon} class="w-20 h-20 rounded-full text-wrap" />
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