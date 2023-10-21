import express from 'express';
import { 
    create, 
    getAll, 
    getById, 
    getOrdersOfUser, 
    remove, 
    update 
} from '../controllers/OrderController.js';
import { 
    isAnyAuthorizedUser, 
    isAdmin, 
    isSpecificUser 
} from '../controllers/VerifyTokenController.js';

const orderRouter = express.Router();

orderRouter.post('/', isAnyAuthorizedUser, create);
orderRouter.get('/:id/user', isSpecificUser, getOrdersOfUser);
orderRouter.get('/', isAdmin, getAll);
orderRouter.get('/:id', isAdmin, getById);
orderRouter.delete('/:id', isAdmin, remove);
orderRouter.put('/:id', isAdmin, update);

export default orderRouter;