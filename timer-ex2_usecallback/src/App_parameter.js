import { useEffect, useState } from "react";

function App() {
    const [count, setCount] = useState(0);
    const [num, setNum] = useState(0);

    const addCount = (log) => {
        setCount((c) => c + 1);
        console.log(log);
    };

    const addNum = () => setNum((n) => n + 1);

    useEffect(() => {
        console.log("timer start");
        const timerId = setInterval(() => {
            addCount(`num ${num}`);
        }, 1000);

        return () => {
            clearInterval(timerId);
            console.log("timer end");
        };
    }, [num]);

    return (
        <div>
            <button onClick={addCount}>count: {count}</button>
            <button onClick={addNum}>num: {num}</button>
        </div>
    );
}

export default App;
