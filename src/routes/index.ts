import { Router } from "express";
import userRouter from './user';
import todosRouter from './todos';
const router = Router();

router.get('/',(req, res) => {
    res.json({
        msg: "Welcome to api!"
    })
})
router.use('/user', userRouter);
router.use('/todos',todosRouter);

export default router;