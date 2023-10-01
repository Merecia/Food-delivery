import express from 'express';
import { 
    create, 
    getAll, 
    getById, 
    remove, 
    update 
} from '../controllers/CategoryController.js';

const categoryRouter = express.Router();

categoryRouter.get('/', getAll);
categoryRouter.get('/:id', getById);
categoryRouter.post('/', create);
categoryRouter.delete('/:id', remove);
categoryRouter.put('/:id', update);

export default categoryRouter;