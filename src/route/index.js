const express = require("express")
const route = express.Router()
const authRoute = require("./auth.apiRoute")
const categoryRoute = require("./category.api.Route")
const subCategoryRoute = require("./subCategoryRoute")
const productRoute = require("./product.api.Route")
const { errorResponse } = require("../utilitis/ErrorResponse")
const bannerRoute = require("./banner.apiRoute")

//.use() হল Express.js-এর একটি middleware ফাংশন,যা অন্য কোনো router যুক্ত করতে ব্যবহৃত হয়
route.use("/api/v1", authRoute);
route.use("/api/v1",categoryRoute);
route.use("/api/v1",subCategoryRoute)
route.use("/api/v1",productRoute)
route.use("/api/v1",bannerRoute)
route.use("*",(req,res)=>{
    return res.status(404)
        .json(new errorResponse(404,"Invalid Routes!",null,true))
})

module.exports = {route}
