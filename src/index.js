import express from "express"
import passport from 'passport';
import './passport/jwt.strategy.js'
import 'dotenv/config'

import {initMongoDB} from './db/connection.js';
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

app.listen(PORT,()=>console.log(`listerning ${PORT}`))
initMongoDB()
