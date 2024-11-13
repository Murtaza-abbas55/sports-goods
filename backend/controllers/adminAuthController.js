// controllers/adminAuthController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { findAdminByEmail, createAdmin } from '../models/admin.js';

const JWT_SECRET = process.env.JWT_SECRET || '&Sports#$**';
export const adminSignup = async (req, res) => {
    const { admin_username, email, password } = req.body;

    try {
        const existingAdmin = await findAdminByEmail(email);
        if (existingAdmin) {
            return res.status(400).json({ error: 'Admin already exists' });
        }

        const admin = await createAdmin(admin_username, email, password);
        res.status(201).json({ message: 'Admin created successfully', admin });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'Error signing up admin' });
    }
};


export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await findAdminByEmail(email);
        if (!admin) {
            return res.status(400).json({ error: 'Admin not found' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect password' });
        }

        const token = jwt.sign({ adminUsername: admin.admin_username}, JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 3600000
        });
        res.status(200).json({
             isAdmin: true,
             isUser: false,
             admin_username: admin.admin_username,
             email: admin.email
        });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in admin' });
    }
};