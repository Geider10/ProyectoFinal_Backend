import { Router } from "express"
import {ProductController} from '../controllers/product.controller.js';
export const productRouter = Router()
const productControll = new ProductController()

productRouter.get("/", productControll.getProducts)
productRouter.get("/:id", productControll.getProductById)
productRouter.post("/", productControll.addProduct)
productRouter.put("/:id", productControll.updateProduct)
productRouter.delete("/:id",productControll.deleteProduct)
    
