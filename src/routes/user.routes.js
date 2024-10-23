import {Router} from 'express';
import passport from 'passport';
import {UserController} from '../controllers/user.controller.js';

export const userRouter = Router()
const userControll = new UserController()
userRouter.post('/register',userControll.register)
userRouter.post('/login',userControll.login)
userRouter.get('/protected',passport.authenticate('jwt'),userControll.getProfile)