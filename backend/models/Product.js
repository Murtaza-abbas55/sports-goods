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
    const { product_id, name, description, price, stock, category_id,image_url, admin_username } = productData;

    try {
        const result = await pool.query(
            `INSERT INTO Products (product_id, name, image_url, description, price, stock, category_id, created_at, admin_username)
             VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), $8) RETURNING *`,
            [product_id, name, image_url, description, price, stock, category_id, admin_username]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error('Error creating product: ' + error.message);
    }
};


export const DeleteProduct = async (product_id) => {
    try {
        const result = await pool.query(
            `DELETE FROM Products
             WHERE product_id = $1
             RETURNING *`,
            [product_id]
        );
        if (result.rowCount === 0) {
            throw new Error('Product not found');
        }
        return result.rows[0]; 
    } catch (error) {
        throw new Error('Error deleting product: ' + error.message);
    }
};

export const UpdateProduct = async (productData) => {
    const { product_id, name, image_url, description, price, stock, category_id, admin_username } = productData;

    if (!product_id) {
        throw new Error('Product ID is required');
    }
    if (!admin_username) {
        throw new Error('Admin username is required');
    }

    const fields = [];
    const values = [];
    let index = 1;

    if (name) {
        fields.push(`name = $${index++}`);
        values.push(name);
    }
    if (image_url) {
        fields.push(`image_url = $${index++}`);
        values.push(image_url);
    }
    if (description) {
        fields.push(`description = $${index++}`);
        values.push(description);
    }
    if (price !== undefined) {
        fields.push(`price = $${index++}`);
        values.push(price);
    }
    if (stock !== undefined) {
        fields.push(`stock = $${index++}`);
        values.push(stock);
    }
    if (category_id) {
        fields.push(`category_id = $${index++}`);
        values.push(category_id);
    }
    
 
    fields.push(`admin_username = $${index++}`);
    values.push(admin_username);

   
    values.push(product_id);

    if (fields.length === 0) {
        throw new Error('No fields to update');
    }

    try {
 
        const query = `UPDATE Products
                       SET ${fields.join(', ')}
                       WHERE product_id = $${index}
                       RETURNING *`;

        const result = await pool.query(query, values);
        return result.rows[0]; 
    } catch (error) {
        throw new Error('Error updating product: ' + error.message);
    }
};
