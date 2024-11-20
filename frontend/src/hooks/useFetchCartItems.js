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
            try {
                const response = await axios.get("/api/getcart", {
                    params: { cart_id: cartID },
                });

                console.log("Response data for cart:");
                console.log(response.data.cart.quantity);
                console.log(response.data.cart);
                setCartProducts(response.data.cart);
                let totalItems = cartProducts.reduce(function (prev, curr) {
                    return prev + curr.quantity;
                }, 0);
                setCartProductsLength(totalItems);
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
    }, [cartID, cartProducts]);

    return { cartProductsLength, setCartProductsLength, loading };
}
export default useFetchCartItems;
