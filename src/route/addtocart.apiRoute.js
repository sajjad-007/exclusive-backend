const express = require("express");
const _ = express.Router();
const {
  addtoCart,
  findallAddtocart,
  findSingleddtocart,
  deleteaddtocart,
  incrementAddtocart,
  decrementAddtocart
} = require("../controller/addTocartController.js");
const { authGuard } = require("../middleware/authguard.Middleware");

_.route("/addtocart").post(authGuard, addtoCart).get(findallAddtocart);
_.route("/addtocart/:id").get(findSingleddtocart).delete(deleteaddtocart);
_.route("/cartincrement").post(authGuard, incrementAddtocart);
_.route("/cartdecrement").post(authGuard, decrementAddtocart);

module.exports = _;
