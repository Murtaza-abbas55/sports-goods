import { createPayment } from "../models/PAyment.js";

export const createPaymentController = async (req, res) => {
    const { order_id, payment_method } = req.body;

    try {
        if (!order_id || !payment_method) {
            return res.status(400).json({ error: 'Order ID and payment method are required.' });
        }

        const payment = await createPayment(order_id, payment_method);
        res.status(201).json({
            message: 'Payment created successfully',
            payment,
        });
    } catch (error) {
        console.error('Error in createPaymentController:', error);
        res.status(500).json({ error: 'Failed to create payment' });
    }
};

export const getPaymentByOrderController = async (req, res) => {
    const { order_id } = req.query;

    try {
        if (!order_id) {
            return res.status(400).json({ error: 'Order ID is required.' });
        }

        const payment = await getPaymentByOrderId(order_id);
        res.status(200).json({ payment });
    } catch (error) {
        console.error('Error in getPaymentByOrderController:', error);
        res.status(500).json({ error: 'Failed to retrieve payment' });
    }
};
