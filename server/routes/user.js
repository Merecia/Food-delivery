import express from 'express';
import { 
    getAll, 
    getById, 
    getGeneralStats, 
    getStatsForDayOfMonth,
    getStatsForMonth,
    getStatsForYear,
    remove, 
    update
} from '../controllers/UserController.js';
import { 
    isAdmin, 
    isSpecificUser 
} from '../controllers/VerifyTokenController.js';

const userRouter = express.Router();

userRouter.put('/:id', isSpecificUser, update);
userRouter.get('/:id', isSpecificUser, getById); 
userRouter.get('/', isAdmin, getAll);
userRouter.delete('/:id', isAdmin, remove); 

userRouter.get('/stats/:dayOfMonth/dayOfMonth', isAdmin, getStatsForDayOfMonth);
userRouter.get('/stats/:month/month', isAdmin, getStatsForMonth);
userRouter.get('/stats/:year/year', isAdmin, getStatsForYear);
userRouter.get('/stats/general', isAdmin, getGeneralStats);

export default userRouter;