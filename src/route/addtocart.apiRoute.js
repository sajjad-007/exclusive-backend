const express = require('express')
const _ = express.Router()
const { addtoCart } = require('../controller/addTocartController.js')
const { authGuard } = require('../middleware/authguard.Middleware')

_.route("/addtocart").post(authGuard,addtoCart)
module.exports = _