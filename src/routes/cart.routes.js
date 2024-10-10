import { Router } from "express"
import {CartController}  from "../controllers/cart.controller.js"
export const cartRouter= Router()
const cartControll = new CartController()

cartRouter.get("/",cartControll.getCarts)
cartRouter.get("/:cId",cartControll.getCartById)
cartRouter.post("/",cartControll.addCart)
cartRouter.post("/:cId/product/:pId",cartControll.addProductAtCart)
cartRouter.put("/:cId",cartControll.updateProductsAtCart)
cartRouter.delete("/:cId",cartControll.deleteProducts)
cartRouter.delete("/:cId/product/:pId",cartControll.deleteProductAtCart)
