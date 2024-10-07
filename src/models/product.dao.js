//crud
import {productModel} from './product.model.js';

export const getProducts = async()=>{
    const products = await productModel.find({})
    return products
}
export const getProductById = async(id)=>{
    const product = await productModel.find({_id: id})
    return product
}
export const createProduct = async(product)=>{
    await productModel.create(product)
}
export const updateProduct = async(id, product)=>{
    await productModel.findByIdAndUpdate(id,product,{new : true})
}
export const deleteProduct = async(id)=>{
    await productModel.findByIdAndDelete(id)
}