import pool from "../db.js";
export const AddSale = async (discount_percent, product_id, admin_username) => {
    const existingSales = await pool.query(
        `Select * from sale where product_id = $1`,
        [product_id]
    );
    if (existingSales.rows.length > 0) {
        throw new Error("Product is on sale already do you want to update it?");
    }
    const productpriceresult = await pool.query(
        `Select price from products where product_id = $1`,
        [product_id]
    );
    if (productpriceresult.rows.length === 0) {
        throw new Error("Product not found.");
    }

    const productprice = productpriceresult.rows[0].price;
    console.log(`The product price is ${productprice}`);
    const newprice = productprice - (productprice * discount_percent) / 100;
    const newSale = await pool.query(
        `INSERT INTO Sale(discount_percentage,new_price,product_id,admin_username)
         VALUES ($1,$2,$3,$4)`,
        [discount_percent, newprice, product_id, admin_username]
    );
    return newSale.rows[0];
};

export const RemoveSale = async (product_id) => {
    const saleexist = await pool.query(
        `Select * from sale where product_id = $1`,
        [product_id]
    );
    if (saleexist.rows.length == 0) {
        throw new Error("Product has no sale related to it");
    }
    await pool.query(`DELETE FROM Sale WHERE product_id = $1`, [product_id]);

    return {
        success: true,
        message: "Sale deleted successfully.",
        product_id: product_id,
    };
};

export const getSale = async () => {
    try {
        const query = `
            SELECT 
                s.*,
                p.*
            FROM 
                Sale s
            INNER JOIN 
                Products p
            ON 
                s.product_id = p.product_id
        `;

        const { rows } = await pool.query(query);

        if (rows.length === 0) {
            return { success: false, message: "No sales available." };
        }

        return {
            success: true,
            message: "Sales retrieved successfully.",
            sales: rows,
        };
    } catch (error) {
        console.error("Error fetching sales:", error.message);
        throw new error("An error occurred while fetching sales.");
    }
};
