import { useEffect } from "react";
import axios from "axios";

function useFetchTrending() {
    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const response = await axios.get("/api/trending-products");
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                // setError("Error");
            } finally {
                // setLoading(false);
                console.log("finally");
            }
        };

        fetchTrending();
    }, []);
}
export default useFetchTrending;
