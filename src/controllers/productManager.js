import {productModel} from '../models/product.model.js';

class ProductManager {
    constructor(){
    }
    async get(){
        return await productModel.find()
    }
    async getProducts(limit,page, sort, query){
        let products = await productModel.paginate()
        if(limit){
            const p = await productModel.paginate({},{limit,lean : true})
            products = p
        }
        if(page){
            const p = await productModel.paginate({},{page,lean : true})
            products = p
        }
        if(sort){
            const p = await productModel.paginate({},{sort : {price : sort},lean : true})
            products = p
        }
        if(query){
            const p = await productModel.paginate({category: query},{lean : true})
            products = p
        }
        if(limit && page){
            const p = await productModel.paginate({},{limit,page,lean : true})
            products = p
        }
        if(limit && page && sort){
            const p = await productModel.paginate({},{limit,page,sort : {price : sort},lean : true})
            products = p
        }
        if(limit && page && sort && query){
            // const p = await productModel.paginate({},{limit, page, sort : {price : sort}, select : {category : query}})
            const p = await productModel.paginate({category: query},{limit, page, sort : {price : sort},lean : true})
            products = p
        }
        return products
    }
    getProductById(id){ 
        const product = productModel.find({_id : id})
        return product
    }
    addProduct(product){
        let empty = false
        const p = {...product, status: true}//poner status = true obligado
        for(let clave in p){
            if(!p[clave]){
                empty = true
                break
            }
        }
        if(empty){
            console.log("Todos los campos son obligatorios");
        }
        else{
            productModel.create(p)
            console.log("Se agrego un producto con exito");
        }
    }
    updateProduct(id, product){
        const pro = this.getProductById(id)
        if(pro){
            let empty = false
            const p = {...product, status: true}//poner status = true obligado
            for(let clave in p){
                if(!p[clave]){
                    empty = true
                    break
                }
            }
            if(empty){
                console.log("Todos los campos son obligatorios");
            }
            else{
                return productModel.updateOne({_id:id},p)
            }
        }
        else{
            return { "Error" : "there are not product"}
        }
    }
    deleteProduct(id){
        const pro = this.getProductById(id)
        if(pro){
            return productModel.deleteOne({_id: id})
        }
        else{
            return { "Error" : "there are not product"}
        }
    }
}

export default ProductManager
