// server/middlewares/adminauth.js
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET || '&Sports#$**';

export const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded.adminUsername) {
            return res.status(403).json({ error: 'Access denied. Not an admin.' });
        }
        
        req.adminUsername = decoded.adminUsername; 
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};
