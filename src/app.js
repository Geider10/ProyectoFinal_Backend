import express from "express"
import {Server} from "socket.io"
import productsRouter from "./routes/products.routes.js"
import cartsRouter from "./routes/carts.routes.js"
import 'dotenv/config';
import mongoose from 'mongoose';    

//config de handlebars
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import router from "./routes/views.routes.js"
// import ProductManager from "./controllers/productManager.js"
// const pm = new ProductManager()

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({extended : true}))//recibir parametros por url

app.use("/api/productsRouter",productsRouter)
app.use("/api/cartsRouter",cartsRouter)
app.use("/",router)

//handlebars
app.engine("handlebars",handlebars.engine())//instanciar el motor
app.set("views",__dirname + "/views")
app.set("view engine", "handlebars")//motor se renderiza con handlebars
app.use(express.static(__dirname + "/public"))

app.listen(PORT,()=>console.log(`escuchando el puerto ${PORT}`))


const main = async ()=>{
    await mongoose.connect(process.env.uri)
    .then(()=>console.log("conectado a mongo atlas"))
    .catch((error)=>console.log("error de conexin",error))
} 
main()

// const httpServer = app.listen(PORT,()=>console.log(`escuchando el puerto ${PORT}`))
// const socketServer = new Server(httpServer)
// socketServer.on("connection", socket=>{

//     const products = pm.getProducts()
//     socket.emit("get",products)

//     socket.on("add", data=>{  // ID del evento
//         pm.addProduct(data)
//         const products =  pm.getProducts()
//         socket.emit("resAdd",products)
//     })
//     socket.on("delete", data =>{
//         pm.deleteProduct(parseInt(data.id))
//         const products = pm.getProducts()
//         socket.emit("resDelete",products)
//     })
// })



