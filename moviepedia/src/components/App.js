import { useCallback, useEffect, useState } from "react";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import { createReview, deleteReview, getReviews, updateReview } from "../api";
import useAsync from "../hooks/useAsync";
import LocaleSelect from "./LocaleSelect";
import "./App.css";
import logoImg from "../assets/logo.png";
import ticketImg from "../assets/ticket.png";
import useTranslate from "../hooks/useTranslate";

const LIMIT = 6;

function AppSortButton({ selected, children, onClick }) {
    return (
        <button
            disabled={selected}
            className={`AppSortButton ${selected ? "selected" : ""}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

function App() {
    const t = useTranslate();
    const [order, setOrder] = useState("createdAt");
    const [offset, setOffset] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const [isLoading, loadingError, getReviewAsync] = useAsync(getReviews);
    const [items, setItems] = useState([]);
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
        <div className="App">
            <nav className="App-nav">
                <div className="App-nav-container">
                    <img className="App-logo" src={logoImg} alt="MOVIE PEDIA" />
                    <LocaleSelect />
                </div>
            </nav>
            <div className="App-container">
                <div
                    className="App-ReviewForm"
                    style={{
                        backgroudnImage: `url("${ticketImg}")`,
                    }}
                >
                    <ReviewForm
                        onSubmit={createReview}
                        onSubmitSuccess={handleCreateSuccess}
                    />
                </div>
                <div className="App-sorts">
                    <AppSortButton
                        selected={order == "createdAt"}
                        onClick={handleNewestClick}
                    >
                        {t("newset")}
                    </AppSortButton>
                    <AppSortButton
                        selected={order === "rating"}
                        onClick={handleBestClick}
                    >
                        {t("best")}
                    </AppSortButton>
                </div>
                <div className="App-ReviewList">
                    <ReviewList
                        items={sortedItems}
                        onDelete={handleDelete}
                        onUpdate={updateReview}
                        onUpdateSuccess={handleUpdateSuccess}
                    />
                    {hasNext ? (
                        <button
                            className="App-load-more-button"
                            disabled={isLoading}
                            onClick={handleLoadMore}
                        >
                            {t("load more")}
                        </button>
                    ) : (
                        <div className="App-load-more-button" />
                    )}
                    {loadingError?.message && (
                        <span>{loadingError.message}</span>
                    )}
                </div>
                <footer className="App-footer">
                    <div className="App-footer-container">
                        {t("terms ofr service")} | {t("privacy policy")}
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default App;
