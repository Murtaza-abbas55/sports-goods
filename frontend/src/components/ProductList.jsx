// import { useState, useEffect } from "react";
// import axios from "axios";

// const ProductList = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Fetch the products from the backend using axios
//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get("/api/products"); // Using axios instead of fetch
//                 setProducts(response.data); // Set products from the response data
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//                 setError("Failed to load products."); // Set error message if fetching fails
//             } finally {
//                 setLoading(false); // Stop loading regardless of success or failure
//             }
//         };

//         fetchProducts();
//     }, []);

//     // Display loading message while waiting for data
//     if (loading) {
//         return <p>Loading products...</p>;
//     }

//     // Display error message if there was an error fetching products
//     if (error) {
//         return <p>{error}</p>;
//     }

//     return (
//         <div>
//             <h2>Product Items</h2>
//             {products.length > 0 ? (
//                 <ul>
//                     {products.map((product) => (
//                         <li key={product.product_id}>
//                             <img
//                                 src={`/images/${product.image_url}`}
//                                 alt={product.name}
//                                 style={{
//                                     width: "100px",
//                                     height: "100px",
//                                     objectFit: "cover",
//                                 }}
//                             />
//                             {/* Display product image */}
//                             <strong>{product.name}</strong>:{" "}
//                             {product.description} - ${product.price} (Stock:{" "}
//                             {product.stock})
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No products available.</p>
//             )}
//         </div>
//     );
// };

// export default ProductList;
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { Data } = useAuth(); // Access Data instead of user

    // Fetch the products from the backend using axios
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to load products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Product Items</h2>
            <div>
                <p>
                    Welcome, {Data.firstname} {Data.lastname}!
                </p>
                <p>Email: {Data.email}</p>
                <p>Role: {Data.isAdmin ? "Admin" : "User"}</p>
            </div>
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
                            <strong>{product.name}</strong>:{" "}
                            {product.description} - ${product.price} (Stock:{" "}
                            {product.stock})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No products available.</p>
            )}
            <Link to={"/"}>Home</Link>
        </div>
    );
};

export default ProductList;
