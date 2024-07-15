import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import postRouter from './postRoutes';
import connection from './db';
import dotenv from 'dotenv';

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


connection
    .then(() => {
        app.listen(PORT, () => {
            //console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        // console.error('Failed to connect to the database:', err.message);
        process.exit(1);
    });
