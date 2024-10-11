import {CartDao} from '../models/cart.dao.js';
const cartDao = new CartDao()

export class CartController{
    async getCarts(req,res){
        try{
            const carts = await cartDao.getCarts()
            if(!carts) return res.json({error : 'there not carts'})
            res.json({success: 'request get of all carts',payload: carts})
        }
        catch(e){
            res.json({error : e.message})
        }
    }
    async getCartById(req,res){
        try{
            //hace referencia a un product por ID de la colleccion products, dentro del cart
            // const cart = await cartModel.find({_id:id}).populate("products.productId")
            const id = req.params.cId
            const cart = await cartDao.getCartById(id)
            if(!cart) return res.json({error : 'cart not found'})
            res.json({success: 'request get of one cart', payload: cart})
        }
        catch(e){
            res.json({error: e.message})
        }
    }
    async addCart(req,res){
        try{
            const cart = req.body//empty
            await cartDao.addCart(cart)
            res.json({success:'request post of cart'})
        }
        catch(e){
            res.json({error:e.message})
        }
    }
    async addProductAtCart(req,res){
        try{
            const cartId = req.params.cId
            const productId = req.params.pId
            const cart = await cartDao.getCartById(cartId)
            if(cart){
                const productExist = cart.products.some(pro => pro.productId._id == productId)
                console.log(productExist);
                if(productExist){//increment the product
                    cart.products.map(p => {
                        if(p.productId._id == productId){
                            return {...p, quantity: p.quantity++}//spred operator: refresh attribute 
                        }
                        return p
                    })
                    const newCart = await cartDao.updateContentAtCart(cartId, cart)
                    res.json({success:'request post increment product inside cart',payload : newCart})
                }
                else{//add product in the cart
                    //{solo acepta atributos del schema products}
                    cart.products.push({productId: productId,quantity : 1})
                    const newCart = await cartDao.updateContentAtCart(cartId,cart)//solo acepta cart como argumento
                    res.json({success:'request post add product inside cart',payload : newCart})
                }
            }
        }
        catch (e){
            res.json({error:e.message})
        }
    }
    //dudoso, enpoint de +/- la cantidad de un producto
    async updateProductsAtCart(req,res){
        try{
            const cartId = req.params.cId
            const productsCart = req.body
            const newCart = await cartDao.updateContentAtCart(cartId,productsCart)
            res.json({success: 'request update of products in cart',payload : newCart})
        }
        catch(e){
            res.json({error : e.message})
        }
    }
    //opcional no se usa en las web
    async deleteProducts(req,res){
        try{
            const cartId = req.params.cId
            const newCart = await cartDao.updateContentAtCart(cartId, {products:[]})
            res.json({success : 'request delete all products of cart',payload: newCart})
        }
        catch(e){
            res.json({error: e.message})
        }
    }
    async deleteProductAtCart(req,res){
        try{
            const cartId = req.params.cId
            const productId = req.params.pId
            const cart = await cartDao.getCartById(cartId)
            const filterProductId=  cart.products.filter(p => p.productId != productId)
            const newCart = await cartDao.updateContentAtCart(cartId, {products: filterProductId})
            res.json({success: 'request delete one product of cart',payload : newCart})
        }
        catch(e){
            res.json({error: e.message})
        }
    }
    
}