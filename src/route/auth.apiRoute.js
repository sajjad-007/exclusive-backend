const express = require("express");
const _ = express.Router();
const {registration} = require("../controller/authController")

_.route("/registration").post(registration);
module.exports = _ ; //default export 






