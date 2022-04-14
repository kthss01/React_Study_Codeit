import { useState } from "react";
import useTranslate from "../hooks/useTranslate";
import FoodForm from "./FoodForm";
import placeholderImg from "../assets/preview-placeholder.png";
import "./FoodList.css";

function formatDate(value) {
    const date = new Date(value);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function FoodListItem({ item, onDelete, onEdit }) {
    const { imgUrl, title, calorie, content, createdAt } = item;
    const t = useTranslate();

    const handleDeleteClick = () => onDelete(item.id);
    const handleEditClick = () => onEdit(item.id);

    return (
        <div className="FoodListItem">
            <img
                className="FoodListItem-preview"
                src={imgUrl || placeholderImg}
                alt={title}
            />
            <div className="FoodListItem-rows">
                <div className="FoodListItem-title-calorie">
                    <h1 className="FoodListItem-title">{title}</h1>
                    <span className="FoodListItem-calorie">{calorie}kcal</span>
                </div>
                <p className="FoodListItem-content">{content}</p>
                <div className="FoodListItem-date-buttons">
                    <p className="FoodListItem-date">{formatDate(createdAt)}</p>
                    <div className="FoodListItem-buttons">
                        <button
                            className="FoodListItem-edit-button"
                            onClick={handleEditClick}
                        >
                            {t("edit button")}
                        </button>
                        <button
                            className="FoodListItem-delete-button"
                            onClick={handleDeleteClick}
                        >
                            {t("delete button")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FoodList({
    className = "",
    items,
    onDelete,
    onUpdate,
    onUpdateSuccess,
}) {
    const [editingId, setEditingId] = useState(null);

    const handleCancel = () => {
        setEditingId(null);
    };

    return (
        <ul className={`FoodList ${className}`}>
            {items.map((item) => {
                if (item.id === editingId) {
                    const { id, imgUrl, title, calorie, content } = item;
                    const initialValues = {
                        title,
                        calorie,
                        content,
                        imgFile: null,
                    };

                    const handleSubmit = (formData) => onUpdate(id, formData);

                    const handleSubmitSuccess = (food) => {
                        onUpdateSuccess(food);
                        setEditingId(null);
                    };

                    return (
                        <li key={item.id}>
                            <FoodForm
                                initialValues={initialValues}
                                initialPreview={imgUrl}
                                onCancel={handleCancel}
                                onSubmit={handleSubmit}
                                onSubmitSuccess={handleSubmitSuccess}
                            />
                        </li>
                    );
                }
                return (
                    <li key={item.id}>
                        <FoodListItem
                            item={item}
                            onEdit={setEditingId}
                            onDelete={onDelete}
                        />
                    </li>
                );
            })}
        </ul>
    );
}

export default FoodList;
