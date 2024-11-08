import { Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import Header from "../pages/Homepage";

const App = () => {
    return (
        <main>
            <Header />
            <Routes>
                {/* Set distinct paths for each route */}
                <Route path="/" element={<ProductList />} />
                <Route path="/add-product" element={<AddProduct />} />
            </Routes>
        </main>
    );
};

export default App;
