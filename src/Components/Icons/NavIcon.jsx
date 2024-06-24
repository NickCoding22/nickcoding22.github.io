import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function NavIcon({icon, name, link}) {
    return (
        <a 
            class="rounded-lg px-2 flex flex-row justify-center items-center hover:scale-125 transition duration-500 cursor-pointer"
            href={link}
            target="_blank"
        >
            <FontAwesomeIcon icon={icon} size="2xl" style={{color: 'black', background: 'white'}} />
            <h3 class="text-black text-lg font-bold pl-2">{name}</h3>
        </a>
    )
}

export default NavIcon;