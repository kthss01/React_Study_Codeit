function FileInput({ name, value, onChange }) {
    const handleChange = (e) => {
        const nextValue = e.target.value;
        onChange(name, nextValue);
    };

    return <input type="file" onChange={handleChange} />;
}

export default FileInput;
