import {} from '../models/user.dao.js';

export class AuthManager{
    async register(req,res) {
        const {email,password} = req.body
        try{
            const user = await getUserByEmail(email,password)
        }
        catch(e){
            res.json({error: e.message})
        }
    }
    async login(req,res){
        
    }
}