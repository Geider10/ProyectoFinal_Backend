import {encryptPassword, verifyPassword,generateToken} from '../utils.js';
import {UserService} from '../services/user.services.js';
import {CartService} from '../services/cart.services.js';
export class UserController{
    constructor(){
        this.user = new UserService()
        this.cart = new CartService()
    }
    register = async(req,res)=> {
        try{
            const user = req.body
            const existsUser = await this.user.getUserByEmail(user.email)
            if(!existsUser){
                const newUser = {
                    ...user,
                    password : await encryptPassword(user.password)
                }
                const resUser = await this.user.addUser(newUser)
                await this.cart.addCart({userId : resUser._id})
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
    login = async (req,res) => {
        try{
            const {email, password} = req.body
            const user = await this.user.getUserByEmail(email)
            if(!user) return res.json({error: 'user not found by email'})
            const matchPassword = await verifyPassword(password, user.password)
            if(!matchPassword) return res.json({error: 'password not match with email'})
            //create token && upload token by authorization
            const token = generateToken(user._id,user.rol)
            if(!token) return res.json({error : 'there is not token'})
            res.header('Authorization',token).json({succes: 'login great!'})
        }
        catch(e){
            res.json({error: e.message}) 
        }
    }
    getProfile = async(req,res)=>{
        try{
            const user = req.user
            res.json({succes:"request get of my profile", payload : user})
        }     
        catch(e){
            res.json({error : e})
        }   
    }
}