import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const createConnectionPool = async () => {
    try {
        const connection = await mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        await connection.getConnection();
        console.log('Database connected successfully');

        return connection;
    } catch (err) {
        console.error('Error connecting to the database:', err.message);
        throw new Error('Database connection failed');
    }
};

const connection = createConnectionPool();

export default connection;
