import express from "express"
import passport from 'passport';
import handlebars from "express-handlebars"
import './passport/jwt.strategy.js'
import 'dotenv/config'

import {mainRouter} from './routes/main.routes.js';
import {viewRouter} from './routes/views.routes.js';
import {__dirname} from "./utils.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(passport.initialize())
app.use(express.urlencoded({extended : true}))

app.engine("handlebars",handlebars.engine())
app.set("views",__dirname + "/views")
app.set("view engine", "handlebars")
app.use(express.static(__dirname + "/public"))

app.use('/api',mainRouter)
app.use('/',viewRouter)

app.listen(PORT,()=>console.log(`listerning ${PORT}`))
