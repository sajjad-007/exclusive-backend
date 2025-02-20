const express = require("express")
const route = express.Router()
const authRoute = require("./auth.apiRoute")
const categoryRoute = require("./category.api.Route")
const subCategoryRoute = require("./subCategoryRoute")
const productRoute = require("./product.api.Route")

//.use() হল Express.js-এর একটি middleware ফাংশন,যা অন্য কোনো router যুক্ত করতে ব্যবহৃত হয়
route.use("/api/v1", authRoute);
route.use("/api/v1",categoryRoute);
route.use("/api/v1",subCategoryRoute)
route.use("/api/v1",productRoute)

module.exports = {route}
