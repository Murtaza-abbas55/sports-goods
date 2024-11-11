import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import productRoutes from './routes/productRoutes.js';
import userauthRoutes from './routes/userAuthRoutes.js';
import adminauthRoutes from './routes/adminAuthRoutes.js' 
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use('/api/products', productRoutes);
app.use('/api/auth', userauthRoutes);
app.use('/api',adminauthRoutes);

app.get('*', (req, res) => {
    res.send('Welcome to the Products API');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
