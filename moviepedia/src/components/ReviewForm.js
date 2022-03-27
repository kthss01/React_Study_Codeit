import { useState } from "react";
import FileInput from "./FileInput";
import "./ReviewForm.css";

function ReviewForm() {
    // const [title, setTitle] = useState("");
    // const [rating, setRating] = useState(0);
    // const [content, setContent] = useState("");
    const [values, setValues] = useState({
        title: "",
        rating: 0,
        content: "",
        imgFile: null,
    });

    // const handleTitleChange = (e) => {
    //     setTitle(e.target.value);
    // };

    // const handleRatingChange = (e) => {
    //     const nextRating = Number(e.target.value) || 0;
    //     setRating(nextRating);
    // };

    // const handleContentChange = (e) => {
    //     setContent(e.target.value);
    // };

    const handleChange = (name, value) => {
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            // title,
            // rating,
            // content,
            values,
        });
    };

    return (
        <form className="ReviewForm" onSubmit={handleSubmit}>
            <FileInput
                name="imgFile"
                value={values.imgFile}
                onChange={handleChange}
            />
            <input
                name="title"
                value={values.title}
                onChange={handleInputChange}
            />
            <input
                name="rating"
                type="number"
                value={values.rating}
                onChange={handleInputChange}
            />
            <textarea
                name="content"
                value={values.content}
                onChange={handleInputChange}
            />
            <button type="submit">확인</button>
        </form>
    );
}

export default ReviewForm;
