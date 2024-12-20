import {userModel} from '../schema/user.model.js';
export class UserDao{
    async getUserByEmail(email){
        const user = await userModel.findOne({email: email})
        return user
    }
    async getUserById(id){
        const user = await userModel.findOne({_id:id})
        return user
    }
    async addUser (user) {
        const data = await userModel.create(user)
        return data
    }
}