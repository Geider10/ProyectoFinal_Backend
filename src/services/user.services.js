//desacopla el controller y acceder a la persitencia
import persistence from '../models/persistence.js';
const {userDao} = persistence
export class UserService{
    constructor(){
        this.user = userDao
    }
    async getUserByEmail(id){
        try {
            const user = await this.user.getUserByEmail(id)
            return user
        } catch (e) {
            throw new Error(e)
        }
    }
    async getUserById(id){
        try {
            const user = await this.user.getUserById(id)
            return user
        } catch (e) {
            throw new Error(e)   
        }
    }
    async addUser(user){
        try {
            await this.user.addUser(user)           
        } catch (e) {
            throw new Error(e)  
        }
    }
}