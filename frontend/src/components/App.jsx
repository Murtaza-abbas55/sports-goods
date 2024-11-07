import { Routes, Route } from 'react-router-dom';
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import Navbar from './Navbar';

const App = () => {
    return (
        <main>
            <Navbar />
            <Routes>
                {/* Set distinct paths for each route */}
                <Route path="/" element={<ProductList />} />
                <Route path="/add-product" element={<AddProduct />} />
            </Routes>
        </main>
    );
};

export default App;
