import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import HomePage from "./pages/HomePage";
import CourseListPage from "./pages/CourseListPage";
import CoursePage from "./pages/CoursePage";
import QuestionListPage from "./pages/QuestionListPage";
import QuestionPage from "./pages/QuestionPage";
import WishlistPage from "./pages/WishlistPage";

function Main() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="courses">
                        <Route index element={<CourseListPage />} />
                        <Route path=":courseSlug" element={<CoursePage />} />
                    </Route>
                    <Route path="questions">
                        <Route index element={<QuestionListPage />} />
                        <Route
                            path=":questionSlug"
                            element={<QuestionPage />}
                        ></Route>
                    </Route>
                    <Route path="wishlist" element={<WishlistPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Main;
