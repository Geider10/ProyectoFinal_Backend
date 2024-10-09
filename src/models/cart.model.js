import mongoose from 'mongoose';
//schema: definir los atributos
const schema = mongoose.Schema({
    products:{type: [{
        productId:{type:mongoose.Schema.Types.ObjectId,
        ref:"products"},
        quantity: {type:Number}
}], default : []}
})

export const cartModel = mongoose.model('carts',schema)
