// server/models/Product.js
import pool from '../db.js';

export const getAllProducts = async () => {
    try {
        const result = await pool.query('SELECT * FROM Product');
        return result.rows;
    } catch (error) {
        throw new Error('Error retrieving products: ' + error.message);
    }
};

export const createProduct = async (productData) => {
    const { product_id, product_name, description, price, stock_quantity, category_id } = productData;
    try {
        const result = await pool.query(
            'INSERT INTO Product (product_id, product_name, description, price, stock_quantity, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [product_id, product_name, description, price, stock_quantity, category_id]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error('Error creating product: ' + error.message);
    }
};
