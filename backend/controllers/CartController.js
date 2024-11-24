import {
    getOrCreateAnonymousCart,
    getUserCart,
    addProductToCart,
    removeProductFromCart,
    clearCartProducts,
    mergeAnonymousCartWithUserCart,
    clearuserCartProducts,
    getCartProducts,
    ChangeProductQuantity
} from "../models/Cart.js";

export const addToCart = async (req, res) => {
    let { product_id, quantity, cartId } = req.body; // Change const to let for cartId
    console.log("Received Cart ID:", cartId);
    try {
        console.log("Request Body:", req.body); // Log the request body to ensure correct data

        // If no cartId is passed in the body, create or use anonymous cart
        if (!cartId) {
            const anonymousCartResult = await getOrCreateAnonymousCart();
            console.log("Anonymous Cart Result:", anonymousCartResult); // Log the result
            cartId = anonymousCartResult.cart.cart_id; // Reassign cartId
        }

        console.log("Using Cart ID:", cartId);

        // Add the product to the cart
        const addProductResult = await addProductToCart(cartId, product_id, quantity);

        // Check the result of adding the product
        if (!addProductResult.success) {
            return res.status(400).json({ 
                success: false, 
                message: addProductResult.message, // Send the message from addProductToCart
            });
        }

        console.log(`Product ${product_id} added to cart with ID:`, cartId); // Log the result
        res.status(200).json({
            success: true,
            message: "Product added to cart",
            cartId: cartId,
        });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ error: "Failed to add product to cart" });
    }
};

export const removeFromCart = async (req, res) => {
    const { product_id, cart_id } = req.body;
    console.log("Attempting to remove product from cart:", cart_id, product_id);

    try {
        await removeProductFromCart(cart_id, product_id);
        console.log(
            `Product ${product_id} removed from cart with ID:`,
            cart_id
        ); // Log the result
        res.status(200).json({ message: "Product removed from cart" });
    } catch (error) {
        console.error("Error removing product from cart:", error);
        res.status(500).json({ error: "Failed to remove product from cart" });
    }
};

export const clearCart = async (req, res) => {
    try {
        await clearCartProducts(); // Log the result
        res.status(200).json({ message: "Cart will null user_id  cleared" });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ error: "Failed to clear cart" });
    }
};
export const mergeAnonymousCart = async (req, res) => {
    const { user_id } = req.body;
    console.log("User ID:", user_id);

    try {
        // Check if the user has an existing cart
        let userCartResult = await getUserCart(user_id);
        console.log("User Cart Result:", userCartResult); // Log the result

        if (!userCartResult.cart) {
            console.log("No existing user cart found, creating a new one.");
        }

        const userCart = userCartResult.cart; // Correctly access the cart object
        console.log("User Cart:", userCart);

        // Find the anonymous cart
        const anonymousCartResult = await getOrCreateAnonymousCart();
        console.log("Anonymous Cart Result:", anonymousCartResult); // Log the result

        const anonymousCart = anonymousCartResult.cart; // Correctly access the cart object
        console.log("Anonymous Cart:", anonymousCart);

        // Ensure both carts exist before attempting to merge
        if (!userCart || !anonymousCart) {
            throw new Error("User cart or anonymous cart does not exist");
        }

        // Merge the anonymous cart with the user's cart
        await mergeAnonymousCartWithUserCart(
            userCart.cart_id,
            anonymousCart.cart_id
        );
        console.log(
            `Anonymous cart ${anonymousCart.cart_id} merged with user cart ${userCart.cart_id}`
        ); // Log the result

        res.status(200).json({
            message: "Anonymous cart merged with user cart",
            cartId: userCart.cart_id,
        });
    } catch (error) {
        console.error("Failed to merge anonymous cart with user cart:", error);
        res.status(500).json({
            error: "Failed to merge anonymous cart with user cart",
        });
    }
};
export const clearUserCart = async (req, res) => {
    const { user_id } = req.body;

    try {
        const result = await clearuserCartProducts(user_id);
        if (result.success) {
            res.status(200).json({ message: result.message });
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        console.error("Error in clearUserCart:", error);
        res.status(500).json({
            message: "An error occurred while clearing the user's cart.",
            error,
        });
    }
};
export const getCartProductsController = async (req, res) => {
    const { cart_id } = req.query;

    try {
        const result = await getCartProducts(cart_id);

        if (result.success) {
            res.status(200).json({
                message: result.message,
                cart: result.cart,
            });
        } else {
            res.status(404).json({ message: result.message });
        }
    } catch (error) {
        console.error("Error in getCartProductsController:", error.message);
        res.status(500).json({
            message: "backAn error occurred while fetching cart products.",
            error: error.message,
        });
    }
};
export const ChangeQuantityController = async (req,res) => {
    try {
        const { cart_id, product_id, cflag } = req.body;
        if (!cart_id || !product_id || !cflag) {
            return res.status(400).json({
                success: false,
                message: "cart_id, product_id, and cflag are required.",
            });
        }
        const result = await ChangeProductQuantity(cart_id, product_id, cflag);
        if (result.success) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        console.error("Error in changeProductQuantity controller:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}