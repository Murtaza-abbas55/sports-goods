import pool from "../db.js";

export const getOrCreateAnonymousCart = async () => {
    console.log("Checking for existing anonymous cart...");
    const { rows: existingCart } = await pool.query(
        `SELECT * FROM Cart WHERE user_id IS NULL LIMIT 1`
    );

    if (existingCart.length > 0) {
        console.log("Found existing anonymous cart:", existingCart[0]);
        return {
            success: true,
            cart: existingCart[0],
            message: "Found existing anonymous cart.",
        };
    }

    const { rows: newCart } = await pool.query(
        `INSERT INTO Cart (user_id, created_at) VALUES (NULL, CURRENT_TIMESTAMP) RETURNING cart_id, created_at`
    );

    console.log("Created new anonymous cart:", newCart[0]);
    return {
        success: true,
        cart: newCart[0],
        message: "Created new anonymous cart.",
    };
};

export const getUserCart = async (userId) => {
    const { rows: userCart } = await pool.query(
        `SELECT * FROM Cart WHERE user_id = $1 LIMIT 1`,
        [userId]
    );

    if (userCart.length === 0) {
        const { rows: newCart } = await pool.query(
            `INSERT INTO Cart (user_id, created_at) VALUES ($1, CURRENT_TIMESTAMP) RETURNING cart_id`,
            [userId]
        );
        console.log("Created new user cart:", newCart[0]);
        return {
            success: true,
            cart: newCart[0],
            message: "Created new user cart.",
        };
    }

    console.log("Found existing user cart:", userCart[0]);
    return {
        success: true,
        cart: userCart[0],
        message: "Found existing user cart.",
    };
};

export const addProductToCart = async (cartId, productId, quantity) => {
    console.log("Adding product to cart:", cartId, productId, quantity);

    // Check stock availability
    const { rows: productStock } = await pool.query(
        `SELECT stock FROM Products WHERE product_id = $1`,
        [productId]
    );

    if (productStock.length === 0) {
        return { success: false, message: "Product does not exist." };
    }

    if (productStock[0].stock < quantity) {
        return { success: false, message: "Not enough stock available." };
    }

    // Check if product already exists in cart
    const { rows: existingProduct } = await pool.query(
        `SELECT * FROM CartProducts WHERE cart_id = $1 AND product_id = $2`,
        [cartId, productId]
    );

    if (existingProduct.length > 0) {
        const newQuantity = existingProduct[0].quantity + quantity;

        if (productStock[0].stock < newQuantity) {
            return {
                success: false,
                message: "Not enough stock available to update quantity.",
            };
        }

        await pool.query(
            `UPDATE CartProducts SET quantity = $1 WHERE cart_id = $2 AND product_id = $3`,
            [newQuantity, cartId, productId]
        );
        console.log(
            `Updated product ${productId} quantity to ${newQuantity} in cart ${cartId}`
        );
    } else {
        await pool.query(
            `INSERT INTO CartProducts (cart_id, product_id, quantity) VALUES ($1, $2, $3)`,
            [cartId, productId, quantity]
        );
        console.log(
            `Added product ${productId} with quantity ${quantity} to cart ${cartId}`
        );
    }

    // Reduce stock
    await pool.query(
        `UPDATE Products SET stock = stock - $1 WHERE product_id = $2`,
        [quantity, productId]
    );
    console.log(`Reduced stock for product ${productId} by ${quantity}`);

    return { success: true, message: "Product added to cart." };
};

export const removeProductFromCart = async (cartId, productId) => {
    console.log("Removing product from cart:", cartId, productId);

    const { rows: productInCart } = await pool.query(
        `SELECT quantity FROM CartProducts WHERE cart_id = $1 AND product_id = $2`,
        [cartId, productId]
    );

    if (productInCart.length === 0) {
        return { success: false, message: "Product not found in cart." };
    }

    const quantity = productInCart[0].quantity;

    // Remove product from cart
    const { rowCount } = await pool.query(
        `DELETE FROM CartProducts WHERE cart_id = $1 AND product_id = $2`,
        [cartId, productId]
    );

    if (rowCount > 0) {
        console.log(
            `Successfully removed product ${productId} from cart ${cartId}`
        );

        // Increase stock
        await pool.query(
            `UPDATE Products SET stock = stock + $1 WHERE product_id = $2`,
            [quantity, productId]
        );
        console.log(`Increased stock for product ${productId} by ${quantity}`);

        return { success: true, message: "Removed product from cart." };
    } else {
        console.log(`Product ${productId} not found in cart ${cartId}`);
        return { success: false, message: "Product not found in cart." };
    }
};

