import React from 'react';
import ReactDOM from 'react-dom/client'; // Change this import
import App from './App';

// Get the root element from the HTML file
const rootElement = document.getElementById('root');

// Create the root and render the App component
ReactDOM.createRoot(rootElement).render(<App />);
