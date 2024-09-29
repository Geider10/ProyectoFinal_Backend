import {Router} from 'express';
import {AuthManager} from '../controllers/authManager.js';
export const authRouter = Router()
const us = new AuthManager()

authRouter.post('/register',us.register)
authRouter.post('/login',us.login)