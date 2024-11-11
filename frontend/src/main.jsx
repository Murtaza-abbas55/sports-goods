import * as React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./pages/Homepage";
import Login from "./pages/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Header />,
    },
    {
        path: "/login",
        element: <Login />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
