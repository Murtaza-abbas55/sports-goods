import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function useFetchCartItems() {
    const [cartProductsLength, setCartProductsLength] = useState(0);
    const [loading, setLoading] = useState(true);
    const { cartID } = useAuth();

    useEffect(() => {
        async function getCartItems(cartID) {
            try {
                const response = await axios.get("/api/getcart", {
                    params: { cart_id: cartID },
                });

                console.log("Response data for cart:");
                console.log(response.data);
                console.log(response.data.cart.length);
                setCartProductsLength(response.data.cart.length);
            } catch (error) {
                console.error(
                    "Error while fetching cart items:",
                    error.response?.data || error.message
                );
            } finally {
                setLoading(false);
            }
        }
        getCartItems(cartID);
    }, [cartID]);

    return { cartProductsLength, setCartProductsLength, loading };
}
export default useFetchCartItems;
