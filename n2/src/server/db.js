import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres', // Replace with your PostgreSQL username
    host: 'localhost', // Change if your DB is hosted elsewhere
    database: 'ecommercedb', // Replace with your database name
    password: 'fast', // Replace with your PostgreSQL password
    port: 5432, // Default PostgreSQL port
  });
  
  export default pool;