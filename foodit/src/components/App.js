import FoodList from "./FoodList";
import { useState } from "react";
import { getFoods } from "../api";

function App() {
    const [order, setOrder] = useState("createAt");
    const [items, setItems] = useState([]);
    const sortedItems = items.sort((a, b) => b[order] - a[order]);

    const handleNewestClick = () => setOrder("createdAt");
    const handleCalorieClick = () => setOrder("calorie");
    const handleDelete = (id) => {
        const nextItems = items.filter((item) => item.id !== id);
        setItems(nextItems);
    };
    const handleLoadClick = async () => {
        const { foods } = await getFoods();
        setItems(foods);
    };

    return (
        <div>
            <button onClick={handleNewestClick}>최신순</button>
            <button onClick={handleCalorieClick}>칼로리순</button>
            <FoodList items={sortedItems} onDelete={handleDelete} />
            <button onClick={handleLoadClick}>불러오기</button>
        </div>
    );
}

export default App;
