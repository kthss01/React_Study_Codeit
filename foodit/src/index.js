import ReactDOM from "react-dom";
import App from "./components/App";
import { LocaleProvider } from "./context/LocaleContext";

ReactDOM.render(
    <LocaleProvider derfaultValue="ko">
        <App />
    </LocaleProvider>,
    document.getElementById("root")
);
