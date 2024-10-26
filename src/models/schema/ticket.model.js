import mongoose from 'mongoose';

const schema = mongoose.Schema({
    code : {type: String,unique : true, required : true},
    purchaser_fullname : {type : String, required : true},
    purchaser_email : {type : String, required : true},
    purchase_datetime : {type : String, required : true},
    total_amount : {type:Number, default : 0, required : true}
})

export const ticketModel = mongoose.model('tickets',schema)