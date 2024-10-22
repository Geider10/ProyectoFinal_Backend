import persistence from '../models/persistence.js';
import {ProductDto} from '../models/dto/product.dto.js';
const {productDao} = persistence
export class ProductService{
    constructor(){
        this.product = productDao
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
            const product = await this.product.getProductById(id)
            const productCustom = new ProductDto(product)
            return productCustom.getProductCustom()
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
