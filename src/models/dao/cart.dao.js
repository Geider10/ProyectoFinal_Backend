import {cartModel} from '../schema/cart.model.js';

export class CartDao{
    async getCarts(){
        const carts = await cartModel.find({})
        return carts
    }
    async getCartById(id){
        const cart = await cartModel.findOne({_id : id})
        return cart
    }
    async addCart(cart){
        const newCart = await cartModel.create(cart)
        return newCart
    }
    //custom function for add, updates, deletes
    async updateContentAtCart(id, cart){
        const updateCart = await cartModel.updateOne({_id:id},{$set : cart})
        return updateCart
    }
}