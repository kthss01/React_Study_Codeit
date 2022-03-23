import ReviewList from "./ReviewList";
// import mockItems from "../mock.json";
import { useEffect, useState } from "react";
import { getReviews } from "../api";
import ReviewForm from "./ReviewForm";

const LIMIT = 6;

function App() {
    const [items, setItems] = useState([]);
    // const [items, setItems] = useState(mockItems);
    const [order, setOrder] = useState("createdAt");
    const [offset, setOffset] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(null);

    const sortedItems = items.sort((a, b) => b[order] - a[order]);

    const handleNewestClick = () => setOrder("createdAt");
    const handleBestClick = () => setOrder("rating");
    const handleDelete = (id) => {
        const nextItems = items.filter((item) => item.id !== id);
        setItems(nextItems);
    };
    const handleLoad = async (options) => {
        let result;
        try {
            setIsLoading(true);
            setLoadingError(null);
            result = await getReviews(options);
        } catch (error) {
            // console.error(error);
            setLoadingError(error);
            return;
        } finally {
            setIsLoading(false);
        }
        const { reviews, paging } = result;
        if (options.offset === 0) {
            setItems(reviews);
        } else {
            setItems((prevItems) => [...prevItems, ...reviews]);
        }
        setOffset(options.offset + reviews.length);
        setHasNext(paging.hasNext);
    };
    const handleLoadMore = () => {
        handleLoad({ order, offset, limit: LIMIT });
    };

    //handleLoad(); // 무한루프 발생함

    // const handleLoadClick = async () => {
    //     const { reviews } = await getReviews();
    //     setItems(reviews);
    // };

    useEffect(() => {
        handleLoad({ order, offset: 0, limit: LIMIT });
    }, [order]);

    return (
        <div>
            <div>
                <button onClick={handleNewestClick}>최신순</button>
                <button onClick={handleBestClick}>베스트순</button>
            </div>
            <ReviewForm />
            <ReviewList items={sortedItems} onDelete={handleDelete} />
            {/* <button onClick={handleLoadClick}>불러오기</button> */}
            {hasNext && (
                <button disabled={isLoading} onClick={handleLoadMore}>
                    더 보기
                </button>
            )}
            {loadingError?.message && <span>{loadingError.message}</span>}
        </div>
    );
}

export default App;
