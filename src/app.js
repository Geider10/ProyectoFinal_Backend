import express from "express"
import mongoose from 'mongoose';    
import {Server} from "socket.io"
import dotenv from 'dotenv';
dotenv.config()
import passport from 'passport';
import './passport/jwt.strategy.js'

import productsRouter from "./routes/products.routes.js"
import cartsRouter from "./routes/carts.routes.js"
import {authRouter} from './routes/auth.routes.js';
import {userRouter} from './routes/user.routes.js';

import handlebars from "express-handlebars"
import {__dirname} from "./utils.js"
import viewRouter from "./routes/views.routes.js"

const app = express()
const PORT = process.env.PORT || 8080

app.use(passport.initialize())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use("/api/productsRouter",productsRouter)
app.use("/api/cartsRouter",cartsRouter)
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
//render views
app.use("/",viewRouter) 


app.engine("handlebars",handlebars.engine())
app.set("views",__dirname + "/views")
app.set("view engine", "handlebars")
app.use(express.static(__dirname + "/public"))

app.listen(PORT,()=>console.log(`escuchando el puerto ${PORT}`))

const main = async ()=>{
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("conectado a mongo atlas"))
    .catch((error)=>console.log("error de conexin",error))
} 
main()
