import {Router} from 'express';
import {userRouter} from './user.routes.js';
import {productRouter} from './product.routes.js';
import {cartRouter} from './cart.routes.js';
import {passportCall} from '../passport/passportCall.js';
export const mainRouter = Router()
//need auth and permissions to run endpoints
mainRouter.use('/user',userRouter)
mainRouter.use('/product',passportCall('jwt'),productRouter)
mainRouter.use('/cart',passportCall('jwt'),cartRouter)