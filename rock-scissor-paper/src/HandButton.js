import HandIcon from './HandIcon';
import './HandleButton.css';


function HandButton({ value, onClick }) {
    const handleClick = () => onClick(value);
    return (
        <button className="HandButton" onClick={handleClick}>
            <HandIcon className="HandButton-icon" value={value} />
        </button>
    );
}

export default HandButton;