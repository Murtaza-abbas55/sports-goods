import pool from "../db.js";

import pool from "../db.js";

export const getNewArrivalProducts = async () => {
    try {
        console.log("Fetching new arrival products...");
        
        const query = `
            SELECT 
                p.product_id, 
                p.name, 
                p.image_url, 
                p.price AS regular_price, 
                p.stock, 
                p.description, 
                p.created_at, 
                CASE 
                    WHEN s.product_id IS NOT NULL THEN true 
                    ELSE false 
                END AS sale,
                s.new_price,
                s.discount_percentage
            FROM 
                Products p
            JOIN 
                New_Arrival n 
            ON 
                p.product_id = n.product_id
            LEFT JOIN 
                Sale s 
            ON 
                p.product_id = s.product_id
            ORDER BY 
                p.created_at DESC
            LIMIT 5
        `;

        const { rows: newArrivalProducts } = await pool.query(query);

        return {
            success: true,
            products: newArrivalProducts,
            message: "Fetched new arrival products successfully."
        };
    } catch (error) {
        console.error("Error fetching new arrival products:", error.message);
        return {
            success: false,
            message: "Failed to fetch new arrival products.",
            error: error.message
        };
    }
};
