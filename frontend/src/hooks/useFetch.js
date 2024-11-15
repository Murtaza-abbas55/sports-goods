import { useEffect, useState } from "react";
import axios from "axios";

// Fetch the products from the backend using axios
function useFetch(url) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setProducts(response.data);
                console.log("Fetching products response.data");
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to load products.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);
    return { products, setProducts, loading, error };
}

export default useFetch;
