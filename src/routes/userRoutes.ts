import express from 'express';
import { validateData } from "../middleware/validationMiddleware";
import { userLoginSchema } from "../schemas/userSchema";

const userRouter = express.Router()

import { registerUser, loginUser } from "../controllers/userController";

userRouter.post('/register', registerUser)

userRouter.post('/login', validateData(userLoginSchema), loginUser)

export default userRouter