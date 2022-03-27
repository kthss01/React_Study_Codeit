// import { useState } from "react";

import { useEffect, useRef } from "react";

function FileInput({ name, value, onChange }) {
    // const [value, setValue] = useState("");

    const inputRef = useRef();

    const handleChange = (e) => {
        // console.log(e.target.files);
        // console.log(e.target.value);
        const nextValue = e.target.files[0];
        // setValue(nextValue);
        onChange(name, nextValue);
    };

    // useEffect(() => {
    //     if (inputRef.current) {
    //         console.log(inputRef);
    //     }
    // }, []);

    return <input type="file" onChange={handleChange} ref={inputRef} />;
    // return <input type="file" value={value} onChange={handleChange} />;
}

export default FileInput;
