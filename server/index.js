import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }

    console.log(`Server is running on port ${PORT}`);
});