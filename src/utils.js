import { dirname } from "node:path"
import {fileURLToPath} from "node:url"
export const __dirname = dirname(fileURLToPath(import.meta.url))

import dotenv from 'dotenv';
dotenv.config()

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const encryptPassword = async(password) =>{
    try{
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)
        return hashPassword
    }
    catch(e){
        throw new Error('error encrypt password')
    }
}
export const verifyPassword = async(password,hashPassword) =>{
    try{
        const match = await bcrypt.compare(password,hashPassword)
        return match
    }
    catch(e){
        throw new Error('error verify password')
    }
}
export const generateToken = (idUser) =>{
    const token = jwt.sign({id: idUser}, process.env.SECRET_KEY,{
        expiresIn : '30m'
    })
    return token
}