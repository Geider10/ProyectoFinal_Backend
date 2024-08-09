import { Router } from "express"
import ProductManager from "../controllers/productManager.js"
const router = Router()
const pm = new ProductManager()

router.get("/",async (req,res)=>{
    try{
        const limit = parseInt(req.query.limit) || 10
        const page = parseInt(req.query.page) || 1
        const sort = parseInt(req.query.sort)
        const category = req.query.category
        const products = await pm.getProducts(limit, page, sort, category)
        console.log(products);
        res.json({succes : "great get"})
    }
    catch(error){
        res.json({error :  error})
    }
   
})
router.get("/:id", async (req,res)=>{
    try{
        const id = req.params.id
        const product = await pm.getProductById(id)
        if(product){
            res.json(product)
        }
        else{
            res.status(404).json({error : "there is not product"})
        }
    }
    catch(error){
        res.json({succes : "error", error})
    }
   
})
router.post("/", async (req,res)=>{
    try{
        const body = req.body
        await pm.addProduct(body)
        res.json({succes : "great"})
    }
    catch(error){
        res.json({succes : "error", error})
    }
})
router.put("/:id", async (req,res)=>{
    try{
        const id = req.params.id
        const body = req.body
        const product = await pm.updateProduct(id, body)
        res.json({succes : "great",payload : product})
    }
    catch(error){
        res.json({succes : "error", error})
    }
})
router.delete("/:id", async (req,res)=>{
    try{
        const id = req.params.id
        const product = await pm.deleteProduct(id)
        res.json({succes : "great", payload : product})
    }
    catch(error){
        res.json({succes : "error", error})
    }
})
    
export default router
