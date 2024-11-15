import pool from "../db.js";

export const addReview = async (user_id, product_id, rating, comments) => {
    const existingReview = await pool.query(
        `SELECT * FROM Reviews WHERE user_id = $1 AND product_id = $2`,
        [user_id, product_id]
    );

    if (existingReview.rows.length > 0) {
        throw new Error("User has already reviewed this product.");
    }
    const newReview = await pool.query(
        `INSERT INTO Reviews (user_id, product_id, rating, comments) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [user_id, product_id, rating, comments]
    );

    return newReview.rows[0];
};

export const deleteReview = async (user_id, product_id) => {
    const review = await pool.query(
        `SELECT * FROM Reviews WHERE user_id = $1 AND product_id = $2`,
        [user_id, product_id]
    );

    if (review.rows.length === 0) {
        throw new Error("Review not found.");
    }
    await pool.query(`DELETE FROM Reviews WHERE user_id = $1 AND product_id = $2`, [
        user_id,
        product_id,
    ]);

    return { success: true, message: "Review deleted successfully." };
};
export const getAllGivenReviews=async(user_id)=>{
    const review = await pool.query(
        `SELECT * FROM Reviews WHERE user_id = $1`,
        [user_id]
    );

    if (review.rows.length === 0) {
        throw new Error("Review not found.");
    }
    return review.rows;
}