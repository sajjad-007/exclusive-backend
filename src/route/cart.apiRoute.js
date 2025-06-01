const express = require('express')
const _ = express.Router()
const { createCartController } = require('../controller/cartController')

_.route("/cart").post(createCartController)
module.exports = _