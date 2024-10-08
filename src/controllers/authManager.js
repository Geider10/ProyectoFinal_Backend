import { json } from 'express';
import { getUserByEmail,addUser} from '../models/user.dao.js';
import {encryptPassword, verifyPassword,generateToken} from '../utils.js';
export class AuthManager{
    async register(req,res) {
        try{
            const user = req.body
            const existsUser = await getUserByEmail(user.email)
            if(!existsUser){
                const newUser = {
                    ...user,
                    password : await encryptPassword(user.password)
                }
                await addUser(newUser)
                res.json({success: 'add new user in db'})
            }
            else{
                res.json({success: 'user already exists in db'})
            }
        }
        catch(e){
            res.json({error: e.message})
        }
    }
    async login(req,res){
        try{
            const {email, password} = req.body
            const user = await getUserByEmail(email)
            if(!user) return res.json({error: 'user not found'})
            const matchPassword = await verifyPassword(password, user.password)
            if(!matchPassword) return res.json({error: 'password not match with email'})
            const token = generateToken(user._id)
            if(!token) return res.json({error : 'not there is tokek'})
            res.header('Authorization',token).json({succes: 'login great!'})
            console.log(token);
        }
        catch(e){
            res.json({error: e.message}) 
        }
    }
}