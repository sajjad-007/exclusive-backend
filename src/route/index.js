const express = require("express")
const route = express.Router()
const authRoute = require("./auth.apiRoute")
const categoryRoute = require("./category.api.Route")


route.use("/home/api", authRoute);
route.use("/home/api",categoryRoute);

module.exports = {route}