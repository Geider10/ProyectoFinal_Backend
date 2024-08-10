import express from "express"
import ProductManager from "../controllers/productManager.js"

const router = express.Router()
const pm = new ProductManager()

//segun el endpoint rendersiza una vista u otra
router.get("/", async(req,res)=>{
    const products = await pm.get()
    res.render("home",products)
})
router.get("/realTimeProducts",(req,res)=>{
    res.render("realTimeProducts",{})
})
router.get("/products",async(req,res)=>{
    const limit = parseInt(req.query.limit) || 5
    const page = parseInt(req.query.page) || 1
    const sort = parseInt(req.query.sort)
    const category = req.query.category

    const products = await pm.getProducts(limit,page,sort,category)
    //pasar mas query params al endpoint a parte del page
    products.prevLink = products.hasPrevPage?`http://localhost:8080/products?page=${products.prevPage}&limit=${limit}`: ""
    products.nextLink = products.hasNextPage?`http://localhost:8080/products?page=${products.nextPage}&limit=${limit}`: ""
    //activa los eventos del handlebars
    products.isValid = !(page<= 0 || page> products.totalPages)
    res.render("paginateProducts",products)
  
})

export default router