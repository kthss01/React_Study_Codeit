import { useState } from "react";
import "./Rating.css";

const RATINGS = [1, 2, 3, 4, 5];

// const [state, setState] = useState(); // 리액트 훅 함수 리액트 컴포넌트 안에서만 실행

function Star({ selected = false, rating, onSelect, onHover }) {
    const className = `Rating-star ${selected ? "selected" : ""}`;

    // const states = [];
    // for (let i = 0; i < 9; i++) {
    //     const state = useState();
    //     states.push(state);
    // } // 리액트 훅 반복문, 조건문에서 사용 불가

    const handleClick = onSelect ? () => onSelect(rating) : undefined;
    const handleMouseOver = onHover ? () => onHover(rating) : undefined;

    return (
        <span
            className={className}
            onClick={handleClick}
            onMouseOver={handleMouseOver}
        >
            ★
        </span>
    );
}

function Rating({ className, value = 0, onSelect, onHover, onMouseOut }) {
    return (
        <div className={className} onMouseOut={onMouseOut}>
            {RATINGS.map((rating) => (
                <Star
                    key={rating}
                    selected={value >= rating}
                    rating={rating}
                    onSelect={onSelect}
                    onHover={onHover}
                />
            ))}
        </div>
    );
}

export default Rating;
