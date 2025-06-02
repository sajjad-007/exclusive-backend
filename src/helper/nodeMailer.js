const nodemailer = require("nodemailer");
require("dotenv").config();
const { mailTemplete } = require("./emailTemplete");

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (firstName, Otp, email) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.USER_EMAIL, //process.env.USER_EMAIL, // sender address
    to: email, // list of receivers
    subject: "email verification", // Subject line
    html: mailTemplete(firstName, Otp, email), // html body
  });
  return info.messageId;
};

// sendEmail().catch(console.error);

module.exports = { sendEmail };
