import { useState } from "react";
import { createFood } from "../api";
import FileInput from "./FileInput";

const INITIAL_VALUES = {
    title: "",
    calorie: 0,
    content: "",
    imgFile: null,
};

function sanitize(type, value) {
    switch (type) {
        case "number":
            return Number(value) || 0;

        default:
            return value;
    }
}

function FoodForm({ onSubmitSuccess }) {
    const [values, setValues] = useState(INITIAL_VALUES);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittingError, setSubmittingError] = useState(null);

    const handleChange = (name, value, type) => {
        setValues((prevValues) => ({
            ...prevValues,
            [name]: sanitize(type, value),
        }));
    };

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        handleChange(name, value, type);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("imgFile", values.imgFile);
        formData.append("title", values.title);
        formData.append("calorie", values.calorie);
        formData.append("content", values.content);

        let result;
        try {
            setSubmittingError(null);
            setIsSubmitting(true);
            result = await createFood(formData);
        } catch (error) {
            setSubmittingError(error);
            return;
        } finally {
            setIsSubmitting(false);
        }

        const { food } = result;
        onSubmitSuccess(food);

        setValues(INITIAL_VALUES);
    };

    return (
        <form onSubmit={handleSubmit}>
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
                type="number"
                name="calorie"
                value={values.calorie}
                onChange={handleInputChange}
            />
            <input
                name="content"
                value={values.content}
                onChange={handleInputChange}
            />
            <button type="submit" disabled={isSubmitting}>
                확인
            </button>
            {submittingError?.message && <div>{submittingError.message}</div>}
        </form>
    );
}

export default FoodForm;
