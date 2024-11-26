import {Router} from 'express';
import {MocksController} from '../controllers/mocks.controller.js';

export const mockRouter = Router()
const mockControll = new MocksController()

mockRouter.get('/users',mockControll.loadUsers)
mockRouter.get('/pets',mockControll.loadPets)
mockRouter.get('/mockingusers', mockControll.createUser)
mockRouter.get('/mockingpets', mockControll.createPet)
mockRouter.post('/generateData', mockControll.generateData)