import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function useFetchSale() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saleProducts, setSaleProducts] = useState([]);
    const { Data } = useAuth();

    useEffect(() => {
        const fetchSale = async () => {
            try {
                const response = await axios.get("/api/sale");
                console.log("get sale");
                setSaleProducts(response.data.sales);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Error");
            } finally {
                setLoading(false);
                console.log("finally");
            }
        };

        fetchSale();
    }, []);
    return { saleProducts, setSaleProducts, loading, error };
}
export default useFetchSale;
