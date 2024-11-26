import persistence from '../models/persistence.js';
import {createPet, createRandomUser} from '../utils.js';
const {mocksDao} = persistence

export class MocksService{
    constructor(){
        this.mock = mocksDao
    }
    async getUsers(){
        try {
            const users = await this.mock.getUsers()
            return users
        } catch (error) {
            throw new Error(error)
        }
    }
    async addUser(cant){
       try {
            for (let index = 0; index < cant; index++) {
                const user = await createRandomUser()   
                await this.mock.addUser(user)     
            }
       } catch (error) {
        throw new Error(error)
       }
    }
    async getPets(){
        try {
            const pets = await this.mock.getPets()
            return pets
        } catch (error) {
            throw new Error(error)
        }
    }
    async addPet(cant){
        try {
            for (let index = 0; index < cant; index++) {
                const pet = createPet()   
                await this.mock.addPet(pet)     
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}