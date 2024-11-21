import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function useFetchWishlist() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [wishlistItems, setWishlistItems] = useState([]);
    const { Data } = useAuth();

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                if (Data !== null) {
                    const response = await axios.get("/api/getallwishlist");
                    setWishlistItems(response.data.wishlistItems);
                    console.log("we wish");
                    console.log(response.data.wishlistItems);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Error");
            } finally {
                setLoading(false);
                console.log("finally");
            }
        };

        fetchWishlist();
    }, [Data]);
    console.log(wishlistItems);
    return { wishlistItems, setWishlistItems, loading, error };
}
export default useFetchWishlist;
