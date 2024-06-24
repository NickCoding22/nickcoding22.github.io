import Clock from 'react-live-clock';

function TimeBox() {
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

    return (
        <div class="text-lg text-black pr-3 font-bold">
            <Clock format={'ddd MMMM Do hh:mmA'} blinking={true} timezone={timeZone} />
        </div>
    )
}

export default TimeBox;