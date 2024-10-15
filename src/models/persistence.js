import {CartDao} from './dao/cart.dao.js';
import {ProductDao} from './dao/product.dao.js';
import {UserDao} from './dao/user.dao.js';
import {initMongoDB} from './connection.js';

let userDao = null
let cartDao = null
let productDao = null

const typeDB = process.argv[2]
switch (typeDB) {
    case 'MONGO':
        initMongoDB()
        cartDao = new CartDao()
        productDao = new ProductDao()
        userDao = new UserDao()
        break;
    case 'MYSQL':
        console.log('match with mysql');
    default:
        console.log('Not match with db :(');
        break;
}

export default {cartDao, productDao, userDao}