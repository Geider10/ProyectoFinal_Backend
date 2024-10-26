import mongoose from 'mongoose';
//schema: definir los atributo y populate entre cart y product
const schema = mongoose.Schema({
    products:{
        type: [{
            productId:{type:mongoose.Schema.Types.ObjectId, ref:"products"},
            total_quantity: {type:Number,default:1},
            total_price: {type:Number}
        }], default : []
    },
    userId :{ type: mongoose.Schema.Types.ObjectId, ref:'users'}
})
schema.pre('findOne',function(){
    this.populate('products.productId')//indicar el attribute del cart para poblar
})
export const cartModel = mongoose.model('carts',schema)
