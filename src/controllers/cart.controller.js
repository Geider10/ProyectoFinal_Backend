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
            const id = req.params.id
            //hace referencia a un product por ID de la colleccion products, dentro del cart
            // const cart = await cartModel.find({_id:id}).populate("products.productId")
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
            const cart = req.body
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
                const productExist = cart.products.some(p => p.productId == productId)
                if(productExist){//increment the product
                    cart.products.map(p => {
                        if(p.productId == productId){
                            const updateProduct = {...p, quantity: p.quantity++}
                            return {...p, ...updateProduct}//replace: first old product, next new product
                        }
                        return p
                    })
                    const newCart = await cartDao.updateContentAtCart(cartId, cart)
                    res.json({success:'request post incremente product inside cart',payload : newCart})
                }
                else{//create new product in the cart
                    //{solo acepta los atributos definidos en el schema products []}
                    cart.products.push({productId: productId,quantity : 1})
                    const newCart = await cartDao.updateContentAtCart(cartId,cart)//solo acepta cart como argumento
                    res.json({success:'request post new product inside cart',payload : newCart})
                }
            }
        }
        catch (e){
            res.json({error:e.message})
        }
    }
    async deleteProducts(req,res){
        try{
            const cartId = req.params.cId
            const newCart = await cartDao.updateContentAtCart(cartId, {_id:cartId,products:[]})
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
            const newCart = await cartDao.updateContentAtCart(cartId, {_id: cid, products: filterProductId})
            res.json({success: 'request delete one product of cart',payload : newCart})
        }
        catch(e){
            res.json({error: e.message})
        }
    }
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
}