
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
export const getProductsByCategoryId = async (category_id) => {
  console.log(`Getting products by category with rating...`);
  try {
      const result = await pool.query(`
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
              COALESCE(AVG(r.rating), 0) AS average_rating
          FROM 
              Products p
          LEFT JOIN 
              Sale s ON p.product_id = s.product_id
          LEFT JOIN 
              Reviews r ON p.product_id = r.product_id
          WHERE 
              p.category_id = $1
          GROUP BY 
              p.product_id, s.discount_percentage, s.new_price
      `, [category_id]);

      return result.rows;
  } catch (error) {
      throw new Error('Error retrieving products by category: ' + error.message);
  }
};

// export const getProductsByCategoryId = async (category_id) =>{
//     console.log(`Getting product by category....`);
//     try {
//         const result= await pool.query(  `SELECT 
//           p.product_id, 
//           p.name, 
//           p.image_url, 
//           p.stock, 
//           p.price, 
//           p.description, 
//           p.category_id, 
//           p.created_at, 
//           p.admin_username,
//           s.discount_percentage, 
//           s.new_price
//       FROM 
//           Products p
//       LEFT JOIN 
//           Sale s
//       ON 
//           p.product_id = s.product_id
//       WHERE 
//           p.category_id = $1
//   `,[category_id]);
  
//     return result.rows;
//     }
//     catch(error) {
//         throw new Error('Error retrieving products by category: ' + error.message);
//     }
// };
export const insertCategory = async ( category_id, name, description ) => {
    console.log("Inserting new category...");
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
  
      const insertQuery = `
        INSERT INTO Category (category_id, name, description)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
      const result = await client.query(insertQuery, [category_id, name, description]);
  
      await client.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw new Error("Error inserting new category: " + error.message);
    } finally {
      client.release(); 
    }
  };
  export const updateCategory = async (category_id, name,description) => {
  
    console.log(`Updating category with ID ${category_id}...`);
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
  
      const updateQuery = `
        UPDATE Category
        SET name = $1, description = $2
        WHERE category_id = $3
        RETURNING *;
      `;
      const result = await client.query(updateQuery, [name, description, category_id]);
  
      if (result.rowCount === 0) {
        throw new Error(`Category with ID ${category_id} does not exist.`);
      }
  
      await client.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw new Error("Error updating category: " + error.message);
    } finally {
      client.release();
    }
  };
  export const deleteCategory = async (category_id) => {
  
    console.log(`Updating category with ID ${category_id}...`);
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
  
      const deleteQuery = `
        DELETE FROM Category
        WHERE category_id = $1
        RETURNING *;
      `;
      const result = await client.query(deleteQuery, [category_id]);
  
      if (result.rowCount === 0) {
        throw new Error(`Category with ID ${category_id} does not exist.`);
      }
  
      await client.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw new Error("Error to delete category: " + error.message);
    } finally {
      client.release();
    }
  };
  