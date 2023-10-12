import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { 
    authRouter, 
    categoryRouter, 
    foodRouter,
    orderRouter,
    paymentRouter
} from './routes/index.js';

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
app.use('/food', foodRouter);
app.use('/orders', orderRouter);
app.use('/payment', paymentRouter);

app.listen(PORT, (error) => {
    if (error) console.log(error);
    else console.log(`Server is running on port ${PORT}`);
});