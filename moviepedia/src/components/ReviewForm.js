import { useState } from "react";
import FileInput from "./FileInput";
import useAsync from "../hooks/useAsync";
import RatingInput from "./RatingInput";
import "./ReviewForm.css";
import useTranslate from "../hooks/useTranslate";

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
    onSubmit,
    onCancel,
}) {
    const t = useTranslate();
    // const [title, setTitle] = useState("");
    // const [rating, setRating] = useState(0);
    // const [content, setContent] = useState("");
    const [values, setValues] = useState(initialValues);
    // const [isSubmitting, setIsSubmitting] = useState(false);
    // const [submittingError, setSubmittingError] = useState(null);
    const [isSubmitting, submittingError, onSubmitAsync] = useAsync(onSubmit);

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
        // let result;
        // try {
        //     setSubmittingError(null);
        //     setIsSubmitting(true);
        //     result = await onSubmit(formData);
        // } catch (error) {
        //     setSubmittingError(error);
        //     return;
        // } finally {
        //     setIsSubmitting(false);
        // }
        const result = await onSubmitAsync(formData);
        if (!result) {
            return;
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
                {t("confirm button")}
            </button>
            {onCancel && (
                <button onClick={onCancel}>{t("cancel button")}</button>
            )}
            {submittingError?.message && <div>{submittingError.message}</div>}
        </form>
    );
}

export default ReviewForm;
