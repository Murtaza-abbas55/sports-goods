import { useState, useEffect } from "react";
import axios from "axios";

function DeleteProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the products from the backend using axios
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/products");
                setProducts(response.data);
                console.log(response.data);
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

    const handleShowButton = async (id) => {
        console.log(id);
        try {
            // Send the product_id to the backend via a POST request
            const response = await axios.post(
                "/api/products/delete",
                { product_id: id }, // Pass data in the body as an object
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            console.log("Product deleted:", response.data);
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product.product_id !== id)
            );
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <section style={{ display: "flex" }}>
            <h1>Delete Page</h1>
            {products.map((product) => {
                return (
                    <div
                        style={{
                            height: "250px",
                            width: "250px",
                            border: "solid 3px blue",
                            margin: "1rem",
                        }}
                        key={product.product_id}
                    >
                        <p>Product Number:-</p>
                        <p>{product.product_id}</p>
                        <p>{product.name}</p>
                        <img
                            src={`/images/${product.image_url}`}
                            alt="no logo"
                            height={50}
                        />
                        <button
                            onClick={() => handleShowButton(product.product_id)}
                        >
                            delete me
                        </button>
                    </div>
                );
            })}
        </section>
    );
}
export default DeleteProduct;
