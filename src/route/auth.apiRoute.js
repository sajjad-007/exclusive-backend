const express = require("express");
const _ = express.Router();
const {registration, login, otpVerify} = require("../controller/authController")

_.route("/registration").post(registration);
_.route("/login").post(login);
_.route("/otp").post(otpVerify);


module.exports = _ ; //default export 






