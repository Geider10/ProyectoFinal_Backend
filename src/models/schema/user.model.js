import mongoose from 'mongoose';    

const schema = mongoose.Schema({
    first_name : {type: String, required : true},
    last_name : {type: String, required : true},
    age: {type: Number, required : true},
    email : {type: String, required : true, unique: true},
    password : {type: String, required : true},
    rol : {type:String, required : true, default:'user'}
})

export const userModel = mongoose.model('users',schema)