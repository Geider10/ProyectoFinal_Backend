//recibur o devolver datos personalizados al cliente
export class ProductDto{
    constructor(product){
        this.product = product
    }
    getProductCustom(){
        const product = this.product
        return {
            nombre : product.name,
            precio: product.price,
            categora: product.category,
            descripcion: product.description
        }
    }
}