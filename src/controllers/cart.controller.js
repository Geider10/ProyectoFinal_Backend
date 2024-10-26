import {CartService} from '../services/cart.services.js';
import {ProductService} from '../services/product.services.js';
import {TicketService} from '../services/ticket.services.js';   
import crypto from 'node:crypto';
export class CartController{
    constructor(){
        this.cart = new CartService()
        this.product = new ProductService()
        this.ticket = new TicketService()
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
            const productExist = cart.products.some(pro => pro.productId._id == productId)
            const product = await this.product.getProductById(productId)
            if(productExist){//increment the product
                cart.products = cart.products.map(p => {
                    if(p.productId._id == productId){
                        let quantityTotal = p.quantity + 1
                        let priceTotal = quantityTotal * product.precio
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
            const productId = req.params.pId//get by params of cart.products.productId._id
            const {isIncrement} = req.body
            const cart = await this.cart.getCartById(cartId)
            const product = await this.product.getProductById(productId)
            cart.products = cart.products.map( pro =>{
                if(pro.productId._id == productId){
                    const updatedQuantity = isIncrement ? pro.quantity + 1: pro.quantity - 1
                    if(updatedQuantity < 1) return pro
                    const updatedTotal = updatedQuantity * product.precio
                    return {...pro,quantity : updatedQuantity, total : updatedTotal}
                }
                return pro
            })
            const newCart = await this.cart.updateContentAtCart(cartId,cart)
            res.json({success: 'request put of quantity product',payload : newCart})
        }
        catch(e){
            res.json({error : e.message})
        }
    }
    purchaseCart = async(req,res)=>{
        try {
            const cartId = req.params.cId
            const cart = await this.cart.getCartById(cartId)
            const notListPurchase = cart.products.filter(pro => pro.quantity > pro.productId.stock)
            const listPurchase = cart.products.filter(pro => pro.quantity <= pro.productId.stock)
            //update stock and content of cart
            for (const product of listPurchase) {
                const updateStock = product.productId.stock - product.quantity
                await this.product.updateProduct(product.productId._id,{stock: updateStock})
            }
            await this.cart.updateContentAtCart(cartId,{products : notListPurchase})
            //generate ticket
            console.log(listPurchase);
            const amountPurchase = listPurchase.reduce((acc,current)=> acc + current.total,0)
            const date = new Date()
            const dateTime = date.getDate().toString() + '/' + (date.getMonth()+1).toString() + '/' + date.getFullYear().toString() 
            const ticketSchema = {
                code : crypto.randomUUID(),
                purchase_datetime : dateTime,
                purchaser_name : "my name",
                purchaser_email : "my addres email",
                amount : amountPurchase
            }
            await this.ticket.addTicket(ticketSchema)
            res.json({success : 'req post of purchase & update stock', payload : ticketSchema})
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