import pool from '../db.js'; // Adjust path if necessary
import bcrypt from 'bcryptjs';


export async function createUser(user_id, phone_number, first_name, last_name, password, address, email) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
        INSERT INTO users (user_id, phone_number, first_name, last_name, password, address, email) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_id, first_name, last_name, email`;
    const values = [user_id, phone_number, first_name, last_name, hashedPassword, address, email];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

export async function findUserByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await pool.query(query, [email]);
    return rows[0];
}

export const updateUserDetails = async ({
    user_id,
    phone_number,
    first_name,
    last_name,
    password,
    address,
    email,
}) => {
    try {
        if (!user_id || !phone_number || !first_name || !last_name || !password || !address || !email) {
            return { success: false, message: 'All fields are required.' };
        }
        const { rowCount } = await pool.query(
            `UPDATE Users 
             SET phone_number = $2, 
                 first_name = $3, 
                 last_name = $4, 
                 password = $5, 
                 address = $6, 
                 email = $7
             WHERE user_id = $1 RETURNING *`,
            [user_id, phone_number, first_name, last_name, password, address, email]
        );
        if (rowCount === 0) {
            return { success: false, message: `No user found with user_id: ${user_id}` };
        }

        return { success: true, message: 'User details updated successfully.' };
    } catch (error) {
        console.error('Error updating user details:', error.message);
        if (error.code === '23505') {
            return {
                success: false,
                message: 'Duplicate value found for a unique field (e.g., email or phone number).',
            };
        }

        throw new Error('Error updating user details: ' + error.message);
    }
};

export const getAllUserDetails = async (user_id) => {
     try{
        const result = await pool.query(`SELECT * FROM USers WHERE user_id =$1`,user_id);
        if (rowCount === 0) {
            return { success: false, message: `No user found with user_id: ${user_id}` };
        }
        return result.rows[0];
     }
     catch(error){
        throw new Error('Error updating user details: ' + error.message);
     }
}