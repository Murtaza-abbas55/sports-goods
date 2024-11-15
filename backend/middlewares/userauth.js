import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET || '&Sports#$**';

export const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded.userId) {
            return res.status(403).json({ error: 'Access denied. Not an user.' });
        }
        
        req.userId = decoded.userId; 
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};
