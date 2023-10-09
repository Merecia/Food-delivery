import express from 'express';
import { payment } from '../controllers/PaymentController.js';

const paymentRouter = express.Router();

paymentRouter.post('/', payment);

export default paymentRouter;