import { useState } from "react";
import { createReviews } from "../api";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import "./ReviewForm.css";

const INITIAL_VALUES = {
    title: "",
    rating: 0,
    content: "",
    imgFile: null,
};

function ReviewForm({
    initialValues = INITIAL_VALUES,
    initialPreview,
    onSubmitSuccess,
    onCancel,
}) {
    // const [title, setTitle] = useState("");
    // const [rating, setRating] = useState(0);
    // const [content, setContent] = useState("");
    const [values, setValues] = useState(initialValues);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittingError, setSubmittingError] = useState(null);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log({
        //     // title,
        //     // rating,
        //     // content,
        //     values,
        // });

        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("rating", values.rating);
        formData.append("content", values.content);
        formData.append("imgFile", values.imgFile);

        //console.log(values);
        let result;
        try {
            setSubmittingError(null);
            setIsSubmitting(true);
            result = await createReviews(formData);
        } catch (error) {
            setSubmittingError(error);
            return;
        } finally {
            setIsSubmitting(false);
        }

        const { review } = result;
        onSubmitSuccess(review);

        setValues(INITIAL_VALUES);
    };

    return (
        <form className="ReviewForm" onSubmit={handleSubmit}>
            <FileInput
                name="imgFile"
                value={values.imgFile}
                initialPreview={initialPreview}
                onChange={handleChange}
            />
            <input
                name="title"
                value={values.title}
                onChange={handleInputChange}
            />
            <RatingInput
                name="rating"
                value={values.rating}
                onChange={handleChange}
            />
            <textarea
                name="content"
                value={values.content}
                onChange={handleInputChange}
            />
            <button type="submit" disabled={isSubmitting}>
                확인
            </button>
            {onCancel && <button onClick={onCancel}>취소</button>}
            {submittingError?.message && <div>{submittingError.message}</div>}
        </form>
    );
}

export default ReviewForm;
