import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './routes/auth.js';
import categoryRouter from './routes/category.js';

const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};

const PORT = process.env.PORT || 5000;

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connection to the database was successful');
    })
    .catch((error) => {
        console.log(`An error occurred while connecting to the database: ${error}`);
    });

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/categories', categoryRouter);

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }

    console.log(`Server is running on port ${PORT}`);
});