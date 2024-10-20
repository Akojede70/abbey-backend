// db.ts
import { Pool } from 'pg';
import { AggregateError } from 'sequelize';

// Create a new pool instance
const pool = new Pool({
  user: 'postgres',         // PostgreSQL username
  host: '127.0.0.1',             // Database host (use your cloud provider's host if applicable)
  database: 'SocialDB', // Database name
  password: '147369',      // PostgreSQL password
  port: 3000,                     // Default PostgreSQL port
  connectionTimeoutMillis: 5000 
});

// Function to test the connection
const connectDB = async (): Promise<void> => {
    try {
      await pool.connect();
      console.log('Connected to PostgreSQL');
    } catch (err) {
      console.error('Connection error:', err); // Log the full error object
      if (err instanceof AggregateError) {
        err.errors.forEach((e: Error) => {
          console.error('Detailed error:', e.message);
        });
      }
    }
  };

export { pool, connectDB };
