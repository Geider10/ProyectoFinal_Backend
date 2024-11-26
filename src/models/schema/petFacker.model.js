import mongoose from 'mongoose';

const schema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    specie:{
        type:String,
        required:true
    },
    adopted:{
        type:Boolean,
        default:false
    }
})

export const petFackerModel = mongoose.model('pet_fackers',schema)