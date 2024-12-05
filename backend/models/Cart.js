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
        return { success: false, message: `Not enough stock available. Only ${productStock[0].stock} left.` };
    }
    const { rows: existingProduct } = await pool.query(
        `SELECT * FROM CartProducts WHERE cart_id = $1 AND product_id = $2`,
        [cartId, productId]
    );

    if (existingProduct.length > 0) {
        const newQuantity = existingProduct[0].quantity + quantity;

        // if (productStock[0].stock < newQuantity) {
        //     return { success: false, message: `Not enough stock available to update quantity. Only ${productStock[0].stock} left.` };
        // }

        // Update cart product quantity
        await pool.query(
            `UPDATE CartProducts SET quantity = $1 WHERE cart_id = $2 AND product_id = $3`,
            [newQuantity, cartId, productId]
        );
        console.log(`Updated product ${productId} quantity to ${newQuantity} in cart ${cartId}`);
    } else {
        // Add product to cart if it's not already there
        await pool.query(
            `INSERT INTO CartProducts (cart_id, product_id, quantity) VALUES ($1, $2, $3)`,
            [cartId, productId, quantity]
        );
        console.log(`Added product ${productId} with quantity ${quantity} to cart ${cartId}`);
    }

    // Reduce stock after adding the product to the cart
    await pool.query(
        `UPDATE Products SET stock = stock - $1 WHERE product_id = $2`,
        [quantity, productId]
    );
    console.log(`Reduced stock for product ${productId} by ${quantity}`);

    return { success: true, message: "Product added to cart." };
};


// export const addProductToCart = async (cartId, productId, quantity) => {
//     console.log("Adding product to cart:", cartId, productId, quantity);

//     // Check stock availability
//     const { rows: productStock } = await pool.query(
//         `SELECT stock FROM Products WHERE product_id = $1`,
//         [productId]
//     );

//     if (productStock.length === 0) {
//         return { success: false, message: "Product does not exist." };
//     }

//     if (productStock[0].stock < quantity) {
//         return { success: false, message: "Not enough stock available." };
//     }

//     // Check if product already exists in cart
//     const { rows: existingProduct } = await pool.query(
//         `SELECT * FROM CartProducts WHERE cart_id = $1 AND product_id = $2`,
//         [cartId, productId]
//     );

//     if (existingProduct.length > 0) {
//         const newQuantity = existingProduct[0].quantity + quantity;

//         if (productStock[0].stock < newQuantity) {
//             return {
//                 success: false,
//                 message: "Not enough stock available to update quantity.",
//             };
//         }

//         await pool.query(
//             `UPDATE CartProducts SET quantity = $1 WHERE cart_id = $2 AND product_id = $3`,
//             [newQuantity, cartId, productId]
//         );
//         console.log(
//             `Updated product ${productId} quantity to ${newQuantity} in cart ${cartId}`
//         );
//     } else {
//         await pool.query(
//             `INSERT INTO CartProducts (cart_id, product_id, quantity) VALUES ($1, $2, $3)`,
//             [cartId, productId, quantity]
//         );
//         console.log(
//             `Added product ${productId} with quantity ${quantity} to cart ${cartId}`
//         );
//     }

//     // Reduce stock
//     await pool.query(
//         `UPDATE Products SET stock = stock - $1 WHERE product_id = $2`,
//         [quantity, productId]
//     );
//     console.log(`Reduced stock for product ${productId} by ${quantity}`);

//     return { success: true, message: "Product added to cart." };
// };

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
    const client = await pool.connect();
    try {
        console.log("Clearing carts with NULL user_id...");
        await client.query('BEGIN');
        const { rows: cartIds } = await client.query(
            `SELECT cart_id FROM Cart WHERE user_id IS NULL`
        );

        if (cartIds.length === 0) {
            console.log("No carts with NULL user_id found.");
            return { success: false, message: "No carts with NULL user_id found." };
        }

        for (const { cart_id } of cartIds) {
            const { rows: cartProducts } = await client.query(
                `SELECT product_id, quantity FROM CartProducts WHERE cart_id = $1`,
                [cart_id]
            );
            for (const { product_id, quantity } of cartProducts) {
                await client.query(
                    `UPDATE Products SET stock = stock + $1 WHERE product_id = $2`,
                    [quantity, product_id]
                );
                console.log(
                    `Restored ${quantity} units to product ${product_id}`
                );
            }
            await client.query(`DELETE FROM CartProducts WHERE cart_id = $1`, [cart_id]);
            console.log(`Cleared all products from cart ${cart_id}`);
            await client.query(`DELETE FROM Cart WHERE cart_id = $1`, [cart_id]);
            console.log(`Deleted cart ${cart_id}`);
        }

        await client.query('COMMIT');
        return {
            success: true,
            message: "Cleared all products and deleted carts with NULL user_id.",
        };
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Error clearing carts:", error.message);
        return { success: false, message: "Error clearing carts.", error: error.message };
    } finally {
        client.release();
    }
};

