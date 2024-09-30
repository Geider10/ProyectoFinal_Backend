import {Router} from 'express';
import {passportCall} from '../passport/passportCall.js';
import {UserManager} from '../controllers/userManager.js';
export const userRouter = Router()
const um = new UserManager()

userRouter.get('/protected',passportCall('jwt'),um.getProfileUser)