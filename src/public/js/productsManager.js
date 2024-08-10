// add product by at cart selection
const btnProduct = document.querySelector(".btnAddProduct")
//btn hace una peticion post addProductCart al carrito
btnProduct.addEventListener("click",(e)=>{
    const productId = e.target.id
    //"endpoint",options{}
    fetch(`http://localhost:8080/api/cartsRouter/66b5817a65a70f4ead529abe/product/${productId}`,{
        method : "POST",
        headers:{},
        body : {}
    })
    .then(res => res.json())//parsea la respuesta como json
    .then(res => console.log(res))//obtener la respuesta del servidor
    .catch((error) => console.log(error))
})
