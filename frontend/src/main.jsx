import * as React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./pages/Homepage";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import CreateAccount from "./pages/CreateAccount";
import AddProductForm from "./components/AddProduct";
import Product from "./pages/Product";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Header />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/create_account",
        element: <CreateAccount />,
    },
    {
        path: "/product",
        element: <Product />,
    },
    {
        path: "/form",
        element: <AddProductForm />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
