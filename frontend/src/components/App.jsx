import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login";
import CreateAccount from "../pages/CreateAccount";
import AdminHome from "../pages/AdminHome";
import ProductList from "./ProductList";
import Header from "../pages/Homepage";
import ErrorPage from "../pages/ErrorPage";
import AdminLayout from "../pages/AdminLayout";

function App() {
    const { Data } = useAuth(); // Access auth state and user data

    return (
        <Routes>
            <Route path="/" element={<Header />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create_account" element={<CreateAccount />} />

            <Route
                path="/admin"
                element={
                    Data?.isAdmin ? <AdminLayout /> : <Navigate to="/login" />
                }
            >
                <Route index element={<AdminHome />} />
                <Route path="view-products" element={<ProductList />} />
            </Route>

            <Route
                path="/list"
                element={Data ? <ProductList /> : <Navigate to={"/login"} />}
            />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}

export default App;
