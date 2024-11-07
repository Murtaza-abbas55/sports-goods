import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js'; // Import product routes
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(express.json()); // Parse JSON bodies

// Serve static files from the dist directory (adjust this path as needed)

// Use the product routes
app.use('/api/products', productRoutes);

// Serve the index.html file for all other routes (CSR)
app.get('*', (req, res) => {
    res.send('Welcome to the Products API');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
