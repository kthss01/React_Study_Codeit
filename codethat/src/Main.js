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
            <App>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="courses" element={<CourseListPage />} />
                    <Route
                        path="courses/react-frontend-development"
                        element={<CoursePage />}
                    />
                    <Route path="questions" element={<QuestionListPage />} />
                    <Route
                        path="questions/616825"
                        element={<QuestionPage />}
                    ></Route>
                    <Route path="wishlist" element={<WishlistPage />} />
                </Routes>
            </App>
        </BrowserRouter>
    );
}

export default Main;
