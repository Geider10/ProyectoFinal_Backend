import {Router} from 'express';
import {passportCall} from '../passport/passportCall.js';
import {UserController} from '../controllers/user.controller.js';

export const userRouter = Router()
const userControll = new UserController()
userRouter.post('/register',userControll.register)
userRouter.post('/login',userControll.login)
userRouter.get('/protected',passportCall('current'),userControll.getProfile)