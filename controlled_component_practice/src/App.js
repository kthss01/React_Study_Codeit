import { useState } from "react";

function MyComponent({ value, onChange }) {
    const handleChange = (e) => {
        const nextValue = e.target.value.toUpperCase();
        onChange(nextValue);
    };

    // 제어 컴포넌트
    // return <input value={value} onChange={handleChange} />;
    // 비제어 컴포넌트 리액트에서 input의 value값 지정 x
    return <input value={value} onChange={handleChange} />;
}

function App() {
    const [value, setValue] = useState("");

    const handleClear = () => setValue("");

    return (
        <div>
            <MyComponent value={value} onChange={setValue} />
            <button onClick={handleClear}>지우기</button>
        </div>
    );
}

export default App;
