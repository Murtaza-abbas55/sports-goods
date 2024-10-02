import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to handle JSON requests and CORS
 // Enable Cross-Origin requests

// Create a PostgreSQL pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.get('/', (req, res) => {
  res.send('Welcome to the Products API');
});

// Endpoint to get all products
app.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Product');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to add a new product, including product_id
app.post('/api/products', async (req, res) => {
    const { product_id, product_name, description, price, stock_quantity, category_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Product (product_id, product_name, description, price, stock_quantity, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [product_id, product_name, description, price, stock_quantity, category_id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
