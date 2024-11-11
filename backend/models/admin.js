// models/admin.js
import pool from '../db.js';
import bcrypt from 'bcryptjs';


export const findAdminByEmail = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM Admin WHERE email = $1', [email]);
        return result.rows[0];
    } catch (error) {
        console.error('Error finding admin by email:', error.message);
        throw error;
    }
};


export const createAdmin = async (admin_username, email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10); 
        const result = await pool.query(
            'INSERT INTO Admin (admin_username, email, password) VALUES ($1, $2, $3) RETURNING admin_username',
            [admin_username, email, hashedPassword]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating admin:', error.message);
        throw error;
    }
};

