import pool from "../db.js"
export const getProductsSortedByPriceLowToHigh = async (category_id = null) => {
    try {
        let query = `
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
                Sale s ON p.product_id = s.product_id
        `;
        if (category_id) {
            query += ` WHERE p.category_id = $1`;
        }

        query += `
            ORDER BY 
                -- Sort by new_price if sale exists, otherwise sort by regular price
                CASE 
                    WHEN s.new_price IS NOT NULL THEN s.new_price
                    ELSE p.price
                END ASC
        `;

        const values = category_id ? [category_id] : [];

        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        throw new Error('Error retrieving products sorted by price (low to high): ' + error.message);
    }
};

export const getProductsSortedByPriceHighToLow = async (category_id = null) => {
    try {
        let query = `
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
                Sale s ON p.product_id = s.product_id
        `;

        if (category_id) {
            query += ` WHERE p.category_id = $1`;
        }

        query += `
            ORDER BY 
                -- Sort by new_price if sale exists, otherwise sort by regular price
                CASE 
                    WHEN s.new_price IS NOT NULL THEN s.new_price
                    ELSE p.price
                END DESC
        `;

        const values = category_id ? [category_id] : [];

        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        throw new Error('Error retrieving products sorted by price (high to low): ' + error.message);
    }
};
export const getProductsSortedByMostPopular = async (category_id = null) => {
    try {
        let query = `
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
                s.new_price,
                AVG(r.rating) AS average_rating,
                COUNT(r.review_id) AS review_count
            FROM 
                Products p
            LEFT JOIN 
                Sale s ON p.product_id = s.product_id
            LEFT JOIN 
                Reviews r ON p.product_id = r.product_id
        `;
        
        if (category_id) {
            query += ` WHERE p.category_id = $1`;
        }

        query += `
            GROUP BY p.product_id, s.discount_percentage, s.new_price
            ORDER BY average_rating DESC
        `;

        const values = category_id ? [category_id] : [];

        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        throw new Error('Error retrieving most popular products (based on rating): ' + error.message);
    }
};