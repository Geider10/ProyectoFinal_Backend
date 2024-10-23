import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const schema = mongoose.Schema({
    name: {type : String, required : true},
    description: {type : String, required : true},
    code: {type : String, index: true, required : true},
    price: {type : Number, required : true},
    status: {type : Boolean, required : true},
    stock: {type : Number, required : true},
    category: {type : String, required : true}
})
schema.plugin(mongoosePaginate)//segmentar los productos para mostrarle al cliente
export const productModel = mongoose.model('products', schema)


