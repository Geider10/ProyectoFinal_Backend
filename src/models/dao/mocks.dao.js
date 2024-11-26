import {userFakerModel} from '../schema/userFacker.model.js';
import {petFackerModel} from '../schema/petFacker.model.js';

export class MocksDao{
    async getUsers(){
        const users = await userFakerModel.find({})
        return users
    }
    async addUser(user){
        await userFakerModel.create(user)
    }
    async getPets(){
        const pets = await petFackerModel.find({})
        return pets
    }
    async addPet(pet){
        await petFackerModel.create(pet)
    }
}