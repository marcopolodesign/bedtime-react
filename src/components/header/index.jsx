import PropTypes from 'prop-types';
import MarcoPolo from '/src/assets/marcopolo.svg';

export default function Header({ currentLanguage, setCurrentLanguage }) {
    return (
        <div className="flex justify-between items-center">
            <img src={MarcoPolo} alt="My SVG" />
           
            <div className="flex">
                {currentLanguage !== 'es' && (
                    <div onClick={() => setCurrentLanguage('es')} disabled={currentLanguage === 'es'}>
                        <p className="p-2  rounded-full border-2 border-black">🇬🇧 EN </p>
                        <i className="fas fa-arrow-down"></i>
                    </div>
                )}

                {currentLanguage !== 'en' && (
                    <div onClick={() => setCurrentLanguage('en')} disabled={currentLanguage === 'en'}>
                        <p className="p-2  rounded-full border-2 border-black">🇦🇷 ES </p>
                        <i className="fas fa-arrow-down"></i>
                    </div>
                )}
            </div>
        </div>
    );
}

Header.propTypes = {
    currentLanguage: PropTypes.string.isRequired,
    setCurrentLanguage: PropTypes.func.isRequired
};
