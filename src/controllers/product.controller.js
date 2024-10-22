import {ProductService} from '../services/product.services.js';
//las flechas no pierden el contexto del this
export class ProductController{
    constructor(){ 
        this.product = new ProductService()
    }
    getProducts = async (req,res) =>{
        try{
            const limit = parseInt(req.query.limit) || 10
            const page = parseInt(req.query.page) || 1
            const category = req.query.category 
            const products = await this.product.getProducts(limit, page, category)
            if(products.docs.length == 0) return res.json({error : 'there are not products'})
            res.json({success: 'request get of products', payload: products})
        }
        catch(e){
            res.json({error : e.message})
        } 
    }
    getProductById = async (req,res) => { 
        try{
            const id = req.params.id
            const product = await this.product.getProductById(id)
            if(!product) return res.json({error: 'product not found'})
            res.json({success: 'request get of product by id',payload : product})
        }
        catch(e){
            res.json({error : e.message})
        }
    }
    addProduct = async (req,res) => {
        try{
            const product = req.body
            const refreshProduct = {...product, status: true}
            //add seguro? lanza error si hay algun atributo vacio
            for(let key in refreshProduct){
                if(!refreshProduct[key]){
                    return res.json({error: 'product have some attribute empty'})
                }
            }
            await this.product.addProduct(refreshProduct)
            res.json({success : 'request post of product'})
        }
        catch(e){
            res.json({error: e.message})
        }
    }
    updateProduct = async (req,res) =>{
        try{
            const id = req.params.id
            const newProduct = req.body
            const product = await this.product.getProductById(id)
            //update seguro? si los atributos del newProduct coinciden con los del product
            for (const key in product) {
                if(newProduct.hasOwnProperty(key)) {
                    product[key] = newProduct[key]
                }
            }
            const updateProduct = await this.product.updateProduct(id,product)
            res.json({success: 'request put of product',payload : updateProduct})
        }
        catch(e){
            res.json({error: e.message})
        }
    }
    deleteProduct = async (req,res)=>{
        try{
            const id = req.params.id
            await this.product.deleteProduct(id)
            res.json({success: 'request delete of product'})
        }
        catch(e){
            res.json({error: e.message})
        }
    }
}