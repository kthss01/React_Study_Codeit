import { useState } from "react";
import { useEffect, useRef } from "react";

function FileInput({ name, value, onChange }) {
    // const [value, setValue] = useState("");

    const [preview, setPreview] = useState();

    const inputRef = useRef();

    const handleChange = (e) => {
        // console.log(e.target.files);
        // console.log(e.target.value);
        const nextValue = e.target.files[0];
        // setValue(nextValue);
        onChange(name, nextValue);
    };

    useEffect(() => {
        // if (inputRef.current) {
        //     console.log(inputRef);
        // }

        if (!value) return;

        // 해당 파일의 주소처럼 쓸 수 있는 값 문자열로 리턴
        const nextPreview = URL.createObjectURL(value);
        setPreview(nextPreview);

        return () => {
            setPreview();
            URL.revokeObjectURL(nextPreview);
        };
    }, [value]);

    const hanldeClearClick = () => {
        const inputNode = inputRef.current;
        if (!inputNode) return;

        inputNode.value = "";
        onChange(name, null);
    };

    return (
        <div>
            <img src={preview} alt="이미지 미리보기" />
            <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleChange}
                ref={inputRef}
            />
            {value && <button onClick={hanldeClearClick}>X</button>}
        </div>
    );
    // return <input type="file" value={value} onChange={handleChange} />;
}

export default FileInput;
