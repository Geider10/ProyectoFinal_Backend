import cartModel from '../models/cart.model.js';
import ProductManager from "./productManager.js"
const pm = new ProductManager()

class CartsManager{
    constructor(){}
    getCarts(){
        const carts = cartModel.find()
        return carts
    }
    addCart(cart){
        cartModel.create(cart)
    }
    getCartProducts(id){
        //hace referencia a un product por ID de la colleccion products, dentro del cart
        const cart = cartModel.find({_id:id}).populate("products.productId")
        return cart
    }
    async addProductCart(cartId,productId){
        const c = await cartModel.find()//return a array
        const cart = c.find(c => c._id == cartId)//return object
        if(cart){
            const productsFilter = cart.products.some(p => p.productId == productId)
            console.log(productsFilter);
            if(productsFilter){//increment the product
                cart.products.map(p => {
                    if(p.productId == productId){
                        const product = {...p, quantity: p.quantity++}
                        return {...p, ...product}//replace: first old product, next new product
                    }
                    return p
                })
                const newCart = await cartModel.updateOne({_id:cartId},cart)
                console.log(newCart);
            }
            else{//create new product in the cart
                const productJson = await pm.get()
                const product = productJson.find(p => p._id == productId)
                if(product){
                    //{solo acepta los atributos definidos en el schema products []}
                    cart.products.push({productId: productId,quantity : 1})
                    const newCart = await cartModel.updateOne({_id:cartId},cart)//solo acepta cart como argumento
                    console.log(newCart);   
                }
                else{
                    console.log("there is no product");
                }
            }
        }
        else{
            console.log("there is no cart");
        }
    }

    async deleteProductCart(cid,pid){
        const c = await cartModel.find()
        const cart = c.find(c => c._id == cid)
        if(cart){
            const filterProduct=  cart.products.filter(p => p.productId != pid)
            const newCart = await cartModel.updateOne({_id:cid}, {_id: cid, products: filterProduct})
            console.log(newCart);
        }
        else{
            console.log("there are not cart!!!");
        }
    }
    async deleteProducts(cid){
        const c = await cartModel.find()
        const cart = c.find(c => c._id == cid)
        if(cart){
            const newCart = await cartModel.updateOne({_id:cid}, {_id:cid,products:[]})
            console.log(newCart);
        }
        else{
            console.log("there are not cart");
        }
    }
    async updateProducts(cid,pro){
        const c = await cartModel.find()
        const cart = c.find(c => c._id == cid)
        if(cart){
            const newCart = await cartModel.updateOne({_id: cid},pro)
            console.log(newCart);
        }
        else{
            console.log("there are not cartt");
        }
    }
    async updateProductCart(cid,pid,qua){
        console.log(qua.quantity);
        const c = await cartModel.find()
        const cart = c.find(c => c._id == cid)
        if(cart){
            const product = cart.products.find(p => p.productId == pid)
            if(product){
                cart.products.map(p => {
                    if(p.productId == pid){
                        const newProduct= {...p,quantity:qua.quantity}
                        // console.log(newProduct);
                        return newProduct
                    }
                    return p
                })
                //{condition by id} , {cart: id + productsUpdate}
                const newCart = await cartModel.updateOne({_id : cid}, cart)
                console.log(newCart);
            }
            else{
                console.log("there are not product");
            }
        }
        else{
            console.log("there are not cart");
        }
    }
}
export default CartsManager