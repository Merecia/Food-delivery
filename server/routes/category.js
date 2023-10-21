import express from 'express';
import { 
    create, 
    getAll, 
    getById, 
    remove, 
    update 
} from '../controllers/CategoryController.js';
import { isAdmin } from '../controllers/VerifyTokenController.js';

const categoryRouter = express.Router();

categoryRouter.get('/', getAll);
categoryRouter.get('/:id', getById);
categoryRouter.post('/', isAdmin, create); 
categoryRouter.delete('/:id', isAdmin, remove);
categoryRouter.put('/:id', isAdmin, update); 

export default categoryRouter;