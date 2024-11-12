import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url'; // Required to handle `import.meta.url` in ES modules
import cookieParser from 'cookie-parser';
import productRoutes from './routes/productRoutes.js';
import userauthRoutes from './routes/userAuthRoutes.js';
import adminauthRoutes from './routes/adminAuthRoutes.js';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
    origin: 'http://localhost:3000', // Replace this with your frontend URL if deployed
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // Enables cookies and authentication headers to be sent
  }));
// Convert `import.meta.url` to `__dirname` equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());

// Serve static images from the frontend/public/images directory
app.use('/images', express.static(path.join(__dirname, '../../frontend/public/images')));

app.use('/api/products', productRoutes);
app.use('/api/auth', userauthRoutes);
app.use('/api', adminauthRoutes);

app.get('*', (req, res) => {
    res.send('Welcome to the Products API');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
