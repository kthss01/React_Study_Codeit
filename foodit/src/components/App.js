import { useEffect, useState, useCallback } from "react";
import { createFood, updateFood, getFoods, deleteFood } from "../api";
import FoodList from "./FoodList";
import FoodForm from "./FoodForm";
import LocaleSelect from "./LocaleSelect";
import useTranslate from "../hooks/useTranslate";
import logoImg from "../assets/logo.png";
import searchImg from "../assets/ic-search.png";
import logoTextImg from "../assets/logo-text.png";
import backgroundImg from "../assets/background.png";
import useAsync from "../hooks/useAsync";
import "./App.css";

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
    const [cursor, setCursor] = useState(null);
    const [items, setItems] = useState([]);
    const [isLoading, loadingError, getFoodAsync] = useAsync(getFoods);
    const [search, setSearch] = useState("");

    const handleNewestClick = () => setOrder("createdAt");

    const handleCalorieClick = () => setOrder("calorie");

    const handleDelete = async (id) => {
        const result = await deleteFood(id);

        if (!result) return;

        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };
    const handleLoad = useCallback(
        async (options) => {
            const result = await getFoodAsync(options);

            if (!result) {
                return;
            }

            const {
                foods,
                paging: { nextCursor },
            } = result;
            if (!options.nextCursor) {
                setItems(foods);
            } else {
                setItems((prevItems) => [...prevItems, ...foods]);
            }
            setCursor(nextCursor);
        },
        [getFoodAsync]
    );

    const handleLoadMore = () => {
        handleLoad({ order, cursor, search });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearch(e.target["search"].value);
    };

    const handleCreateSuccess = (food) => {
        setItems((prevItems) => [...prevItems, food]);
    };

    const handleUpdateSuccess = (food) => {
        setItems((prevItems) => {
            const splitIdx = prevItems.findIndex((item) => item.id === food.id);

            return [
                ...prevItems.slice(0, splitIdx),
                food,
                ...prevItems.slice(splitIdx + 1),
            ];
        });
    };

    const sortedItems = items.sort((a, b) => b[order] - a[order]);

    useEffect(() => {
        handleLoad({ order, search });
    }, [order, search, handleLoad]);

    return (
        <div
            className="App"
            style={{ backgroundImage: `url("${backgroundImg}")` }}
        >
            <div className="App-nav">
                <img src={logoImg} alt="Foodit" />
            </div>
            <div className="App-container">
                <div className="App-FoodForm">
                    <FoodForm
                        onSubmit={createFood}
                        onSubmitSuccess={handleCreateSuccess}
                    />
                </div>
                <div className="App-filter">
                    <form className="App-search" onSubmit={handleSearchSubmit}>
                        <input className="App-search-input" name="search" />
                        <button className="App-search-button" type="submit">
                            <img src={searchImg} alt="검색" />
                        </button>
                    </form>
                    <div className="App-orders">
                        <AppSortButton
                            selected={order === "createdAt"}
                            onClick={handleNewestClick}
                        >
                            {t("newest")}
                        </AppSortButton>
                        <AppSortButton
                            selected={order === "calorie"}
                            onClick={handleCalorieClick}
                        >
                            {t("sort by calorie")}
                        </AppSortButton>
                    </div>
                </div>
                <FoodList
                    className="App-FoodList"
                    items={sortedItems}
                    onUpdate={updateFood}
                    onUpdateSuccess={handleUpdateSuccess}
                    onDelete={handleDelete}
                />
                {cursor && (
                    <button
                        className="App-load-more-button"
                        disabled={isLoading}
                        onClick={handleLoadMore}
                    >
                        {t("load more")}
                    </button>
                )}
                {loadingError && <p>{loadingError.message}</p>}
            </div>
            <div className="App-footer">
                <div className="App-footer-container">
                    <img src={logoTextImg} alt="Foodit" />
                    <LocaleSelect />
                    <div className="App-footer-menu">
                        {t("terms of service")} | {t("privacy policy")}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
