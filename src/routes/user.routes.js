import {Router} from 'express';
import {UserController} from '../controllers/user.controller.js';
import {checkRol} from '../middlewares/checkRol.js';
import {validateUser} from '../middlewares/validateReq.js';
export const userRouter = Router()
const userControll = new UserController()

userRouter.post('/register',validateUser,userControll.register)
userRouter.post('/login',userControll.login)
userRouter.get('/protected',checkRol('user'),userControll.getProfile)