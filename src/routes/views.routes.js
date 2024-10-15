import {Router} from "express"
export const viewRouter = Router()

viewRouter.get('/',(req,res)=>{
    res.render('index')
})
viewRouter.get('api/product/',(req,res)=>{
    const response = res
    console.log(response);
    res.render('products')
})
// viewRouter.get("/products",async(req,res)=>{
//     const limit = parseInt(req.query.limit) || 5
//     const page = parseInt(req.query.page) || 1
//     const sort = parseInt(req.query.sort)
//     const category = req.query.category

//     const products = await pm.getProducts(limit,page,sort,category)
//     //pasar mas query params al endpoint a parte del page
//     products.prevLink = products.hasPrevPage?`http://localhost:8080/api/view/products?page=${products.prevPage}&limit=${limit}`: ""
//     products.nextLink = products.hasNextPage?`http://localhost:8080/api/view/products?page=${products.nextPage}&limit=${limit}`: ""
//     //activa los eventos del handlebars
//     products.isValid = !(page<= 0 || page> products.totalPages)
//     res.render("paginateProducts",products)
// })
