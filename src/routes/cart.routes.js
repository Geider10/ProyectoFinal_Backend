import { Router } from "express"
import {CartController}  from "../controllers/cart.controller.js"
import {checkRol} from '../middlewares/checkRol.js';
export const cartRouter= Router()
const cartControll = new CartController()

cartRouter.get("/",cartControll.getCarts)
cartRouter.post("/",cartControll.addCart)
cartRouter.get("/:cId",checkRol('user'),cartControll.getCartById)
cartRouter.post("/:cId",checkRol('user'),cartControll.purchaseCart)
cartRouter.post("/:cId/product/:pId", checkRol('user'),cartControll.addProductAtCart)
cartRouter.put("/:cId", checkRol('user'),cartControll.updateProductsAtCart)
cartRouter.delete("/:cId", checkRol('user'),cartControll.deleteProducts)
cartRouter.delete("/:cId/product/:pId", checkRol('user'),cartControll.deleteProductAtCart)
