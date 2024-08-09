// instanciamos un socket al cliente 
const socket = io()

const formu = document.getElementById("formu")
const btnAdd = document.getElementById("btnAdd")
const btnDelete = document.getElementById("btnDelete")
const btnSend = document.getElementById("btnSend")
const btnCancel = document.getElementById("btnCancel")
const iptId = document.getElementById("iptId")
const iptName = document.getElementById("iptName")
const products = document.getElementById("products")

let typeAction =""

const restartForm = ()=>{
    btnDelete.removeAttribute("disabled")
    btnAdd.removeAttribute("disabled")
    iptId.removeAttribute("disabled")
    iptName.removeAttribute("disabled")
    iptId.value =""
    iptName.value =""
    typeAction =""
}
formu.addEventListener("submit",(e)=> {
    e.preventDefault()
})

btnAdd.addEventListener("click",()=>{
    typeAction ="add"
    btnDelete.setAttribute("disabled", "true")
    iptId.setAttribute("disabled", "true")
})
btnDelete.addEventListener("click",()=>{
    typeAction ="delete"
    btnAdd.setAttribute("disabled", "true")
    iptName.setAttribute("disabled", "true")
})
btnSend.addEventListener("click",()=>{
    const txtId = iptId.value
    const txtName = iptName.value

    if(typeAction == "add" && txtName.length > 1){
        socket.emit("add",{type : typeAction, name : txtName})
        restartForm()
    }
    else if(typeAction == "delete" && txtId.length >=1 ){
        socket.emit("delete",{type : typeAction, id: txtId})
        restartForm()
    }
})
btnCancel.addEventListener("click",()=>{
    restartForm()
})

const listProducts = (product)=>{
    products.textContent = ""
    product.forEach(element => {
        let p = document.createElement("p")
        p.textContent ="Id : " + element.id +  ", Nombre : " + element.name
        products.appendChild(p)
    });
}
socket.on("get",data => listProducts(data))
socket.on("resAdd",data => listProducts(data))
socket.on("resDelete",data => listProducts(data))

