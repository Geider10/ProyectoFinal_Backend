import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const collection = "products"

const schema = mongoose.Schema({
    name: {type : String},
    description: {type : String},
    code: {type : String, index: true},
    price: {type : Number},
    status: {type : Boolean},
    stock: {type : Number},
    category: {type : String},
    carts : {type: [{cartId : {type:mongoose.Schema.Types.ObjectId,ref:"carts"}}],default : []}
})
schema.plugin(mongoosePaginate)
const productModel = mongoose.model(collection, schema)

export default productModel
