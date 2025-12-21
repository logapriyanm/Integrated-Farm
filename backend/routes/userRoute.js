import express from "express";
import { registerUser, loginUser } from '../controllers/userController.js';


const userRouter = express.Router();

// Public routes
userRouter.post('/signup', registerUser);
userRouter.post("/login", (req, res, next) => {
  console.log("🔥 /api/user/login ROUTE HIT");
  next();
}, loginUser);



export default userRouter;