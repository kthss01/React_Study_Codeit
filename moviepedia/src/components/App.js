import ReviewList from "./ReviewList";
// import mockItems from "../mock.json";
import { useCallback, useEffect, useState } from "react";
import { createReview, deleteReview, getReviews, updateReview } from "../api";
import ReviewForm from "./ReviewForm";
import useAsync from "../hooks/useAsync";
import LocaleContext, { LocaleProvider } from "../contexts/LocaleContext";
import LocaleSelect from "./LocaleSelect";

const LIMIT = 6;

function App() {
    const [items, setItems] = useState([]);
    // const [items, setItems] = useState(mockItems);
    const [order, setOrder] = useState("createdAt");
    const [offset, setOffset] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const [isLoading, loadingError, getReviewAsync] = useAsync(getReviews);
    // const [isLoading, setIsLoading] = useState(false);
    // const [loadingError, setLoadingError] = useState(null);

    const sortedItems = items.sort((a, b) => b[order] - a[order]);

    const handleNewestClick = () => setOrder("createdAt");
    const handleBestClick = () => setOrder("rating");
    const handleDelete = async (id) => {
        const result = await deleteReview(id);

        if (!result) {
            return;
        }

        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };
    const handleLoad = useCallback(
        async (options) => {
            // let result;
            // try {
            //     setIsLoading(true);
            //     setLoadingError(null);
            //     result = await getReviews(options);
            // } catch (error) {
            //     // console.error(error);
            //     setLoadingError(error);
            //     return;
            // } finally {
            //     setIsLoading(false);
            // }
            const result = await getReviewAsync(options);
            if (!result) {
                return;
            }

            const { reviews, paging } = result;
            if (options.offset === 0) {
                setItems(reviews);
            } else {
                setItems((prevItems) => [...prevItems, ...reviews]);
            }
            setOffset(options.offset + reviews.length);
            setHasNext(paging.hasNext);
        },
        [getReviewAsync]
    );
    const handleLoadMore = () => {
        handleLoad({ order, offset, limit: LIMIT });
    };

    //handleLoad(); // 무한루프 발생함

    // const handleLoadClick = async () => {
    //     const { reviews } = await getReviews();
    //     setItems(reviews);
    // };

    const handleCreateSuccess = (review) => {
        setItems((prevItems) => [...prevItems, review]);
    };

    const handleUpdateSuccess = (review) => {
        setItems((prevItems) => {
            const splitIdx = prevItems.findIndex(
                (item) => item.id === review.id
            );
            return [
                ...prevItems.slice(0, splitIdx),
                review,
                ...prevItems.slice(splitIdx + 1),
            ];
        });
    };

    useEffect(() => {
        handleLoad({ order, offset: 0, limit: LIMIT });
    }, [order, handleLoad]);

    return (
        <LocaleProvider defaultValue={"ko"}>
            <div>
                <LocaleSelect />
                <div>
                    <button onClick={handleNewestClick}>최신순</button>
                    <button onClick={handleBestClick}>베스트순</button>
                </div>
                <ReviewForm
                    onSubmit={createReview}
                    onSubmitSuccess={handleCreateSuccess}
                />
                <ReviewList
                    items={sortedItems}
                    onDelete={handleDelete}
                    onUpdate={updateReview}
                    onUpdateSuccess={handleUpdateSuccess}
                />
                {/* <button onClick={handleLoadClick}>불러오기</button> */}
                {hasNext && (
                    <button disabled={isLoading} onClick={handleLoadMore}>
                        더 보기
                    </button>
                )}
                {loadingError?.message && <span>{loadingError.message}</span>}
            </div>
        </LocaleProvider>
    );
}

export default App;
