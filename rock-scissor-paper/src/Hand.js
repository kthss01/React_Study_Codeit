import './Hand.css';
import './HandIcon';
import HandIcon from './HandIcon';

function Hand({ hand, winner }) {
    const classNames = `Hand ${winner ? 'winner' : ''}`;
    return (
        <div className={classNames}>
            <HandIcon className="Hand-icon" value={hand}></HandIcon>
        </div>
    );
}

export default Hand;