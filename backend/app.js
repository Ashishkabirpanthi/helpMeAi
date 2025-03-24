import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRoutes from './routes/user.router.js';
import projectRoutes from './routes/project.router.js';
import aiRoutes from './routes/ai.router.js';
import morgan from 'morgan';
import connect from './db/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'


connect();

const app = express();
app.use(morgan('dev'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/users', userRoutes);
app.use('/project', projectRoutes);
app.use('/ai', aiRoutes);


app.get('/', (res) =>{
    res.send("hello world!");
});

export default app;