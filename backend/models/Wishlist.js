import pool from '../db.js';

export const addToWishlist = async (user_id, product_id, wishlist_name) => {
    try {
        const wishlistResult = await pool.query(
            'SELECT * FROM wishlist WHERE user_id = $1 AND product_id = $2',
            [user_id, product_id]
        );

        if (wishlistResult.rowCount === 0) {
            const result = await pool.query(
                'INSERT INTO wishlist (user_id, product_id, wishlist_name) VALUES ($1, $2, $3) RETURNING *',
                [user_id, product_id, wishlist_name]
            );
            console.log('Added to wishlist:', result.rows[0]);
            return result.rows[0];
        } else {
            console.log('Product already in wishlist');
            return null;
        }
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        throw error;
    }
};

export const removeFromWishlist = async (user_id, product_id) => {
    try {
        const wishlistResult = await pool.query(
            'SELECT * FROM wishlist WHERE user_id = $1 AND product_id = $2',
            [user_id, product_id]
        );

        if (wishlistResult.rowCount > 0) {
            const result = await pool.query(
                'DELETE FROM wishlist WHERE user_id = $1 AND product_id = $2 RETURNING *',
                [user_id, product_id]
            );
            console.log('Removed from wishlist:', result.rows[0]);
            return result.rows[0];
        } else {
            console.log('Product not found in wishlist');
            return null;
        }
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        throw error;
    }
};

export const updateWishlistName = async (user_id, product_id, new_wishlist_name) => {
    try {
        const wishlistResult = await pool.query(
            'SELECT * FROM wishlist WHERE user_id = $1 AND product_id = $2',
            [user_id, product_id]
        );

        if (wishlistResult.rowCount > 0) {
            const result = await pool.query(
                'UPDATE wishlist SET wishlist_name = $1 WHERE user_id = $2 AND product_id = $3 RETURNING *',
                [new_wishlist_name, user_id, product_id]
            );
            console.log('Updated wishlist name:', result.rows[0]);
            return result.rows[0];
        } else {
            console.log('Product not found in wishlist');
            return null;
        }
    } catch (error) {
        console.error('Error updating wishlist name:', error);
        throw error;
    }
};

export const getAllWishlistItems = async (user_id) => {
    try {
        const result = await pool.query(
            'SELECT * FROM wishlist WHERE user_id = $1',
            [user_id]
        );
        console.log('Fetched all wishlist items:', result.rows);
        return result.rows;
    } catch (error) {
        console.error('Error fetching wishlist items:', error);
        throw error;
    }
};
