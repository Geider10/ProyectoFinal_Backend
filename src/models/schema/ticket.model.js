import mongoose from 'mongoose';

const schema = mongoose.Schema({
    code : {type: String,unique : true},
    purchase_datetime : {type : Date},
    amount : {type:Number, default : 0},
    purchaser : {type : String}
})

export const ticketModel = mongoose.model('tickets',schema)