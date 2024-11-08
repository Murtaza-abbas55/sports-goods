import { useState, useEffect } from "react";
import axios from "axios";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the products from the backend using axios
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/products"); // Using axios instead of fetch
                setProducts(response.data); // Set products from the response data
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to load products."); // Set error message if fetching fails
            } finally {
                setLoading(false); // Stop loading regardless of success or failure
            }
        };

        fetchProducts();
    }, []);

    // Display loading message while waiting for data
    if (loading) {
        return <p>Loading products...</p>;
    }

    // Display error message if there was an error fetching products
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Product Items</h2>
            {products.length > 0 ? (
                <ul>
                    {products.map((product) => (
                        <li key={product.product_id}>
                            <img
                                src={`/images/${product.image_url}`}
                                alt={product.name}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                }}
                            />
                            {/* Display product image */}
                            <strong>{product.name}</strong>:{" "}
                            {product.description} - ${product.price} (Stock:{" "}
                            {product.stock})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No products available.</p>
            )}
        </div>
    );
};

export default ProductList;
