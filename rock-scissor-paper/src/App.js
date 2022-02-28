import { useState } from 'react';
import './App.css';
import resetImg from './assets/ic-reset.svg';
import Score from './Score';
import Hand from './Hand';
import HandButton from './HandButton';
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
    const [ gameHistory, setGameHistory ] = useState([]);
    const [ score, setScore ] = useState(0);
    const [ otherScore, setOtherScore ] = useState(0);
    const [ bet, setBet ] = useState(1);

    const handleButtonClick = (nextHand) => {
        const nextOtherHand = generateRandomHand();
        const nextHistoryItem = getResult(nextHand, nextOtherHand);
        const comparison = compareHand(nextHand, nextOtherHand);

        setHand(nextHand);
        setOtherHand(nextOtherHand);
        setGameHistory([...gameHistory, nextHistoryItem]);

        if (comparison > 0) setScore(score + bet);
        if (comparison < 0) setOtherScore(otherScore + bet);
    };

    const handleClearClick = () => {
        setHand(INITIAL_VALUE);
        setOtherHand(INITIAL_VALUE);
        setGameHistory([]);
        setScore(0);
        setOtherScore(0);
        setBet(1);
    };

    const handleBetChange = (e) => {
        let num = Number(e.target.value);
        if (num > 9) num %= 10; // 1 ~ 9 사이의 숫자로 변환
        if (num < 1) num = 1;
        num = Math.floor(num);
        setBet(num);
    };

    const checkWinner = (player) => {
        const result = gameHistory[gameHistory.length - 1];
        if (player === 'me') {
            return result === '승리';
        } else if (player === 'other') {
            return result === '패배';
        }
        return false; // 무승부
    }

    return (
        <div className="App">
            <h1 className="App-heading">가위바위보</h1>
            <img className="App-reset" src={resetImg} alt="초기화" onClick={handleClearClick} />
            <div className="App-scores">
                <Score score={score} name={'나'} />
                <div class="App-versus">:</div>
                <Score score={otherScore} name={'상대'} />
            </div>
            <div className="Box App-box">
                <div className="Box-inner">
                    <div className="App-hands">
                        <Hand hand={hand} winner={checkWinner('me')} />
                        <div class="App-versus">VS</div>
                        <Hand hand={otherHand} winner={checkWinner('other')} />
                    </div>
                </div>
                <div className="App-bet">
                    <span>배점</span>
                    <input type="number" onChange={handleBetChange} value={bet} min={1} max={9} step="1" />
                    <span>배</span>
                </div>
                <div className="App-history">
                    <h2>승부기록</h2>
                    <p>{gameHistory.join(', ')}</p>
                </div>
            </div>
            <div>
                <HandButton value="rock" onClick={handleButtonClick} />
                <HandButton value="scissor" onClick={handleButtonClick} />
                <HandButton value="paper" onClick={handleButtonClick} />
            </div>
        </div>
    );
}

export default App;