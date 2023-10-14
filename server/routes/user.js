import express from 'express';
import { 
    getAll,
    getById,
    getStats,
    remove,
    update
} from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.put('/:id', update);
userRouter.delete('/:id', remove);
userRouter.get('/', getAll);
userRouter.get('/find/:id', getById);
userRouter.get('/stats', getStats);

export default userRouter;