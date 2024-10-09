import { Router } from "express"
import {CartController}  from "../controllers/cart.controller.js"
export const cartRouter= Router()
const cartControll = new CartController()

cartRouter.get("/",cartControll.getCarts)
cartRouter.get("/:cid",cartControll.getCartById)
cartRouter.post("/",cartControll.addCart)
cartRouter.put("/:cid",cartControll.updateProductsAtCart)
cartRouter.post("/:cid/product/:pid",cartControll.addProductAtCart)
cartRouter.delete("/:cid",cartControll.deleteProducts)
cartRouter.delete("/:cid/product/:pid",cartControll.deleteProductAtCart)
