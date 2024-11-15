import { createOrder, CartToOrderProducts } from '../models/Orders.js';

export const createOrderController = async (req, res) => {
    const {user_id }= req.body;
    console.log('createOrderController called with user_id:', user_id);

    try {
        if (!user_id) {
            console.log('User ID not provided in the request');
            return res.status(400).json({ error: 'User ID is required to create an order.' });
        }

        const newOrder = await createOrder(user_id);
        console.log('Order created successfully with order_id:', newOrder.order_id);

        const transferResult = await CartToOrderProducts(user_id, newOrder.order_id);
        console.log('Cart transfer result:', transferResult.message);
        res.status(201).json({
            message: 'Order created successfully and cart items transferred',
            order: newOrder
        });
    } catch (error) {
        console.error('Error in createOrderController:', error);
        res.status(500).json({ error: 'Failed to create order and transfer cart items' });
    }
};
