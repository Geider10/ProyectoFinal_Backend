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
                const cart = await this.cart.addCart()
                const newUser = {
                    ...user,
                    password : await encryptPassword(user.password),
                    cartId : cart._id
                }
                await this.user.addUser(newUser)
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