import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login";
import CreateAccount from "../pages/CreateAccount";
import AdminHome from "../pages/AdminHome";
import ProductList from "./ProductList";
import Header from "../pages/Homepage";
import ErrorPage from "../pages/ErrorPage";
import AdminLayout from "../pages/AdminLayout";
import DeleteProduct from "../pages/DeleteProduct";
import AddProductForm from "./AddProduct";
import CreateProduct from "../pages/CreateProduct";
import UpdateProduct from "../pages/UpdateProduct";
import CreateAdminAccount from "../pages/CreateAdminAccount";
import Product from "../pages/Product";
import ProductListing from "../pages/ProductListing";
import axios from "axios";
import ProductLayout from "../pages/ProductLayout";
import { useEffect } from "react";
import Cart from "../pages/Cart";
import Sale from "../pages/Sale";
import Loading from "./Loading";
import UserDashboard from "../pages/UserDashboard";
import Checkout from "../pages/Checkout";
import ManageCategories from "../pages/ManageCategories";
import UserLayout from "../pages/UserLayout";
import ViewWishlist from "../pages/ViewWishlist";
import UserOrders from "../pages/UserOrders";
import ManageOrders from "../pages/ManageOrders";


function App() {
    const { Data, localLoading } = useAuth(); // Access auth here
    console.log("Data now");
    console.log(Data);

    const clearAnonymousCart = async () => {
        try {
            const response = await axios.post("/api/clear");
            console.log("API call successful!", response.status);
        } catch (error) {
            console.error("Error calling API:", error);
        }
    };

    useEffect(() => {
        clearAnonymousCart();
    }, []);

    if (localLoading) return <Loading />;

    return (
        <Routes>
            <Route
                path="/"
                element={
                    !Data ? (
                        <Header />
                    ) : Data.isAdmin ? (
                        <Navigate to="/admin" />
                    ) : (
                        <Header />
                    )
                }
            />
            <Route
                path="/login"
                element={
                    !Data ? (
                        <Login />
                    ) : Data.isAdmin ? (
                        <Navigate to="/admin" />
                    ) : (
                        <Navigate to="/" />
                    )
                }
            />

            <Route
                path="/create_account"
                element={
                    !Data ? (
                        <CreateAccount />
                    ) : Data.isAdmin ? (
                        <Navigate to="/admin" />
                    ) : (
                        <Navigate to="/" />
                    )
                }
            />
            <Route
                path="/product-listing"
                element={Data?.isAdmin ? <ErrorPage /> : <ProductLayout />}
            >
                <Route index element={<ProductListing />} />
                <Route path="product/:product_id" element={<Product />} />
            </Route>
            <Route
                path="cart/:cartID"
                element={Data?.isAdmin ? <ErrorPage /> : <Cart />}
            />
            <Route
                path="checkout/:userID"
                element={Data?.isAdmin ? <ErrorPage /> : <Checkout />}
            />
            <Route
                path="/admin"
                element={Data?.isAdmin ? <AdminLayout /> : <Navigate to="/" />}
            >
                <Route index element={<AdminHome />} />
                <Route path="add-product" element={<CreateProduct />} />
                <Route path="delete-product" element={<DeleteProduct />} />
                <Route path="update-product" element={<UpdateProduct />} />
                <Route path="view-products" element={<ProductList />} />
                <Route path="new-admin" element={<CreateAdminAccount />} />
                <Route
                    path="manage-categories"
                    element={<ManageCategories />}
                />
                <Route path="manage-orders" element={<ManageOrders />} />
                <Route path="sale" element={<Sale />} />
            </Route>

            <Route path="/dashboard/:userId" element={<UserLayout />}>
                <Route index element={<UserDashboard />} />
                <Route path="view-wishlist" element={<ViewWishlist />} />
                <Route path="orders" element={<UserOrders />} />
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
