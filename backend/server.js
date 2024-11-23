import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import productRoutes from './routes/productRoutes.js';
import userauthRoutes from './routes/userAuthRoutes.js';
import adminauthRoutes from './routes/adminAuthRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import saleRoutes from './routes/saleRoutes.js';
import newArrivalRoutes from './routes/newArrivalRoutes.js'
import trendingRoutes from './routes/TrendingRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import filterProductRoutes from './routes/filterProductRoutes.js'
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, 
  }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());

app.use('/images', express.static(path.join(__dirname, '../../frontend/public/images')));

app.use('/api/products', productRoutes);
app.use('/api/auth', userauthRoutes);
app.use('/api', adminauthRoutes);
app.use('/api',cartRoutes);
app.use('/api/order',orderRoutes);
app.use('/api',wishlistRoutes);
app.use('/api',reviewRoutes);
app.use('/api',saleRoutes);
app.use('/api',newArrivalRoutes);
app.use('/api',trendingRoutes);
app.use('/api',categoryRoutes);
app.use('/api',paymentRoutes);
app.use('/api',filterProductRoutes);
app.get('*', (req, res) => {
    res.send('Welcome to the Products API');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
