import { useState } from "react";
import axios from "axios";

function useAddToCart(product_id, cartID, quantity) {
    const [loading, setLoading] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const handleCloseToast = () => {
        setToastOpen(false);
    };

    async function handleAddToCart() {
        setLoading(true); // Show loading spinner
        try {
            const response = await axios.post("/api/add", {
                product_id,
                cartId: cartID,
                quantity,
            });
            console.log(response.data);
            setToastMessage("Added to cart successfully!"); // Set success message
            setToastOpen(true); // Show toast
        } catch (error) {
            console.error(
                "Error while adding product to cart:",
                error.response?.data || error.message
            );

            setToastMessage("Failed to add to cart! Please try again."); // Set error message
            setToastOpen(true); // Show toast
        } finally {
            setLoading(false); // Hide loading spinner
        }
    }

    return { loading, toastMessage, toastOpen, handleAddToCart };
}
export default useAddToCart;
