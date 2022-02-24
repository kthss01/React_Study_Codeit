import { useState } from 'react';
import Button from './Button';
import HandButton from './HandButton';
import HandIcon from './HandIcon';
import { compareHand, generateRandomHand } from './utils';

const INITIAL_VALUE = 'rock';

function getResult(me, other) {
    const comparison = compareHand(me, other);
    if (comparison > 0) return '승리';
    if (comparison < 0) return '패배';
    return '무승부';
}

function App() {
    const [ hand, setHand ] = useState(INITIAL_VALUE);
    const [ otherHand, setOtherHand ] = useState(INITIAL_VALUE);

    const handleButtonClick = (nextHand) => {
        const nextOtherHand = generateRandomHand();
        setHand(nextHand);
        setOtherHand(nextOtherHand);
    };

    const handleClearClick = () => {
        setHand(INITIAL_VALUE);
        setOtherHand(INITIAL_VALUE);
    };
    
    return (
        <div>
            <Button onClick={handleClearClick}>처음부터</Button>
            <p>{getResult(hand, otherHand)}</p>
            <div>
                <HandIcon value={hand} />
                VS
                <HandIcon value={otherHand} />
            </div>
            <HandButton value="rock" onClick={handleButtonClick} />
            <HandButton value="scissor" onClick={handleButtonClick} />
            <HandButton value="paper" onClick={handleButtonClick} />
        </div>
    );
}

export default App;