import { Router } from "express";
import {getProfile, login, signup, updateUser} from "../controllers/user";
import authMiddleware from "../middlewares/auth";
const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/', authMiddleware, getProfile);
router.put('/', authMiddleware, updateUser);

export default router;  