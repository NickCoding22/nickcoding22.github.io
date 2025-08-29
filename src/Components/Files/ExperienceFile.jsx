import Draggable from 'react-draggable';
import ControlBar from '../Utils/ControlBar.jsx';
import awsIcon from '../../Graphics/awsIcon.png';
import execifyIcon from '../../Graphics/execify.png';
import nexaIcon from '../../Graphics/Nexa.jpeg';

function ExperienceFile({mobile, display, setDisplay, z, changeOrder}) {
    const offSetX = mobile ? window.innerWidth * (.5 / 12) : (window.innerWidth / 2 + 60) + 10;
    const offSetY = mobile ? 910 : 30;
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
                    <div className="flex flex-col gap-4 h-[548px] border-x-4 border-b-4 border-black overflow-auto bg-white rounded-bl-md rounded-br-md p-5">
                        <h2 class="font-bold text-3xl">Past Internships:</h2>
                        <div>
                            <h3 class="italic font-semibold">Amazon Web Services</h3>
                            <div class="flex flex-row items-center gap-5">
                                <p class="text-sm">I built a Step Function workflow to automate nightly source code 
                                    synchronization between internal and external repositories that also runs CVE scans, 
                                    license checks, patch applications, and configures a Dockerfile. I also introduced systems to 
                                    detect and upload new Github releases and notify operators when manual review is required. My project was
                                    estimated to have reduced the release cycle time from 2–3 months to 6 weeks by replacing manual script-driven
                                    processes with continuous syncs that mitigate an accumulation of pipeline-breaking changes.</p>
                                <img src={awsIcon} class="w-20 h-20 rounded-full text-wrap"/>
                            </div>
                        </div>
                        <div>
                            <h3 class="italic font-semibold">Execify</h3>
                            <div class="flex flex-row items-center gap-5">
                                <p class="text-sm">I created an email terminal that is cross compatible with Gmail and Outlook 
                                    and is capable of managing multiple accounts under a single user; I created an AI agent 
                                    capable of performing all functions in the user’s email and Slack accounts. I utilized 
                                    Supabase and tRPC routes to handle real-time updates from email endpoints to securely store, 
                                    manage, and sync incoming user data, and I built out an intuitive and reactive UI using 
                                    SvelteKit and Tailwind CSS.</p>
                                <img src={execifyIcon} class="w-20 h-20 rounded-full text-wrap"/>
                            </div>
                        </div>
                        <div>
                            <h3 class="italic font-semibold">Nexa Speech</h3>
                            <div class="flex flex-row items-center gap-5">
                                <p class="text-sm">I developed a fully streaming, low latency speech-to-speech pipeline 
                                    using FastAPI for user-to-LLM communication. In conjunction, I created an API endpoint 
                                    for the open-source text-to-speech system StyleTTS2 to stream both the input and output 
                                    of that resource.</p>
                                <img src={nexaIcon} class="w-20 h-20 rounded-full text-wrap" />
                            </div>
                        </div>
                    </div>
                </div>
            </Draggable>
        </div>
        : null
    )
}

export default ExperienceFile;