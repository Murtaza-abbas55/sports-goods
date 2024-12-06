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
import { AuthProvider } from "./context/AuthContext.jsx"; // Import AuthProvider
import App from "./components/App"; // Your main app component
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Define a custom theme
const theme = createTheme({
    // palette: {
    //     primary: {
    //         main: "#1976d2", // Custom primary color for buttons
    //     },
    // },
    components: {
        MuiButton: {
            styleOverrides: {
                // Apply custom styles to primary color buttons
                containedPrimary: {
                    backgroundColor: "#000000", // Custom button background for primary color
                    "&:hover": {
                        backgroundColor: "#333333", // Hover color (dark gray for contrast)
                    },
                },

                outlinedPrimary: {
                    borderColor: "#000000", // Outline color for primary button
                    color: "#000000", // Text color for outlined primary buttons
                    "&:hover": {
                        borderColor: "#333333", // Hover color for outline
                        color: "#333333", // Text color on hover
                    },
                },
                // textPrimary: {
                //     color: "#ff5722", // Text color for text primary button
                //     "&:hover": {
                //         backgroundColor: "rgba(255, 87, 34, 0.08)", // Text button hover color
                //     },
                // },
            },
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <Router>
                    <App />
                </Router>
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>
);
