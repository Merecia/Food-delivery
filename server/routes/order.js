import express from 'express';
import { 
    create, 
} from '../controllers/OrderController.js';

const orderRouter = express.Router();

orderRouter.post('/', create);

export default orderRouter;