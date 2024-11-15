import pool from '../db.js'; 

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const createOrder = async (user_id) => {
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
            `INSERT INTO Orders (order_id, status, created_at, user_id, admin_username)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [order_id, 'pending', new Date(), user_id, admin_username]
        );

        console.log('Order created successfully:', result.rows[0]);
        return result.rows[0]; 
    } catch (error) {
        console.error('Error creating order:', error.message);
        throw error;
    }
};
