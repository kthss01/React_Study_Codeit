import './Score.css';

function Score({ score, name }) {
    return (
        <div className="Score">
            <div className="Score-num">{score}</div>
            <div className="Score-name">{name}</div>
        </div>
    );
}

export default Score;