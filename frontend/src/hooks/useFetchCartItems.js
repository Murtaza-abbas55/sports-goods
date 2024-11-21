import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function useFetchCartItems() {
    const [cartProducts, setCartProducts] = useState([]);
    const [cartProductsLength, setCartProductsLength] = useState(0);
    const [loading, setLoading] = useState(true);
    const { cartID } = useAuth();

    useEffect(() => {
        async function getCartItems(cartID) {
            setLoading(true); // Show loading state while fetching
            try {
                const response = await axios.get("/api/getcart", {
                    params: { cart_id: cartID },
                });

                console.log("Response data for cart:", response.data.cart);

                // Extract cart data directly from the API response
                const cartData = response.data.cart;

                // Calculate total items directly from the response
                const totalItems = cartData.reduce(
                    (prev, curr) => prev + curr.quantity,
                    0
                );

                // Update states
                setCartProducts(cartData);
                setCartProductsLength(totalItems);
            } catch (error) {
                console.error(
                    "Error while fetching cart items:",
                    error.response?.data || error.message
                );
            } finally {
                setLoading(false); // Stop loading state
            }
        }

        if (cartID) getCartItems(cartID); // Only fetch if cartID exists
    }, [cartID]); // Remove setCartProducts from dependencies

    return {
        cartProductsLength,
        setCartProductsLength,
        cartProducts,
        setCartProducts,
        loading,
    };
}
export default useFetchCartItems;