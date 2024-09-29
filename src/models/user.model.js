import mongoose from 'mongoose';    

const schema = mongoose.Schema({
    first_name : {type: String},
    last_name : {type: String},
    email : {type: String},
    age: {type: Number},
    password : {type: String},
    cart : {type: [{cartId : {type:mongoose.Schema.Types.ObjectId,ref:"carts"}}],default : []},
    role : {type:String,default:'user'}
})

export const userModel = mongoose.model('users',schema)