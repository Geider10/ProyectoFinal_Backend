import mongoose from 'mongoose';
import { string } from 'zod';

const schema = mongoose.Schema({
    code : {type: String,unique : true, required : true},
    purchase_datetime : {type : String, required : true},
    purchaser_name : {type : String, required : true},
    purchaser_email : {type : String, required : true},
    amount : {type:Number, default : 0, required : true}
})

export const ticketModel = mongoose.model('tickets',schema)