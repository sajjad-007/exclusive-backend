const express = require("express")
const app = express()
const {route} = require("./src/route/index")
const allRoute = route
const cookieParser = require('cookie-parser')



//Without this middleware, req.body will be undefined for JSON payloads.
app.use(express.json());
//my routes
app.use(allRoute);

//browser e cookie te access token save korar jonno cookieParser use korbo
app.use(cookieParser()) 



module.exports = { app }