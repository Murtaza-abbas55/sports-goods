import express from 'express';
import { StaticRouter } from 'react-router-dom/server';
import ReactDOMServer from 'react-dom/server';
import App from '../client/components/App';
import fs from 'fs';
import cors from 'cors';
import path from 'path';
//import pool from './db.js'; // Import the PostgreSQL pool
import productRoutes from './routes/productRoutes.js'; // Import product routes

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Serve static files
//app.use('/static', express.static('dist'));
app.use('/static', express.static(path.join(__dirname, '../dist')));
// Use the product routes
app.use('/api/products', productRoutes);

/**
 * Creates the React app and injects it into the HTML template.
 * 
 * @param {string} location - The URL location to render.
 * @return {Promise<string>} The HTML content with the rendered React app.
 */
const createReactApp = async (location) => {
    const reactApp = ReactDOMServer.renderToString(
        <StaticRouter location={location}>
            <App />
        </StaticRouter>
    );

    // Read the HTML template from the file system
    const html = await fs.promises.readFile(`${__dirname}/index.html`, 'utf-8');

    // Inject the rendered React app into the HTML template
    const reactHtml = html.replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`);

    return reactHtml;
};

// Handle all GET requests by rendering the React app server-side
app.get('*', async (req, res) => {
    try {
        const indexHtml = await createReactApp(req.url);
        res.status(200).send(indexHtml);
    } catch (error) {
        console.error('Error rendering React app:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
