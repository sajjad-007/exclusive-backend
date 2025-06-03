const express = require("express");
const _ = express.Router();
const {registration, login, otpVerify, resendOtp} = require("../controller/authController")

_.route("/registration").post(registration);
_.route("/login").post(login);
_.route("/otp").post(otpVerify);
_.route("/resendotp").post(resendOtp)


module.exports = _ ; //default export 






