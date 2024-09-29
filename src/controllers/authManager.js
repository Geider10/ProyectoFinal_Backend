import {addUser} from '../models/user.dao.js';

export class AuthManager{
    async register(req,res) {
        try{
            const userBody = req.body
            const user = await addUser(userBody)
            res.json(user)
        }
        catch(e){
            res.json({error: e.message})
        }
    }
    async login(req,res){
        
    }
}