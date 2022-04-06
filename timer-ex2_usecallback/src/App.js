import { useCallback, useEffect, useState } from "react";

function App() {
    const [count, setCount] = useState(0);
    const [num, setNum] = useState(0);

    const addCount = useCallback(() => {
        setCount((c) => c + 1);
        console.log(`num: ${num}`);
    }, [num]);

    const addNum = () => setNum((n) => n + 1);

    useEffect(() => {
        console.log("timer start");
        const timerId = setInterval(() => {
            addCount(); // 카운트가 바뀔 때마다 새로 만들어짐
        }, 1000);

        return () => {
            clearInterval(timerId);
            console.log("timer end");
        };
    }, [addCount]);

    return (
        <div>
            <button onClick={addCount}>count: {count}</button>
            <button onClick={addNum}>num: {num}</button>
        </div>
    );
}

export default App;
