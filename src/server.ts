import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import postRouter from './postRoutes';
import dotenv from 'dotenv';
import dbPromise from './couchbase';


dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

app.use('/posts', postRouter);


app.get('/posts', async (req, res, next) => {
    try {
        const { cluster, collection } = await dbPromise;
        const query = 'SELECT * FROM `travel-sample` WHERE type="post"';
        const result = await cluster.query(query);
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
});


// connection
//     .then(() => {
//         app.listen(PORT, () => {
//             //console.log(`Server is running on port ${PORT}`);
//         });
//     })
//     .catch((err) => {
//         // console.error('Failed to connect to the database:', err.message);
//         process.exit(1);
//     });
