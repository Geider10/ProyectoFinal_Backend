import persistence from '../models/persistence.js';
const {cartDao} = persistence
export class CartService{
    constructor(){
        this.cart = cartDao
    }
    async getCarts(){
        try {
            const carts = await this.cart.getCarts()
            return carts
        } catch (e) {
            throw new Error(e)
        }
    }
    async getCartById(id){
        try {
            const cart = await this.cart.getCartById(id)
            return cart
        } catch (e) {
            throw new Error(e)
        }
    }
    async addCart(cart){
        try {
            await this.cart.addCart(cart)
        } catch (e) {
            throw new Error(e)
        }
    }
    async updateContentAtCart(id,cart){
        try {
            const newCart = await this.cart.updateContentAtCart(id,cart)
            return newCart
        } catch (e) {
            throw new Error(e)
        }
    }
}