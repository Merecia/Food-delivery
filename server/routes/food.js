import express from 'express';
import { 
    create, 
    getAll, 
    getByCategory, 
    getById,
    remove, 
    update 
} from '../controllers/FoodController.js';

const foodRouter = express.Router();

foodRouter.get('/', getAll);
foodRouter.get('/:id', getById);
foodRouter.get('/:categoryId/category', getByCategory);
foodRouter.post('/', create);
foodRouter.delete('/:id', remove);
foodRouter.put('/:id', update);

export default foodRouter;