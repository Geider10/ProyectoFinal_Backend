import {productModel} from './product.model.js';
import {ObjectId} from 'mongodb';
export class ProductDao{
    async getProducts(){
        const products = await productModel.find({})
        return products
    }
    async getProductById(id){
        const product = await productModel.find({_id:new ObjectId(id)})
        return product
    }
    async addProduct(product){
        await productModel.create(product)
    }
    async updateProduct(id, product){
        const newProduct = await productModel.findOneAndUpdate(
        {_id:new ObjectId(id)},
        {$set : product},
        {returnDocument: 'after', upsert: false }
    )
        return newProduct
    }
    async deleteProduct(id){
        await productModel.deleteOne({_id:id})
    }
}