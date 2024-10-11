import {ProductDao} from '../models/product.dao.js';
const productDao = new ProductDao()
export class ProductController{
    async getProducts(req,res){
        try{
            const limit = parseInt(req.query.limit) || 10
            const page = parseInt(req.query.page) || 1
            const category = req.query.category 
            const products = await productDao.getProducts(limit, page, category)
            if(products.docs.length == 0) return res.json({error : 'there are not products'})
            res.json({success: 'request get of products', payload: products})
        }
        catch(e){
            res.json({error : e.message})
        } 
    }
    async getProductById(req,res){ 
        try{
            const id = req.params.id
            const product = await productDao.getProductById(id)
            if(!product) return res.json({error: 'user not found'})
            res.json({success: 'request get of product by id',payload : product})
        }
        catch(e){
            res.json({error : e.message})
        }
    }
    async addProduct(req,res){
        try{
            const product = req.body
            const refreshProduct = {...product, status: true}
            //lanza error si hay algun atributo vacio
            for(let key in refreshProduct){
                if(!refreshProduct[key]){
                    return res.json({error: 'product have some attribute empty'})
                }
            }
            await productDao.addProduct(refreshProduct)
            res.json({success : 'request post of product'})
        }
        catch(e){
            res.json({error: e.message})
        }
    }
    async updateProduct(req,res){
        try{
            const id = req.params.id
            let newProduct = req.body
            let product = await productDao.getProductById(id)
            //product actualiza solo los atributos que coincidan
            for (const key in newProduct) {
                if(product.hasOwnProperty(key)) {
                    product[key] = newProduct[key]
                    console.log(product[key])
                }
            }   
            await product.save()
            // const p = await productDao.updateProduct(id,product)
            // console.log(p);
            res.json({success: 'request put of product'})
        }
        catch(e){
            res.json({error: e.message})
        }
    }
    async deleteProduct(req,res){
        try{
            const id = req.params.id
            await productDao.deleteProduct(id)
            res.json({success: 'request delete of product'})
        }
        catch{
            res.json({error: e.message})
        }
    }
}