import pool from "../db.js";
export const getNewArrivalProducts = async () => {
    try {
        console.log("Fetching new arrival products...");

        // Simplified query to select all columns from Products, Sale information, and New_Arrival
        const result = await pool.query(
            `SELECT 
                p.*, 
                CASE 
                    WHEN s.product_id IS NOT NULL THEN true
                    ELSE false 
                END AS sale, 
                s.new_price, 
                s.discount_percentage
             FROM Products p
             JOIN New_Arrival n ON p.product_id = n.product_id
             LEFT JOIN Sale s ON p.product_id = s.product_id
             ORDER BY p.created_at DESC
             LIMIT 5`
        );

        return result.rows;  // Return only the rows (products array)
    } catch (error) {
        console.error("Error fetching new arrival products:", error.message);
        throw new Error("Failed to fetch new arrival products.");
    }
};
