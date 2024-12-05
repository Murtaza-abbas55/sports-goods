import pool from '../db.js'; 

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const createOrder = async (user_id,shipping_address,total_amount) => {
    let order_id;
    let unique = false;

    try {
        console.log('Starting to create an order...');
        while (!unique) {
            order_id = getRandomInt(1, 1000); 
            console.log(`Generated order_id: ${order_id}`);
            const result = await pool.query(
                'SELECT 1 FROM Orders WHERE order_id = $1',
                [order_id]
            );

            if (result.rowCount === 0) {
                unique = true;
                console.log(`order_id ${order_id} is unique.`);
            } else {
                console.log(`order_id ${order_id} already exists. Generating a new one.`);
            }
        }

        const adminResult = await pool.query(
            'SELECT admin_username FROM Admin ORDER BY RANDOM() LIMIT 1'
        );

        if (adminResult.rows.length === 0) {
            throw new Error('No admin found in the database');
        }

        const admin_username = adminResult.rows[0].admin_username;
        console.log(`Selected admin_username: ${admin_username}`);

        const result = await pool.query(
            `INSERT INTO Orders (order_id,shipping_address,total_amount,status, created_at, user_id, admin_username)
             VALUES ($1, $2, $3, $4, $5,$6,$7)
             RETURNING *`,
            [order_id,shipping_address,total_amount, 'pending', new Date(), user_id, admin_username]
        );

        console.log('Order created successfully:', result.rows[0]);
        return result.rows[0]; 
    } catch (error) {
        console.error('Error creating order:', error.message);
        throw error;
    }
};
export const CartToOrderProducts = async (user_id, order_id) => {
    try {
        console.log('Starting transferCartToOrderProducts function');
        const cartResult = await pool.query(
            `SELECT cart_id FROM Cart WHERE user_id = $1`,
            [user_id]
        );
        console.log(`Query executed to retrieve cart_id for user_id ${user_id}:`, cartResult.rows);

        if (cartResult.rows.length === 0) {
            console.log('No cart found for this user');
            throw new Error('No cart found for this user');
        }

        const cart_id = cartResult.rows[0].cart_id;
        console.log('Cart ID retrieved for user:', cart_id);

        const cartProductsResult = await pool.query(
            `SELECT product_id, quantity FROM CartProducts WHERE cart_id = $1`,
            [cart_id]
        );
        console.log(`Query executed to retrieve products in cart with cart_id ${cart_id}:`, cartProductsResult.rows);

        const cartProducts = cartProductsResult.rows;

        if (cartProducts.length === 0) {
            console.log('Cart is empty');
            throw new Error('Cart is empty');
        }

        console.log('Products in cart:', cartProducts);
        for (const product of cartProducts) {
            const { product_id, quantity } = product;

            const existingProductResult = await pool.query(
                `SELECT * FROM OrderProducts WHERE order_id = $1 AND product_id = $2`,
                [order_id, product_id]
            );

            let price_at_order;

            // Check if the product is on sale
            const saleResult = await pool.query(
                `SELECT new_price FROM Sale WHERE product_id = $1`,
                [product_id]
            );

            if (saleResult.rows.length > 0) {
                // Use the sale price
                price_at_order = saleResult.rows[0].new_price * quantity;
                console.log(`Product ${product_id} is on sale. Sale price used.`);
            } else {
                // Use the regular price
                const productPriceResult = await pool.query(
                    `SELECT price FROM Products WHERE product_id = $1`,
                    [product_id]
                );
                price_at_order = productPriceResult.rows[0].price * quantity;
                console.log(`Product ${product_id} is not on sale. Regular price used.`);
            }

            if (existingProductResult.rows.length > 0) {
                console.log(`Product ${product_id} already exists in order ${order_id}. Updating quantity...`);
                await pool.query(
                    `UPDATE OrderProducts
                     SET quantity = $1, price_at_order = $2
                     WHERE order_id = $3 AND product_id = $4`,
                    [quantity, price_at_order, order_id, product_id]
                );
                console.log(`Updated Product ${product_id} in OrderProducts with new quantity and price`);
            } else {
                console.log(`Product ${product_id} does not exist in order ${order_id}. Adding to OrderProducts...`);
                await pool.query(
                    `INSERT INTO OrderProducts (order_id, product_id, quantity, price_at_order)
                     VALUES ($1, $2, $3, $4)`,
                    [order_id, product_id, quantity, price_at_order]
                );
                console.log(`Product ${product_id} added to OrderProducts with order_id ${order_id}`);
            }
        }

        await pool.query(`DELETE FROM CartProducts WHERE cart_id = $1`, [cart_id]);
        console.log(`Cleared CartProducts for cart ID: ${cart_id}`);

        return { message: 'Cart products transferred to order successfully' };
    } catch (error) {
        console.error('Error in transferCartToOrderProducts:', error);
        throw new Error('Error transferring cart to order: ' + error.message);
    }
};

