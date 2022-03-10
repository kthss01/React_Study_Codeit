import { useState } from "react";
import mockItems from "./pokemons";

function Pokemon({ item, onDelete }) {
    const handleDeleteClick = () => onDelete(item.id);

    return (
        <div>
            No.{item.id} {item.name}
            <button onClick={handleDeleteClick}>삭제</button>
        </div>
    );
}

function App() {
    const [direction, setDirection] = useState(1);
    const [items, setItems] = useState(mockItems);

    const handleAscClick = () => setDirection(1);
    const handleDescClick = () => setDirection(-1);
    const sortedItems = items.sort((a, b) => direction * (a.id - b.id));

    const handleDelete = (id) => {
        const nextItems = items.filter((item) => item.id !== id);
        setItems(nextItems);
    };

    return (
        <div>
            <div>
                <button onClick={handleAscClick}>도감번호 순서대로</button>
                <button onClick={handleDescClick}>도감번호 반대로</button>
            </div>
            <ul>
                {sortedItems.map((item) => (
                    <li key={item.id}>
                        <Pokemon item={item} onDelete={handleDelete} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
