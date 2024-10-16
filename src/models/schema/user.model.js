import mongoose from 'mongoose';    

const schema = mongoose.Schema({
    first_name : {type: String, require : true},
    last_name : {type: String, require : true},
    email : {type: String, require : true, unique: true},
    password : {type: String, require : true},
    age: {type: Number, require : true},
    role : {type:String,default:'user'},
    cartId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"carts"
    }
})

export const userModel = mongoose.model('users',schema)