import {productModel} from './product.model.js';
export class ProductDao{
    async testLog(){
        console.log('test de productos');
    }
    async getProducts(limit, page, category){
        if(category){
            const products = await productModel.paginate({category},{limit, page})
            return products
        }
        else{
            const products = await productModel.paginate({},{limit, page})
            return products
        }
        
    }
    async getProductById(id){
        const product = await productModel.findOne({_id:id})
        return product
    }
    async addProduct(product){
        await productModel.create(product)
    }
    async updateProduct(id, product){
        const newProduct = await productModel.updateOne({_id : id},{$set : product})
        return newProduct
    }
    async deleteProduct(id){
        await productModel.deleteOne({_id:id})
    }
}