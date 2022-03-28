import { useEffect, useState } from "react";

function Timer() {
    const [second, setSecond] = useState(0);

    useEffect(() => {
        const timerId = setInterval(() => {
            console.log("타이머 실행중 ... ");
            setSecond((prevSecond) => prevSecond + 1);
        }, 1000);
        console.log("타이머 시작 🏁");

        return () => {
            clearInterval(timerId);
            console.log("타이머 멈춤 ✋");
        };
    }, []);

    return <div>{second}</div>;
}

function App() {
    const [show, setShow] = useState(false);

    const handleShowClick = () => setShow(true);
    const handleHideClick = () => setShow(false);

    return (
        <div>
            {show && <Timer />}
            <button onClick={handleShowClick}>보이기</button>
            <button onClick={handleHideClick}>감추기</button>
        </div>
    );
}

export default App;
