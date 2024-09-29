import {userModel} from './user.model.js';
import {encryptPassword} from '../utils.js';
const getUserByEmail= async (email)=>{
    const user = await userModel.findOne({email: email})
    return user
}
export const addUser = async (user) => {
    const {email, password} = user
    const existsUser = await getUserByEmail(email)
    if(!existsUser){
        const newUser = {
            ...user,
            password : await encryptPassword(password)
        }
        console.log(newUser);
        await userModel.create(newUser)
        return {success: 'add new user in db'}
    }
    return {success: 'user already exists in db'}
}