export const clearuserCartProducts = async (userId) => {
    const client = await pool.connect();
    try {
        console.log(`Clearing cart for user ${userId}...`);
        await client.query('BEGIN');
        const { rows: userCart } = await client.query(
            `SELECT cart_id FROM Cart WHERE user_id = $1 LIMIT 1`,
            [userId]
        );

        if (userCart.length === 0) {
            console.log("No cart found for user:", userId);
            return { success: false, message: "No cart found for the user." };
        }

        const cartId = userCart[0].cart_id;

        const { rows: cartProducts } = await client.query(
            `SELECT product_id, quantity FROM CartProducts WHERE cart_id = $1`,
            [cartId]
        );
        for (const { product_id, quantity } of cartProducts) {
            await client.query(
                `UPDATE Products SET stock = stock + $1 WHERE product_id = $2`,
                [quantity, product_id]
            );
            console.log(
                `Restored ${quantity} units to product ${product_id}`
            );
        }

        await client.query(`DELETE FROM CartProducts WHERE cart_id = $1`, [cartId]);
        console.log(`Cleared all products from cart ${cartId}`);

        await client.query('COMMIT');
        return { success: true, message: "Cleared all products from the user's cart and updated stock." };
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Error clearing user cart products:", error.message);
        return { success: false, message: "Error clearing user cart products.", error: error.message };
    } finally {
        client.release();
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
        console.log(`Fetching products for cart ${cart_id}...`);
        
        const query = `
            SELECT 
                c.cart_id, 
                c.product_id, 
                c.quantity, 
                p.name, 
                p.image_url, 
                p.price AS regular_price, 
                CASE 
                    WHEN s.product_id IS NOT NULL THEN true 
                    ELSE false 
                END AS sale,
                s.new_price,
                s.discount_percentage
            FROM 
                CartProducts c
            JOIN 
                Products p 
            ON 
                c.product_id = p.product_id
            LEFT JOIN 
                Sale s 
            ON 
                c.product_id = s.product_id
            WHERE 
                c.cart_id = $1
        `;

        const { rows: cartProducts } = await pool.query(query, [cart_id]);

        if (cartProducts.length === 0) {
            console.log("No items in cart...");
            return {
                success: false,
                message: "No items in cart."
            };
        }

        return {
            success: true,
            products: cartProducts,
            message: "Fetched cart products successfully."
        };
    } catch (error) {
        console.error("Error fetching cart products:", error.message);
        return {
            success: false,
            message: "Failed to fetch cart products.",
            error: error.message
        };
    }
};


export const ChangeProductQuantity = async (cart_id, product_id, cflag) => {
    try {
        console.log(`${cflag === "increase" ? "Increasing" : "Decreasing"} quantity for product ${product_id} in cart ${cart_id}`  );
        const { rows: productInCart } = await pool.query(
            `SELECT quantity FROM CartProducts WHERE cart_id = $1 AND product_id = $2`,
            [cart_id, product_id]
        );

        if (productInCart.length === 0) {
            return { success: false, message: "Product not found in cart." };
        }

        const currentQuantity = productInCart[0].quantity;
        const { rows: productStock } = await pool.query(
            `SELECT stock FROM Products WHERE product_id = $1`,
            [product_id]
        );

        if (productStock.length === 0) {
            return { success: false, message: "Product does not exist." };
        }

        const stockAvailable = productStock[0].stock;
        if (cflag === "increase") {
            if (stockAvailable < 1) {
                return {
                    success: false,
                    message: "Not enough stock available to increase quantity.",
                };
            }
            await pool.query(
                `UPDATE CartProducts SET quantity = quantity + 1 WHERE cart_id = $1 AND product_id = $2`,
                [cart_id, product_id]
            );
            await pool.query(
                `UPDATE Products SET stock = stock - 1 WHERE product_id = $1`,
                [product_id]
            );

            console.log(`Increased quantity for product ${product_id} in cart ${cart_id}`);
            return { success: true, message: "Increased product quantity by 1." };

        } else if (cflag === "decrease") {
            if (currentQuantity <= 1) {
                return {
                    success: false,
                    message: "Cannot decrease quantity below 1. Remove the product instead.",
                };
            }
            await pool.query(
                `UPDATE CartProducts SET quantity = quantity - 1 WHERE cart_id = $1 AND product_id = $2`,
                [cart_id, product_id]
            );

            await pool.query(
                `UPDATE Products SET stock = stock + 1 WHERE product_id = $1`,
                [product_id]
            );

            console.log(`Decreased quantity for product ${product_id} in cart ${cart_id}`);
            return { success: true, message: "Decreased product quantity by 1." };

        } else {
            return { success: false, message: "Invalid flag. Use 'increase' or 'decrease'." };
        }
    } catch (error) {
        console.error("Error changing product quantity:", error);
        return {
            success: false,
            message: "Error changing product quantity.",
            error,
        };
    }
};
