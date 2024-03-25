import { Router } from "express";
import { deleteUser, insertUser, updateUser } from "../controllers/user";
const router = Router();

router.post('/signup',async (req, res) => {
    try {
        const {username, password, firstName, lastName} = req.body;
        const response = await insertUser({username, password,firstName,lastName});
        res.json(response);
    }
    catch(e){
        res.status(500).json({
            error: 'Internal Server Error!'
        });
        console.error(e);
    }
});

router.put('/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const {firstName, lastName} = req.body;
        const response = await updateUser(username, {firstName, lastName});
        res.json({
            msg: "User updated Successfully!",
            response
        });
    }
    catch(e){
        res.status(500).json({
            error: 'Internal Server Error!'
        });
        console.error(e);
    }
});

router.delete('/:username',async (req,res) => {
    try {
        const username = req.params.username;
        const user = await deleteUser(username);
        res.json({
            msg: `User  ${user.username} has been deleted`,
            user
        });
    }
    catch(e){
        res.status(500).json({
            error: 'Internal Server Error!'
        });
        console.error(e);
    }
})

export default router;