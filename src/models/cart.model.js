import mongoose from 'mongoose';
//products: definir los atributos de los objetos y pasar sus valores desde post. 
//products se crea solo sin definir por el cliente
const schema = mongoose.Schema({
    products:{type: [{
        productId:{type:mongoose.Schema.Types.ObjectId,
        ref:"products"},
        quantity: {type:Number}
}], default : []}
})

export const cartModel = mongoose.model('carts',schema)
