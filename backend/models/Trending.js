import pool from "../db.js"


export const refreshTrendingProducts = async () => {
    try {
        console.log("Refreshing trending products to get latest trends...");
        await pool.query("BEGIN");
        await pool.query("TRUNCATE TABLE Trending");
        const insertquery= `
            INSERT INTO Trending (product_id)
            SELECT product_id
            FROM (
                SELECT 
                    product_id, 
                    COUNT(*) AS order_count
                FROM OrderProducts
                GROUP BY product_id
                HAVING COUNT(*) >=1
            ) AS trending_products;
        `;
        await pool.query(insertquery);
        console.log("Inserted trending products into Trending table.");
        await pool.query("COMMIT");
        return { success: true, message: "Trending products table refreshed successfully." };
    } catch (error) {
        console.error("Error refreshing trending products:", error);
        await pool.query("ROLLBACK");
        return { success: false, message: "Failed to refresh trending products.", error };
    }
};



export const fetchTrendingProducts = async () => { 
    try {
        const query = `
            SELECT 
               p.*, 
                CASE 
                    WHEN s.product_id IS NOT NULL THEN true
                    ELSE false 
                END AS sale, 
                s.new_price, 
                s.discount_percentage
            FROM 
                Products p
            JOIN 
                Trending t
            ON 
                p.product_id = t.product_id
            LEFT JOIN 
                Sale s
            ON 
                p.product_id = s.product_id
        `;

        const result = await pool.query(query);

        if (result.rows.length === 0) {
            throw new Error("No trending products found.");
        }

        return result.rows;
    } catch (error) {
        throw new Error('Error retrieving trending products: ' + error.message);
    }
};
