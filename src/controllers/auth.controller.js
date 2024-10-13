import {encryptPassword, verifyPassword,generateToken} from '../utils.js';
import {UserService} from '../services/user.services.js';
export class AuthController{
    constructor(){
        this.user = new UserService()
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
}