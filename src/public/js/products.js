// add product by at cart selection
const btnProduct = document.querySelector(".btnAddProduct")
btnProduct.addEventListener("click",(e)=>{
    const productId = e.target.id
    fetch(`http://localhost:8080/api/cart/66b5817a65a70f4ead529abe/product/${productId}`,{
        method : "POST"
    })
    .then(res => res.json())//parsea la respuesta como json
    .then(res => console.log(res))//obtener la respuesta del servidor
    .catch((error) => console.log(error))
})
