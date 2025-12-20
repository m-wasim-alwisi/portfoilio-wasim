// lib/mysql.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12812517',
  password: 'Hgs2aiQXs9',
  database: 'sql12812517',
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306, // Added this line
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
