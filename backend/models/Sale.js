import pool from "../db.js";
export const AddSale = async(discount_percent,product_id,admin_username) => {
     const existingSales = await pool.query( `Select * from sale where product_id = $1`,[product_id]);
     if (existingSales.rows.length > 0) {
        throw new Error("Product is on sale already do you want to update it?");
     }
    const productpriceresult = await pool.query( `Select price from products where product_id = $1`,[product_id]);
    if (productpriceresult.rows.length === 0) {
        throw new Error("Product not found.");
    }
    
    const productprice = productpriceresult.rows[0].price;
    console.log (`The product price is ${productprice}`);
    const newprice = productprice - ((productprice*discount_percent)/100);
    const newSale = await pool.query(`INSERT INTO Sale(discount_percentage,new_price,product_id,admin_username)
         VALUES ($1,$2,$3,$4)`, [discount_percent,newprice,product_id,admin_username]);
     return newSale.rows[0];
}

export const RemoveSale = async (product_id) => {
    const saleexist = await pool.query( `Select * from sale where product_id = $1`,[product_id]);
    if(saleexist.rows.length==0){
        throw new Error("Product has no sale related to it");
    }
    await pool.query(`DELETE FROM Sale WHERE product_id = $1`, [
        product_id,
    ]);

    return { success: true, message: "Sale deleted successfully.",product_id: product_id };
};

export const updateSaleById = async (newdiscount_percent, product_id, admin_username) => {
    try {
        // Check if the product is in the Sale table
        const saleExistResult = await pool.query(`SELECT * FROM Sale WHERE product_id = $1`, [product_id]);
        if (saleExistResult.rows.length === 0) {
            throw new Error("Product has no sale related to it");
        }

        // Get the current product price
        const productPriceResult = await pool.query(`SELECT price FROM Products WHERE product_id = $1`, [product_id]);
        if (productPriceResult.rows.length === 0) {
            throw new Error("Product not found.");
        }
        
        const productPrice = productPriceResult.rows[0].price;
        console.log(`The product price is ${productPrice}`);

        // Calculate the updated price based on the discount
        const updatedPrice = productPrice - (productPrice * newdiscount_percent) / 100;

        // Update the Sale table with the new discount and price
        const result = await pool.query(
            `UPDATE Sale SET discount_percentage = $1, new_price = $2, admin_username = $3 WHERE product_id = $4 RETURNING *`,
            [newdiscount_percent, updatedPrice, admin_username, product_id]
        );

        // Log how many rows were updated
        console.log('Number of rows updated:', result.rowCount);

        // If no rows were updated, the product might not exist in Sale, or no changes were made.
        if (result.rowCount === 0) {
            throw new Error("No sale entry was updated.");
        }

        // Return the updated sale entry
        console.log('Updated sale:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error updating sale:', error);
        throw error;
    }
};
