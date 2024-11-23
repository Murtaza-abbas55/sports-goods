// server/models/Product.js
import pool from '../db.js';
export const GetProductById = async (id) => {
    try {
        const query = `
            SELECT 
                p.product_id, 
                p.name, 
                p.image_url, 
                p.stock, 
                p.price, 
                p.description, 
                p.category_id, 
                p.created_at, 
                p.admin_username,
                s.discount_percentage, 
                s.new_price
            FROM 
                Products p
            LEFT JOIN 
                Sale s
            ON 
                p.product_id = s.product_id
            WHERE 
                p.product_id = $1
        `;

        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            throw new Error(`No product found with id: ${id}`);
        }

        return result.rows[0]; 
    } catch (error) {
        throw new Error(`Error retrieving product with id ${id}: ` + error.message);
    }
};

export const getAllProducts = async () => {
    try {
        const query = `
            SELECT 
                p.product_id, 
                p.name, 
                p.image_url, 
                p.stock, 
                p.price, 
                p.description, 
                p.category_id, 
                p.created_at, 
                p.admin_username,
                s.discount_percentage, 
                s.new_price
            FROM 
                Products p
            LEFT JOIN 
                Sale s
            ON 
                p.product_id = s.product_id
        `;

        const result = await pool.query(query);

        return result.rows;
    } catch (error) {
        throw new Error('Error retrieving products: ' + error.message);
    }
};

export const createProduct = async (productData) => {
    const { product_id, name, description, price, stock, category_id, image_url, admin_username } = productData;

    try {
        // Insert product into Products table
        const result = await pool.query(
            `INSERT INTO Products (product_id, name, image_url, description, price, stock, category_id, created_at, admin_username)
             VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), $8) RETURNING *`,
            [product_id, name, image_url, description, price, stock, category_id, admin_username]
        );
        console.log("Product Insert Result:", result.rows);

        // Insert product_id into New_Arrival table
        const newArrivalResult = await pool.query(
            `INSERT INTO New_Arrival (product_id) VALUES ($1) RETURNING *`,
            [product_id]
        );
        console.log("New Arrival Insert Result:", newArrivalResult.rows);

        // Delete old entries in New_Arrival to keep only the last 5 products
        const deleteOldEntriesResult = await pool.query(
            `DELETE FROM New_Arrival
             WHERE product_id NOT IN (
                 SELECT product_id
                 FROM Products
                 ORDER BY created_at DESC
                 LIMIT 5
             ) RETURNING *`
        );
        console.log("Deleted Old New_Arrival Entries:", deleteOldEntriesResult.rowCount);

        return result.rows[0];
    } catch (error) {
        console.error('Error in createProduct:', error.message);
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
    const { product_id, name, description, price, stock, category_id, image_url, admin_username } = productData;

    // Ensure required fields are provided
    if (!product_id) {
        throw new Error('Product ID is required');
    }
    if (!admin_username) {
        throw new Error('Admin username is required');
    }

    try {
        console.log('Starting UpdateProduct function for product_id:', product_id);

        const query = `
            UPDATE Products
            SET
                name = $1,
                description = $2,
                price = $3,
                stock = $4,
                category_id = $5,
                image_url = $6,
                admin_username = $7 
            WHERE
            product_id = $8
            RETURNING *;
        `;

        const values = [
            name,
            description,
            price,
            stock,
            category_id,
            image_url,
            admin_username,
            product_id
        ];

        console.log('Executing query:', query);
        console.log('Query values:', values);

        // Execute the query
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            throw new Error('No product found with the specified product_id and admin_username');
        }

        console.log('Product updated successfully:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error in UpdateProduct:', error);
        throw new Error('Error updating product: ' + error.message);
    }
};
