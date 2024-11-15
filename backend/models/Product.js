// server/models/Product.js
import pool from '../db.js';
export const GetProductById = async(id) =>{
 try{
    const result = await pool.query(`SELECT * FROM Products where product_id = $1`,[id]);
    return result.rows;
 }
 catch (error) {
    throw new Error(`Error retrieving product with {id}: ` + error.message);
}
};
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
                image_url = $6
            WHERE
                admin_username = $7 AND product_id = $8
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
