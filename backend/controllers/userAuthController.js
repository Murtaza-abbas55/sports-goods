import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { findUserByEmail, createUser } from '../models/Users.js';

const JWT_SECRET = process.env.JWT_SECRET || '&Sports#$**'; // Use environment variable for security

export const signup = async (req, res) => {
    const { user_id, phone_number, first_name, last_name, password, address, email } = req.body;

    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const user = await createUser(user_id, phone_number, first_name, last_name, password, address, email);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Error signing up user' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect password' });
        }

        const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in user' });
    }
};
