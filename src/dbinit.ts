import connection from './db';

const createPostsTable = `
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    date DATE NOT NULL,
    votes INT DEFAULT 0
);
`;

async function initializeDatabase() {
    try {
        const conn = await connection;
        await conn.query(createPostsTable);
        //console.log('Posts table created successfully.');
    } catch (err) {
        console.error('Error creating posts table:', err);
    }
}

initializeDatabase();
