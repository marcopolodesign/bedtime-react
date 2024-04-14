import MarcoPolo from '/src/assets/marcopolo.svg';

export default function Header() {
    return (
        <div className="flex justify-between items-center">
            <img src={MarcoPolo} alt="My SVG" />
            <div className="flex">
                <p className="p-2  rounded-full border-2 border-black">EN </p>
                <i className="fas fa-arrow-down"></i>
            </div>
        </div>
    );
}

