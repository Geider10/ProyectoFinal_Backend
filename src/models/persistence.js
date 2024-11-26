import {CartDao} from './dao/cart.dao.js';
import {ProductDao} from './dao/product.dao.js';
import {UserDao} from './dao/user.dao.js';
import {TicketDao} from './dao/ticket.dao.js';
import {MocksDao} from './dao/mocks.dao.js';
import {initMongoDB} from './connection.js';

let userDao = null
let cartDao = null
let productDao = null
let ticketDao = null
let mocksDao = null

const typeDB = process.argv[2]
switch (typeDB) {
    case 'MONGO':
        initMongoDB()
        cartDao = new CartDao()
        productDao = new ProductDao()
        userDao = new UserDao()
        ticketDao = new TicketDao()
        mocksDao = new MocksDao()
        break;
    case 'MYSQL':
        console.log('match with mysql');
    default:
        console.log('Not match with db :(');
        break;
}

export default {cartDao, productDao, userDao, ticketDao, mocksDao}