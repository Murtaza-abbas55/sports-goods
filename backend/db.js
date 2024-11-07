import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres', // Replace with your PostgreSQL username
    host: 'junction.proxy.rlwy.net', // Change if your DB is hosted elsewhere
    database: 'ecommerce-db', // Replace with your database name
    password: 'wUXWGsocIKPnoupiutZHWtgDmtneISWY', // Replace with your PostgreSQL password
    port: 32128, // Default PostgreSQL port
  });
  
  export default pool;