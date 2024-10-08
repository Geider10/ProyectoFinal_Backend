import {Router} from 'express';
import {AuthController} from '../controllers/auth.controller.js';
export const authRouter = Router()
const authControll = new AuthController()

authRouter.post('/register',authControll.register)
authRouter.post('/login',authControll.login)