import mongoose from 'mongoose';

const schema = mongoose.Schema({
    password : {type: String, required : true},
    rol : {type:String, required : true},
    pets : {type: Array, default : []}
})

export const userFakerModel = mongoose.model('user_fackers',schema)