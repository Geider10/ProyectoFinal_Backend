import {ProductDto} from '../models/dto/product.dto.js';
import persistence from '../models/persistence.js';
const {productDao} = persistence
//desacopla el dao y la logica de negocio, agrega capa servicios
export class ProductRepository{
    constructor(){
        this.dao = productDao
    }
    async getProductById(id){
        try{
            const product = await this.dao.getProductById(id)
            const productDto = new ProductDto(product)
            const customProduct = productDto.getProductCustom(product)
            return customProduct
        } 
        catch(e){
            throw new Error(e)
        }
    }
}