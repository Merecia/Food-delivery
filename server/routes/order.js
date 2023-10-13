import express from 'express';
import { 
    create, 
    getAll,
    getById,
    getOrdersOfUser,
    remove,
    update
} from '../controllers/OrderController.js';

const orderRouter = express.Router();

orderRouter.get('/', getAll);
orderRouter.get('/:id', getById);
orderRouter.get('/:userId/user', getOrdersOfUser);
orderRouter.post('/', create);
orderRouter.delete('/:id', remove);
orderRouter.put('/:id', update);

export default orderRouter;