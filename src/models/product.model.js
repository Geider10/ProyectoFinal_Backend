import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const schema = mongoose.Schema({
    name: {type : String, require : true},
    description: {type : String, require : true},
    code: {type : String, index: true, require : true},
    price: {type : Number, require : true},
    status: {type : Boolean, require : true},
    stock: {type : Number, require : true},
    category: {type : String, require : true},
    carts : {
        type: Array,
        default : []}
})
schema.plugin(mongoosePaginate)//segmentar los productos para mostrar al cliente
export const productModel = mongoose.model('products', schema)


