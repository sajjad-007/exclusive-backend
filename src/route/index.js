const express = require("express")
const route = express.Router()
const authRoute = require("./auth.apiRoute")


route.use("/home/app", authRoute);

module.exports = {route}