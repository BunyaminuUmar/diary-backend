import { RequestHandler } from 'express';
import connection from './db';

export const getPosts: RequestHandler = async (req, res, next) => {
    try {
        const dt = req.params.date;
        const date = new Date(dt).toISOString().slice(0, 10);
        const conn = await connection;
        const [results] = await conn.query('SELECT * FROM posts WHERE date = ? ORDER BY votes DESC', [date]);
        res.json(results);
    } catch (err) {
        next(err);
    }
};


export const getPostsByDate: RequestHandler = async (req, res, next) => {
    try {
        const date = req.params.date;
        const conn = await connection;
        const [results] = await conn.query('SELECT * FROM posts WHERE date = ?', [date]);
        res.json(results);
    } catch (err) {
        next(err);
    }
};

export const addPost: RequestHandler = async (req, res, next) => {
    const { title, body } = req.body;
    const date = new Date().toISOString().slice(0, 10);

    const query = 'INSERT INTO posts (title, body, date) VALUES (?, ?, ?)';

    try {
        const conn = await connection;
        // console.log('Executing query:', query, 'with values:', [title, body, date]);
        const [results]: any = await conn.execute(query, [title, body, date]);
        const insertId = results.insertId;
        // console.log('Insert result:', results);
        res.status(201).json({ id: insertId });
    } catch (err) {
        console.error('Error inserting post:', err);
        next(err);
    }
};

export const upvotePost: RequestHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        const conn = await connection;
        const [results] = await conn.query('UPDATE posts SET votes = votes + 1 WHERE id = ?', [id]);
        res.json(results);
    } catch (err) {
        next(err);
    }
};
export const downvotePost: RequestHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        const conn = await connection;
        const [results] = await conn.query('UPDATE posts SET votes = votes - 1 WHERE id = ?', [id]);
        res.json(results);
    } catch (err) {
        next(err);
    }
};
