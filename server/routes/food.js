import express from 'express';
import { 
    create, 
    getAll, 
    getByCategory, 
    getById,
    remove, 
    update 
} from '../controllers/FoodController.js';
import { isAdmin } from '../controllers/VerifyTokenController.js';

const foodRouter = express.Router();

foodRouter.get('/', getAll);
foodRouter.get('/:id', getById);
foodRouter.get('/:id/category', getByCategory);
foodRouter.post('/', isAdmin, create);
foodRouter.delete('/:id', isAdmin, remove);
foodRouter.put('/:id', isAdmin, update);

export default foodRouter;