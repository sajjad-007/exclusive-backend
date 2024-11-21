const express = require("express")
const app = express()
const {route} = require("./src/route/route")
const allRoute = route

app.use(allRoute)



module.exports = { app }