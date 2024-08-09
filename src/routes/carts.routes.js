import { Router } from "express"
const router = Router()
import CartsManager from "../controllers/cartsManager.js"
import cartModel from "../models/cart.model.js"
const cm = new CartsManager()

router.get("/",async (req,res)=>{
    try{
        const carts = await cm.getCarts()
        console.log(carts);
        res.json({sucess : "great", payload : carts})
    }
    catch(error){
        res.json({error : "error", error})
    }
})
router.post("/",async (req,res)=>{
    try{
        const body = req.body
        await cm.addCart(body)
        res.status(201).json({succes : "post cart"})
    }
    catch(error){
        res.json({error : "error", error})
    }
})
router.get("/:cid", async (req,res)=>{
    try{     
        const id = req.params.cid
        const cart = await cm.getCartProducts(id)
        console.log(cart);
        res.json({sucess : "great", payload : cart})
    }
    catch(error){
        res.json({error : "error", error})
    }
})
router.post("/:cid/product/:pid", async (req,res)=>{
    try{
        const cId = req.params.cid
        const pId = req.params.pid
        await cm.addProductCart(cId,pId)
        res.json({sucess : "good"})
    }
    catch(error){
        res.json({error : "error"})
    }
})
router.delete("/:cid/product/:pid", async(req,res)=>{
    try{
        const cId = req.params.cid
        const pId = req.params.pid
        await cm.deleteProductCart(cId,pId)
        res.json({sucess: "good delete"})
    }
    catch(error){
        console.log(error);
    }
})
router.delete("/:cid",async (req,res)=>{
    try{
        const cId = req.params.cid
        await cm.deleteProducts(cId)
        res.json({sucess : "bien"})
    }
    catch(error){
        console.log(error);
    }
})

router.put("/:cid",async(req,res)=>{
    try{
        const cId = req.params.cid
        const products = req.body
        await cm.updateProducts(cId, products)
        res.json({sucess : "bien"})
    }
    catch(error){
        console.log(error);
    }

})

router.put("/:cid/product/:pid", async(req,res)=>{
    try{
        const cId = req.params.cid
        const pId = req.params.pid
        const quantity = req.body
        console.log(quantity);
        await cm.updateProductCart(cId,pId,quantity)
        res.json({succes: "good"})
    }
    catch(error){
        console.log(error);
    }
})
export default router
