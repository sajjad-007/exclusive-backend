const express = require("express");
const _ = express.Router();
const {
  registration,
  login,
  otpVerify,
  resendOtp,
  forgetPassword,
  changePassword,
} = require("../controller/authController");

_.route("/registration").post(registration);
_.route("/login").post(login);
_.route("/otp").post(otpVerify);
_.route("/resendotp").post(resendOtp);
_.route("/forgetPassword").post(forgetPassword);
_.route("/changepassword").post(changePassword);

module.exports = _; //default export
