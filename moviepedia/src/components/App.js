import ReviewList from "./ReviewList";
// import mockItems from "../mock.json";
import { useEffect, useState } from "react";
import { getReviews } from "../api";

function App() {
    const [items, setItems] = useState([]);
    // const [items, setItems] = useState(mockItems);
    const [order, setOrder] = useState("createdAt");
    const sortedItems = items.sort((a, b) => b[order] - a[order]);

    const handleNewestClick = () => setOrder("createdAt");
    const handleBestClick = () => setOrder("rating");

    const handleDelete = (id) => {
        const nextItems = items.filter((item) => item.id !== id);
        setItems(nextItems);
    };

    const handleLoad = async (orderQuery) => {
        const { reviews } = await getReviews(orderQuery);
        setItems(reviews);
    };

    //handleLoad(); // 무한루프 발생함

    // const handleLoadClick = async () => {
    //     const { reviews } = await getReviews();
    //     setItems(reviews);
    // };

    useEffect(() => {
        handleLoad(order);
    }, [order]);

    return (
        <div>
            <div>
                <button onClick={handleNewestClick}>최신순</button>
                <button onClick={handleBestClick}>베스트순</button>
            </div>
            <ReviewList items={sortedItems} onDelete={handleDelete} />
            {/* <button onClick={handleLoadClick}>불러오기</button> */}
        </div>
    );
}

export default App;
