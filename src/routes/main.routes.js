import {Router} from 'express';
import {userRouter} from './user.routes.js';
import {productRouter} from './product.routes.js';
import {cartRouter} from './cart.routes.js';
export const mainRouter = Router()

mainRouter.use('/user',userRouter)
mainRouter.use('/product',productRouter)
mainRouter.use('/cart',cartRouter)