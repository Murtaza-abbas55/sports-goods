
import pool from "../db.js"


export const getAllCategories = async () =>{
   console.log("Getting all categories....");
   try{
   const result= await pool.query(`Select * from Category`);
   return result.rows;
   }
   catch (error) {
    throw new Error('Error retrieving categories: ' + error.message);
}
};

export const getProductsByCategoryId = async (category_id) =>{
    console.log(`Getting product by category....`);
    try {
        const result= await pool.query(`Select * from Products where category_id=$1`,[category_id]);
        return result.rows;
    }
    catch(error) {
        throw new Error('Error retrieving products by category: ' + error.message);
    }
};
