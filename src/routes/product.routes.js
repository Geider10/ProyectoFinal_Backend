import { Router } from "express"
import {ProductController} from '../controllers/product.controller.js';
import {checkRol} from '../middlewares/checkRol.js';
export const productRouter = Router()
const productControll = new ProductController()

productRouter.get("/", productControll.getProducts)
productRouter.get("/:id",checkRol('user'), productControll.getProductById)
productRouter.post("/",checkRol('admin'), productControll.addProduct)
productRouter.put("/:id",checkRol('admin'), productControll.updateProduct)
productRouter.delete("/:id",checkRol('admin'), productControll.deleteProduct)
    
