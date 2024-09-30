import {userModel} from './user.model.js';
export const getUserByEmail= async (email)=>{
    const user = await userModel.findOne({email: email})
    return user
}
export const addUser = async (user) => {
    await userModel.create(user)
}
export const getUserById = async (id)=>{
    const user = await userModel.findOne({_id:id})
    return user
}
