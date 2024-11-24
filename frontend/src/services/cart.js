import axios from "axios";

async function handleDecrease(
    product_id,
    setLoadingProductID,
    setToastMessage,
    setToastOpen,
    setCartProducts,
    cartID
) {
    setLoadingProductID(product_id); // Show loading spinner
    try {
        const response = await axios.post("/api/change-quantity", {
            product_id,
            cart_id: cartID,
            cflag: "decrease",
        });
        console.log(response.data);
        setToastMessage("Deducted From Cart Successfully"); // Set success message
        setToastOpen(true); // Show toast

        setCartProducts((prevProducts) =>
            prevProducts.map((cartProduct) =>
                cartProduct.product_id === product_id
                    ? { ...cartProduct, stock: cartProduct.stock + 1 }
                    : cartProduct
            )
        );

        setCartProducts((prevProducts) =>
            prevProducts.map((cartProduct) =>
                cartProduct.product_id === product_id
                    ? { ...cartProduct, quantity: cartProduct.quantity - 1 }
                    : cartProduct
            )
        );
    } catch (error) {
        console.error(
            "Error while adding product to cart:",
            error.response?.data || error.message
        );

        setToastMessage("Failed to deduct from cart! Please try again."); // Set error message
        setToastOpen(true); // Show toast
    } finally {
        setLoadingProductID(null); // Hide loading spinner
    }
}

async function handleRemove(
    product_id,
    setLoadingProductID,
    setToastMessage,
    setToastOpen,
    setCartProducts,
    cartID
) {
    setLoadingProductID(product_id); // Show loading spinner
    try {
        const response = await axios.post("/api/remove", {
            product_id,
            cart_id: cartID,
        });
        console.log(response.data);
        setToastMessage("Removed from cart!"); // Set success message
        setToastOpen(true); // Show toast
        setCartProducts((prevProducts) =>
            prevProducts.filter(
                (cartProduct) => cartProduct.product_id !== product_id
            )
        );
    } catch (error) {
        console.error(
            "Error while removing product from cart:",
            error.response?.data || error.message
        );

        setToastMessage("Failed to remove from cart! Please try again."); // Set error message
        setToastOpen(true); // Show toast
    } finally {
        setLoadingProductID(null); // Hide loading spinner
    }
}

async function handleAdd(
    product_id,
    setLoadingProductID,
    setToastMessage,
    setToastOpen,
    setCartProducts,
    cartID
) {
    setLoadingProductID(product_id); // Show loading spinner
    try {
        const response = await axios.post("/api/add", {
            product_id,
            cartId: cartID,
            quantity: 1,
        });
        console.log(response.data);
        setToastMessage("Added to cart successfully!"); // Set success message
        setToastOpen(true); // Show toast

        setCartProducts((prevProducts) =>
            prevProducts.map((cartProduct) =>
                cartProduct.product_id === product_id
                    ? { ...cartProduct, stock: cartProduct.stock - 1 }
                    : cartProduct
            )
        );

        setCartProducts((prevProducts) =>
            prevProducts.map((cartProduct) =>
                cartProduct.product_id === product_id
                    ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
                    : cartProduct
            )
        );
    } catch (error) {
        console.error(
            "Error while adding product to cart:",
            error.response?.data || error.message
        );

        setToastMessage("Failed to add to cart! Please try again."); // Set error message
        setToastOpen(true); // Show toast
    } finally {
        setLoadingProductID(null); // Hide loading spinner
    }
}

export { handleDecrease, handleRemove, handleAdd };
