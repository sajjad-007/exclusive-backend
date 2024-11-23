const express = require("express")
const app = express()
const {route} = require("./src/route/index")
const allRoute = route

app.use(express.json());
app.use(allRoute);



module.exports = { app }