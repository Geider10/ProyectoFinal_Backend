import { dirname } from "node:path"
import {fileURLToPath} from "node:url"
export const __dirname = dirname(fileURLToPath(import.meta.url))

import 'dotenv/config'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {createTransport} from 'nodemailer';
import { faker } from '@faker-js/faker';
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
export const generateToken = (idUser,rolUser) =>{
    const token = jwt.sign({id: idUser, rol: rolUser}, process.env.SECRET_KEY,{
        expiresIn : '30m'
    })
    return token
}
export const sendEmail = async (dest,subject,html) => {
    const transporter = createTransport({
        service : 'gmail',
        port : 465,
        secure : true,
        auth : {
            user :process.env.EMAIL_ADMIN,
            pass : process.env.PASS_ADMIN
        }
    })
    const emailOption = {
        from : process.env.EMAIL_ADMIN,
        to : dest,
        subject : subject,
        html : html
    }
    try {
        const info = await transporter.sendMail(emailOption)
        console.log('send email', info);
        return info
    } catch (e) {
        throw new Error('error sending email')
    }
    
}
const randomRol = ()=>{
    const roles = ['user','admin']
    const valueRandom = Math.floor(Math.random() * roles.length)
    return roles[valueRandom]
}
export const createRandomUser = async ()=>{
    const pass = await encryptPassword('coder123')
    return{ 
        password : pass,
        rol : randomRol(),
        pets : []
    }
}
export const createPet = ()=>{
    return{
        name : faker.animal.petName(),
        specie : faker.animal.type(),
        adopted : false
    }
}