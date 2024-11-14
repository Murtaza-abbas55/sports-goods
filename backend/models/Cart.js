import pool from '../db.js';

export const getOrCreateAnonymousCart = async () => {
    console.log("Checking for existing anonymous cart...");
    const { rows: existingCart } = await pool.query(
        `SELECT * FROM Cart WHERE user_id IS NULL LIMIT 1`
    );

    if (existingCart.length > 0) {
        console.log("Found existing anonymous cart:", existingCart[0]);
        return { success: true, cart: existingCart[0], message: "Found existing anonymous cart." };
    }

    const { rows: newCart } = await pool.query(
        `INSERT INTO Cart (user_id, created_at) VALUES (NULL, CURRENT_TIMESTAMP) RETURNING cart_id, created_at`
    );

    console.log("Created new anonymous cart:", newCart[0]);
    return { success: true, cart: newCart[0], message: "Created new anonymous cart." };
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
        return { success: true, cart: newCart[0], message: "Created new user cart." };
    }

    console.log("Found existing user cart:", userCart[0]);
    return { success: true, cart: userCart[0], message: "Found existing user cart." };
};

export const addProductToCart = async (cartId, productId, quantity) => {
    console.log('Adding product to cart:', cartId, productId, quantity);

    const { rows: existingProduct } = await pool.query(
        `SELECT * FROM CartProducts WHERE cart_id = $1 AND product_id = $2`,
        [cartId, productId]
    );

    if (existingProduct.length > 0) {
        const newQuantity = existingProduct[0].quantity + quantity;
        await pool.query(
            `UPDATE CartProducts SET quantity = $1 WHERE cart_id = $2 AND product_id = $3`,
            [newQuantity, cartId, productId]
        );
        console.log(`Updated product ${productId} quantity to ${newQuantity} in cart ${cartId}`);
        return { success: true, message: `Updated product quantity to ${newQuantity}.` };
    } else {
        await pool.query(
            `INSERT INTO CartProducts (cart_id, product_id, quantity) VALUES ($1, $2, $3)`,
            [cartId, productId, quantity]
        );
        console.log(`Added product ${productId} with quantity ${quantity} to cart ${cartId}`);
        return { success: true, message: `Added new product to cart.` };
    }
};

export const removeProductFromCart = async (cartId, productId) => {
    const { rowCount } = await pool.query(
        `DELETE FROM CartProducts WHERE cart_id = $1 AND product_id = $2`,
        [cartId, productId]
    );

    if (rowCount > 0) {
        console.log(`Successfully removed product ${productId} from cart ${cartId}`);
        return { success: true, message: `Removed product from cart.` };
    } else {
        console.log(`Product ${productId} not found in cart ${cartId}`);
        return { success: false, message: `Product not found in cart.` };
    }
};

export const clearCartProducts = async (cartId) => {
    const { rowCount } = await pool.query(
        `DELETE FROM CartProducts WHERE cart_id = $1`,
        [cartId]
    );

    if (rowCount > 0) {
        console.log(`Cleared all products from cart ${cartId}`);
        return { success: true, message: `Cleared all products from cart.` };
    } else {
        console.log(`Cart ${cartId} is already empty.`);
        return { success: false, message: `Cart is already empty.` };
    }
};

export const mergeAnonymousCartWithUserCart = async (userCartId, anonymousCartId) => {
    try {
        console.log(`Starting merge from anonymous cart ${anonymousCartId} to user cart ${userCartId}`);

        // Fetch items in the anonymous cart
        const { rows: anonymousCartItems } = await pool.query(
            `SELECT product_id, quantity FROM CartProducts WHERE cart_id = $1`,
            [anonymousCartId]
        );

        if (anonymousCartItems.length === 0) {
            console.log("No items in anonymous cart to merge.");
            return { success: false, message: "No items in anonymous cart to merge." };
        }

        console.log('Anonymous cart items:', anonymousCartItems);

        // Start a transaction
        await pool.query('BEGIN');

        for (const item of anonymousCartItems) {
            const { product_id, quantity } = item;

            // Check if the product already exists in the user cart
            const { rows: existingItems } = await pool.query(
                `SELECT quantity FROM CartProducts WHERE cart_id = $1 AND product_id = $2`,
                [userCartId, product_id]
            );

            if (existingItems.length > 0) {
                // Update quantity if product exists
                const newQuantity = existingItems[0].quantity + quantity;
                await pool.query(
                    `UPDATE CartProducts SET quantity = $1 WHERE cart_id = $2 AND product_id = $3`,
                    [newQuantity, userCartId, product_id]
                );
                console.log(`Updated product ${product_id} quantity to ${newQuantity} in user cart ${userCartId}`);
            } else {
                // Insert new product if it doesn't exist
                await pool.query(
                    `INSERT INTO CartProducts (cart_id, product_id, quantity) VALUES ($1, $2, $3)`,
                    [userCartId, product_id, quantity]
                );
                console.log(`Inserted product ${product_id} with quantity ${quantity} into user cart ${userCartId}`);
            }
        }

        // Clear the anonymous cart items and delete the cart itself
        await pool.query(`DELETE FROM CartProducts WHERE cart_id = $1`, [anonymousCartId]);
        console.log('Cleared all items from anonymous cart.');

        await pool.query(`DELETE FROM Cart WHERE cart_id = $1`, [anonymousCartId]);
        console.log('Deleted anonymous cart after merging.');

        // Commit the transaction
        await pool.query('COMMIT');

        return { success: true, message: "Merged anonymous cart with user cart and deleted it." };

    } catch (error) {
        console.error('Error merging anonymous cart with user cart:', error);
        await pool.query('ROLLBACK');  // Rollback the transaction in case of error
        return { success: false, message: "Failed to merge anonymous cart with user cart.", error };
    }
};
