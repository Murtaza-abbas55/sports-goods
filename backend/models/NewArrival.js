import pool from "../db.js";
export const getNewArrivalProducts = async () => {
    const result = await pool.query(
        `SELECT p.*
         FROM Products p
         JOIN New_Arrival n ON p.product_id = n.product_id
         ORDER BY p.created_at DESC
         LIMIT 5`
    );

    return result.rows;
};
