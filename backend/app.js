import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRoutes from './routes/user.router.js';

import morgan from 'morgan';
import connect from './db/db.js';
import cookieParser from 'cookie-parser';

connect();

const app = express();
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/users', userRoutes);


app.get('/', (req, res) =>{
    res.send("hello world!");
});

export default app;