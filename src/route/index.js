const express = require("express")
const route = express.Router()
const authRoute = require("./auth.apiRoute")
const categoryRoute = require("./category.api.Route")

//.use() হল Express.js-এর একটি middleware ফাংশন,যা অন্য কোনো router যুক্ত করতে ব্যবহৃত হয়
route.use("/home/api", authRoute);
route.use("/home/api",categoryRoute);

module.exports = {route}
