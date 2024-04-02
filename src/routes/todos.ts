import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { addTodos, deleteTodo, getTodos, searchTodos, updateTodo } from "../controllers/todos";
const router = Router();

router.get('/', authMiddleware, getTodos);
router.post('/add', authMiddleware, addTodos);
router.get('/search', authMiddleware, searchTodos);
router.put('/:id', authMiddleware, updateTodo);
router.delete('/:id', authMiddleware, deleteTodo);

export default router;