export const clearCartProducts = async () => {
    const { rows: cartIds } = await pool.query(
        `SELECT cart_id FROM Cart WHERE user_id IS NULL`
    );

    if (cartIds.length === 0) {
        console.log("No carts with NULL user_id found.");
        return { success: false, message: "No carts with NULL user_id found." };
    }

    for (const { cart_id } of cartIds) {
        const { rowCount: deletedProducts } = await pool.query(
            `DELETE FROM CartProducts WHERE cart_id = $1`,
            [cart_id]
        );

        if (deletedProducts > 0) {
            console.log(`Cleared all products from cart ${cart_id}`);
        } else {
            console.log(`Cart ${cart_id} is already empty.`);
        }

        const { rowCount: deletedCart } = await pool.query(
            `DELETE FROM Cart WHERE cart_id = $1`,
            [cart_id]
        );

        if (deletedCart > 0) {
            console.log(`Deleted cart ${cart_id}`);
        } else {
            console.log(`Cart ${cart_id} was not found for deletion.`);
        }
    }

    return {
        success: true,
        message: "Cleared products and deleted carts with NULL user_id.",
    };
};
export const clearuserCartProducts = async (user_id) => {
    try {
        const { rows: userCart } = await pool.query(
            `SELECT * FROM Cart WHERE user_id = $1 LIMIT 1`,
            [userId]
        );
        if (userCart.length === 0) {
            console.log("No Cart for user_id: " + user_id);
            return { success: false, message: "No cart found for the user." };
        }

        const cartId = userCart[0].cart_id;
        const { rowCount } = await pool.query(
            `DELETE FROM CartProducts WHERE cart_id = $1`,
            [cartId]
        );

        if (rowCount > 0) {
            console.log(`Cleared ${rowCount} products from cart_id: ${cartId}`);
            return {
                success: true,
                message: "Cleared all products from the user's cart.",
            };
        } else {
            console.log(`No products found in cart_id: ${cartId}`);
            return {
                success: false,
                message: "No products found in the user's cart.",
            };
        }
    } catch (error) {
        console.error("Error clearing user cart products:", error);
        return {
            success: false,
            message: "Error clearing user cart products.",
            error,
        };
    }
};

export const mergeAnonymousCartWithUserCart = async (
    userCartId,
    anonymousCartId
) => {
    try {
        console.log(
            `Starting merge from anonymous cart ${anonymousCartId} to user cart ${userCartId}`
        );
        const { rows: anonymousCartItems } = await pool.query(
            `SELECT product_id, quantity FROM CartProducts WHERE cart_id = $1`,
            [anonymousCartId]
        );

        if (anonymousCartItems.length === 0) {
            console.log("No items in anonymous cart to merge.");
            return {
                success: false,
                message: "No items in anonymous cart to merge.",
            };
        }

        console.log("Anonymous cart items:", anonymousCartItems);

        await pool.query("BEGIN");

        for (const item of anonymousCartItems) {
            const { product_id, quantity } = item;

            const { rows: existingItems } = await pool.query(
                `SELECT quantity FROM CartProducts WHERE cart_id = $1 AND product_id = $2`,
                [userCartId, product_id]
            );

            if (existingItems.length > 0) {
                const newQuantity = existingItems[0].quantity + quantity;
                await pool.query(
                    `UPDATE CartProducts SET quantity = $1 WHERE cart_id = $2 AND product_id = $3`,
                    [newQuantity, userCartId, product_id]
                );
                console.log(
                    `Updated product ${product_id} quantity to ${newQuantity} in user cart ${userCartId}`
                );
            } else {
                await pool.query(
                    `INSERT INTO CartProducts (cart_id, product_id, quantity) VALUES ($1, $2, $3)`,
                    [userCartId, product_id, quantity]
                );
                console.log(
                    `Inserted product ${product_id} with quantity ${quantity} into user cart ${userCartId}`
                );
            }
        }
        await pool.query(`DELETE FROM CartProducts WHERE cart_id = $1`, [
            anonymousCartId,
        ]);
        console.log("Cleared all items from anonymous cart.");

        await pool.query(`DELETE FROM Cart WHERE cart_id = $1`, [
            anonymousCartId,
        ]);
        console.log("Deleted anonymous cart after merging.");
        await pool.query("COMMIT");

        return {
            success: true,
            message: "Merged anonymous cart with user cart and deleted it.",
        };
    } catch (error) {
        console.error("Error merging anonymous cart with user cart:", error);
        await pool.query("ROLLBACK");
        return {
            success: false,
            message: "Failed to merge anonymous cart with user cart.",
            error,
        };
    }
};

export const getCartProducts = async (cart_id) => {
    try {
        console.log(`Getting cart ${cart_id}`);
        const { rows: cart } = await pool.query(

            `SELECT c.*,p.* FROM CartProducts c JOIN Products p ON c.product_id=p.product_id WHERE c.cart_id = $1`,
            [cart_id]
        );

        if (cart.length === 0) {
            console.log("No items in cart...");
            return { success: false, message: "No items in cart." };
        }

        return { success: true, message: "Cart found", cart: cart };
    } catch (error) {
        // Use the correct JavaScript Error constructor
        throw new Error("Error: " + error.message);
    }
};
