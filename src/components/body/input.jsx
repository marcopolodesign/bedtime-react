import PropTypes from 'prop-types';

const Input = ({ age, setAge }) => {
    return (
        <input type="text" value={age} onChange={(e) => setAge(e.target.value)} required />
    );
}

Input.propTypes = {
    age: PropTypes.string.isRequired,
    setAge: PropTypes.func.isRequired
};

export default Input;
