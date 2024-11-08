import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import App from "./components/App"; // Your App component

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        {" "}
        {/* Wrap your App with BrowserRouter */}
        <App />
    </BrowserRouter>
);
