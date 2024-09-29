import { dirname } from "node:path"
import {fileURLToPath} from "node:url"
export const __dirname = dirname(fileURLToPath(import.meta.url))

import bcrypt from 'bcrypt';
export const encryptPassword = async(password) =>{
    try{
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)
        return hashPassword
    }
    catch(e){
        throw new Error('error encrypt')
    }
}