import express from "express"
import { savePost,getUser,getUsers, updateUser,deleteUser } from "../controller/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";


const router=express.Router();

router.get('/',getUsers)
router.get('/:id',verifyToken,getUser)
router.put('/:id',verifyToken,updateUser)
router.delete('/:id',verifyToken,deleteUser)
router.post("/save",verifyToken,savePost)

export default router