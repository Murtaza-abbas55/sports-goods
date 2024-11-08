import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            {/* Corrected paths */}
            <Link to="/">Product List</Link>
            <Link to="/add-product">Add Product</Link>
        </nav>
    );
}

export default Navbar;
