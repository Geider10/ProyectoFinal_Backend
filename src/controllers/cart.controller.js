import {CartService} from '../services/cart.services.js';
import {ProductService} from '../services/product.services.js';
export class CartController{
    constructor(){
        this.cart = new CartService()
        this.product = new ProductService()
    }
    getCarts= async(req,res)=>{
        try{
            const carts = await this.cart.getCarts()
            if(!carts) return res.json({error : 'there not carts'})
            res.json({success: 'request get of all carts',payload: carts})
        }
        catch(e){
            res.json({error : e.message})
        }
    }
    getCartById= async(req,res)=>{
        try{
            const id = req.params.cId
            const cart = await this.cart.getCartById(id)
            if(!cart) return res.json({error : 'cart not found'})
            res.json({success: 'request get of one cart', payload: cart})

        }
        catch(e){
            res.json({error: e.message})
        }
    }
    addCart= async(req,res)=>{
        try{
            const cart = req.body
            await this.cart.addCart(cart)
            res.json({success:'request post of cart'})
        }
        catch(e){
            res.json({error:e.message})
        }
    }
    addProductAtCart= async(req,res)=>{
        try{
            const cartId = req.params.cId
            const productId = req.params.pId
            const cart = await this.cart.getCartById(cartId)
            if(!cart) return res.json({error: 'cart no found'})
            const productExist = cart.products.some(pro => pro.productId._id == productId)
            const product = await this.product.getProductById(productId)
            if(productExist){//increment the product
                cart.products = cart.products.map(p => {
                    if(p.productId._id == productId){
                        let quantityTotal = p.quantity + 1
                        let priceTotal = quantityTotal * product.precio
                        console.log(quantityTotal,priceTotal);
                        return {...p, quantity: quantityTotal ,total : priceTotal}//spred operator: refresh attribute 
                    }
                    return p
                })
            }
            else{//add product in the cart,{solo acepta atributos del schema products}
                cart.products.push({productId: productId,quantity : 1, total : product.precio})
            }
            const newCart = await this.cart.updateContentAtCart(cartId,cart)//solo acepta cart como argumento
            res.json({success:'request post add/increment product inside cart',payload : newCart})
        }
        catch (e){
            res.json({error:e.message})
        }
    }
    updateProductsAtCart= async(req,res)=>{
        try{
            const cartId = req.params.cId
            const productId = req.params.pId
            const isIncrement = req.body
            const cart = await this.cart.getCartById(cartId)
            if(!cart) return res.json({error : 'cart not found'})
            if (isIncrement){

            }
            else{

            }
            const newCart = await this.cart.updateContentAtCart(cartId,productsCart)
            res.json({success: 'request update of products in cart',payload : newCart})
        }
        catch(e){
            res.json({error : e.message})
        }
    }
    purchaseCart = async(req,res)=>{
        try {
            const idCart = req.params.cId
            const cart = await this.cart.getCartById(idCart)
            if(!cart) return res.json({error : 'cart not found'})
            console.log(cart.products[0].productId)
        } catch (e) {
            res.json({error : e.message})
        }
    }
    //opcional no se usa en las web
    deleteProducts= async(req,res)=>{
        try{
            const cartId = req.params.cId
            const newCart = await this.cart.updateContentAtCart(cartId, {products:[]})
            res.json({success : 'request delete all products of cart',payload: newCart})
        }
        catch(e){
            res.json({error: e.message})
        }
    }
    deleteProductAtCart= async(req,res)=>{
        try{
            const cartId = req.params.cId
            const productId = req.params.pId
            const cart = await this.cart.getCartById(cartId)
            const filterProductId=  cart.products.filter(p => p.productId != productId)
            const newCart = await this.cart.updateContentAtCart(cartId, {products: filterProductId})
            res.json({success: 'request delete one product of cart',payload : newCart})
        }
        catch(e){
            res.json({error: e.message})
        }
    }
    
}