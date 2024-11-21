import pool from '../db.js';

export const createPayment = async (order_id, payment_method) => {
    try {
        const payment_id = Math.floor(Math.random() * 1000000); 
        const payment_date = new Date();
        const status = 'completed';

        const result = await pool.query(
            `INSERT INTO Payment (payment_id, status, payment_method, payment_date, order_id)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [payment_id, status, payment_method, payment_date, order_id]
        );

        return result.rows[0];
    } catch (error) {
        console.error('Error creating payment:', error);
        throw new Error('Failed to create payment');
    }
};

export const getPaymentByOrderId = async (order_id) => {
    try {
        const result = await pool.query(
            `SELECT * FROM Payment WHERE order_id = $1`,
            [order_id]
        );

        if (result.rows.length === 0) {
            throw new Error('No payment found for this order');
        }

        return result.rows[0];
    } catch (error) {
        console.error('Error retrieving payment:', error);
        throw new Error('Failed to retrieve payment');
    }
};
