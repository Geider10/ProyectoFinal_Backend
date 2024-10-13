import persistence from '../models/persistence.js';
import {ProductRepository} from '../repository/product.repository.js';
const {productDao} = persistence
export class ProductService{
    constructor(){
        this.product = productDao
        this.productRepo = new ProductRepository()
    }
    async getProducts(limit, page, category){
        try {
            const products = await this.product.getProducts(limit,page,category)
            return products
        } catch (e) {
            throw new Error(e)
        }
    }
    async getProductById(id){
        try {
            const product = await this.productRepo.getProductById(id)
            return product
        } catch (e) {
            throw new Error(e)
        }
    }
    async addProduct(product){
        try {
            await this.product.addProduct(product)
        } catch (e) {
            throw new Error(e)
        }
    }
    async updateProduct(id,product){
        try {
            const newProduct = this.product.updateProduct(id,product)
            return newProduct
        } catch (e) {
            throw new Error(e)
        }
    }
    async deleteProduct(id){
        try {
            await this.product.deleteProduct(id)
        } catch (e) {
            throw new Error(e)
        }
    }
}
