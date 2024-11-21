import { useEffect, useState } from "react";
import axios from "axios";

function useFetchProductByID(id) {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getProductByID() {
            setLoading(true);
            try {
                const response = await axios.get("/api/getcart", {
                    params: { id },
                });

                console.log("Response data for cart:", response.data);
            } catch (error) {
                console.error(
                    "Error while fetching cart items:",
                    error.response?.data || error.message
                );
            } finally {
                setLoading(false);
            }
        }

        getProductByID(id);
    }, [id]);
    return { product };
}
export default useFetchProductByID;
