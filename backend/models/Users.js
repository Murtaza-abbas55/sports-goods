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
