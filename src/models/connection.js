import {connect} from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

export const initMongoDB = ()=>{
    connect(process.env.MONGO_URL)
    .then(() =>console.log('connection with mongo'))
    .catch(()=>console.log('error connect with db'))
}