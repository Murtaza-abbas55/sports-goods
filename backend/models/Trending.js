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
        console.log("Fetching trending products...");
        const fetchProductsQuery = `
            SELECT p.*
            FROM Products p
            JOIN Trending t ON p.product_id = t.product_id;
        `;
        const { rows: trendingProducts } = await pool.query(fetchProductsQuery);
        return {
            success: true,
            products: trendingProducts,
            message: "Fetched trending products successfully."
        };
    } catch (error) {
        console.error("Error fetching trending products:", error);
        return {
            success: false,
            message: "Failed to fetch trending products.",
            error
        };
    }
};