export const cancelOrder = async (order_id) => {
    try {
        console.log(`Attempting to cancel order with order_id: ${order_id}`);
        const { rows: orderProducts } = await pool.query(
            `SELECT product_id, quantity FROM OrderProducts WHERE order_id = $1`,
            [order_id]
        );

        if (orderProducts.length === 0) {
            return { success: false, message: 'No products found for this order.' };
        }
        for (const product of orderProducts) {
            const { product_id, quantity } = product;

            await pool.query(
                `UPDATE Products SET stock = stock + $1 WHERE product_id = $2`,
                [quantity, product_id]
            );
        }
        await pool.query(`DELETE FROM OrderProducts WHERE order_id = $1`, [order_id]);
        await pool.query(`DELETE FROM Orders WHERE order_id = $1`, [order_id]);

        console.log(`Order with order_id ${order_id} canceled successfully.`);
        return { success: true, message: `Order ${order_id} has been canceled.` };
    } catch (error) {
        console.error('Error canceling order:', error.message);
        throw new Error(`Error canceling order: ${error.message}`);
    }
};
export const getOrder = async (order_id) => {
    try {
        console.log(`Fetching order details for order_id: ${order_id}`);

        const query = `
            SELECT 
                o.product_id, 
                p.name, 
                p.image_url, 
                o.quantity, 
                o.price_at_order,
                CASE 
                    WHEN s.product_id IS NOT NULL THEN true 
                    ELSE false 
                END AS sale,
                s.new_price,
                s.discount_percentage
            FROM 
                OrderProducts o
            JOIN 
                Products p 
            ON 
                o.product_id = p.product_id
            LEFT JOIN 
                Sale s 
            ON 
                o.product_id = s.product_id
            WHERE 
                o.order_id = $1
        `;

        const { rows: orderProducts } = await pool.query(query, [order_id]);

        if (orderProducts.length === 0) {
            console.log(`No products found for order_id: ${order_id}`);
            return {
                success: false,
                message: "No products found for this order."
            };
        }

        return {
            success: true,
            order_id,
            products: orderProducts,
            message: "Order details retrieved successfully."
        };
    } catch (error) {
        console.error("Error fetching order details:", error.message);
        return {
            success: false,
            message: "Failed to fetch order details.",
            error: error.message
        };
    }
};

export const getUserAllOrders = async (user_id) => {
    try {
        console.log(`Fetching all orders for user_id: ${user_id}`);

        const { rows: orders } = await pool.query(
            `SELECT order_id,total_amount, created_at, status 
             FROM Orders 
             WHERE user_id = $1 
             ORDER BY created_at DESC`,
            [user_id]
        );

        if (orders.length === 0) {
            return { success: false, message: 'No orders found for this user.' };
        }

        console.log(`Found ${orders.length} orders for user_id: ${user_id}`);
        return { success: true, orders };
    } catch (error) {
        console.error('Error fetching user orders:', error.message);
        throw new Error('Error fetching orders: ' + error.message);
    }
};
export const getAdminAssociatedOrders = async (admin_username) => {
    try {
        console.log(`Fetching all orders for admin: ${admin_username}`);

        const { rows: orders } = await pool.query(
            `SELECT order_id,total_amount, created_at, status 
             FROM Orders 
             WHERE admin_username = $1 
             ORDER BY created_at DESC`,
            [admin_username]
        );

        if (orders.length === 0) {
            return { success: false, message: 'No orders associated found for this admin.' };
        }

        console.log(`Found ${orders.length} orders for admin_username: ${admin_username}`);
        return { success: true, orders };
    } catch (error) {
        console.error('Error fetching user orders:', error.message);
        throw new Error('Error fetching orders: ' + error.message);
    }
}

export const updateorderstatus = async (order_id,status,admin_username) => {
        try {
            console.log(`Updating order status for order_id: ${order_id} to status: ${status}`);
            const { rowCount } = await pool.query(
                `UPDATE Orders SET status = $1 WHERE order_id = $2 AND admin_username = $3`,
                [status, order_id,admin_username]
            );
    
            if (rowCount === 0) {
                console.log(`No order found with order_id: ${order_id}`);
                return { success: false, message: 'Order not found.' };
            }
    
            console.log(`Order status updated successfully for order_id: ${order_id}`);
            return { success: true, message: 'Order status updated successfully by admin.' };
        } catch (error) {
            console.error('Error updating order status:', error.message);
            throw new Error('Error updating order status: ' + error.message);
        }
    
}
