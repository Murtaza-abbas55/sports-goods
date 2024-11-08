// server/models/Product.js
import pool from '../db.js';

export const getAllProducts = async () => {
    try {
        const result = await pool.query('SELECT * FROM Products');
        return result.rows;
    } catch (error) {
        throw new Error('Error retrieving products: ' + error.message);
    }
};

export const createProduct = async (productData) => {
    const { product_id, name, description, price, stock, category_id, admin_username = null } = productData;
    const createdAt = null; // Set created_at to NULL

    try {
        const result = await pool.query(
            'INSERT INTO Products (product_id, name, description, price, stock, category_id, created_at, admin_username) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [product_id, name, description, price, stock, category_id, createdAt, admin_username]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error('Error creating product: ' + error.message);
    }
};