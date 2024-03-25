import { Router } from "express";
const userRouter = require('./user');
const todosRouter = require('./todos');
const router = Router();

router.use('/',(req, res) => {
    res.json({
        msg: "Welcome to api!"
    })
})
router.use('/user', userRouter);
router.use('/todos',todosRouter);

export default router;