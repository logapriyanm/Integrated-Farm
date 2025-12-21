import express from "express";
import { registerUser, loginUser } from '../controllers/userController.js';


const userRouter = express.Router();

// Public routes
userRouter.post('/signup', registerUser);
userRouter.post("/login", loginUser);



export default userRouter;