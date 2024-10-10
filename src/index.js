import express from "express"
import mongoose from 'mongoose';    
import passport from 'passport';
import './passport/jwt.strategy.js'
import dotenv from 'dotenv';
dotenv.config()

import viewRouter from "./routes/views.routes.js"
import {mainRouter} from './routes/main.routes.js';
import handlebars from "express-handlebars"
import {__dirname} from "./utils.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(passport.initialize())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('/api',mainRouter)
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
