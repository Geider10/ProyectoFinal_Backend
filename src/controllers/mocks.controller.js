import {MocksService} from '../services/mocks.services.js';
export class MocksController{
    constructor(){
        this.mock = new MocksService()
    }
    loadUsers = async(req,res)=>{
        try {
            const users = await this.mock.getUsers()
            res.json({success: 'req get users',payload : users})
        } catch (error) {
            res.json({error: error})
        }
    }
    createUser = async(req,res)=>{
        try {
            const cant = req.query.cant || 5
            await this.mock.addUser(cant)
            res.json({success: 'req create users with facker'})
        } catch (error) {
            res.json({error: error.message})
        }
    }
    loadPets = async(req,res)=>{
        try {
            const pets = await this.mock.getPets()
            res.json({success: 'req get pets',payload : pets})
        } catch (error) {
            res.json({error: error})
        }
    }
    createPet = async(req,res)=>{
        try {
            const cant = req.query.cant || 5
            await this.mock.addPet(cant)
            res.json({success: 'req create pet with facker'})
        } catch (error) {
            res.json({error: error})
        }
    }
    generateData = async(req,res)=>{
        try {
            const {pets} = req.query || 3
            const {users} = req.query || 3
            await this.mock.addPet(pets)
            await this.mock.addUser(users)
            res.json({success: 'req create pets & users'})
        } catch (error) {
            res.json({error: error})
        }
    }
}