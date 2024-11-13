// import * as React from "react";
// import ReactDOM from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Header from "./pages/Homepage";
// import Login from "./pages/Login";
// import ErrorPage from "./pages/ErrorPage";
// import CreateAccount from "./pages/CreateAccount";
// import AddProductForm from "./components/AddProduct";

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Header />,
//         errorElement: <ErrorPage />,
//     },
//     {
//         path: "/login",
//         element: <Login />,
//     },
//     {
//         path: "/create_account",
//         element: <CreateAccount />,
//     },
//     {
//         path: "/form",
//         element: <AddProductForm />,
//     },
// ]);

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//     <React.StrictMode>
//         <RouterProvider router={router} />
//     </React.StrictMode>
// );
// src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";// Import AuthProvider
import App from "./components/App"; // Your main app component

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <Router>
                <App />
            </Router>
        </AuthProvider>
    </React.StrictMode>
);
