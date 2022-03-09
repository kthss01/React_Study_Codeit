import FoodList from "./FoodList";
import mockItems from "../mock.json";
import { useState } from "react";

function App() {
    const [order, setOrder] = useState("createAt");
    const [items, setItems] = useState(mockItems);
    const sortedItems = items.sort((a, b) => b[order] - a[order]);

    const handleNewestClick = () => setOrder("createdAt");
    const handleCalorieClick = () => setOrder("calorie");
    const handleDelete = (id) => {
        const nextItems = items.filter((item) => item.id !== id);
        setItems(nextItems);
    };

    return (
        <div>
            <div>
                <button onClick={handleNewestClick}>최신순</button>
                <button onClick={handleCalorieClick}>칼로리순</button>
            </div>
            <FoodList items={sortedItems} onDelete={handleDelete} />
        </div>
    );
}

export default App;
