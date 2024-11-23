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
export const getAllProductReviews = async (product_id) => {
    try {
        console.log(`Fetching reviews for product_id: ${product_id}`);

        const query = `
            SELECT 
                r.product_id,
                AVG(r.rating) AS average_rating,
                COUNT(r.review_id) AS review_count,
                r.rating,
                r.comments,
                u.user_id,
                CONCAT(u.first_name, ' ', u.last_name) AS user_name
            FROM 
                Reviews r
            JOIN 
                Users u ON r.user_id = u.user_id
            WHERE 
                r.product_id = $1
            GROUP BY 
                r.product_id, r.rating, r.comments, u.user_id, u.first_name, u.last_name;
        `;

        const { rows } = await pool.query(query, [product_id]);

        if (rows.length === 0) {
            return { success: false, message: 'No reviews found for this product.' };
        }
        const reviews = rows.map(row => ({
            user_id: row.user_id,
            user_name: row.user_name,
            rating: row.rating,
            comments: row.comments,
        }));

        return {
            success: true,
            product_id: product_id,
            average_rating: parseFloat(rows[0].average_rating).toFixed(2),
            review_count: rows[0].review_count,
            reviews: reviews,
        };
    } catch (error) {
        console.error('Error fetching product reviews:', error.message);
        return { success: false, message: 'Failed to fetch reviews.' };
    }
};