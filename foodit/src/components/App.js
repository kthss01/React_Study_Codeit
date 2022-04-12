import FoodList from "./FoodList";
import { useCallback, useEffect, useState } from "react";
import { createFood, deleteFood, getFoods, updateFood } from "../api";
import FoodForm from "./FoodForm";
import useAsync from "../hooks/useAsync";
import { LocaleProvider } from "../context/LocaleContext";
import LocaleSelect from "./LocaleSelect";

function App() {
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

    const sortedItems = items.sort((a, b) => b[order] - a[order]);

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

    useEffect(() => {
        handleLoad({ order, search });
    }, [order, search, handleLoad]);

    return (
        <LocaleProvider defaultValue={"ko"}>
            <div>
                <LocaleSelect />
                <button onClick={handleNewestClick}>최신순</button>
                <button onClick={handleCalorieClick}>칼로리순</button>
                <form onSubmit={handleSearchSubmit}>
                    <input name="search" />
                    <button type="submit">검색</button>
                </form>
                <FoodForm
                    onSubmit={createFood}
                    onSubmitSuccess={handleCreateSuccess}
                />
                <FoodList
                    items={sortedItems}
                    onUpdate={updateFood}
                    onUpdateSuccess={handleUpdateSuccess}
                    onDelete={handleDelete}
                />
                {cursor && (
                    <button disabled={isLoading} onClick={handleLoadMore}>
                        더보기
                    </button>
                )}
                {loadingError?.message && <span>{loadingError.message}</span>}
            </div>
        </LocaleProvider>
    );
}

export default App;
