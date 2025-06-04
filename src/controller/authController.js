const { succssResponse } = require("../utilitis/apiResponse");
const { errorResponse } = require("../utilitis/ErrorResponse");
const {
  emailChecker,
  passwordChecker,
  numberChecker,
} = require("../utilitis/regex");
const { userModel } = require("../modal/modalSchema");
const { sendEmail } = require("../helper/nodeMailer");
const { otpgenetor } = require("../helper/optGenerate");
const { passEncryption, checkPassword } = require("../helper/bcrypt");
const { generateToken } = require("../helper/jwtToken");
// const {generateToken} = require("../helper/jwtToken")

// Cookie options
const options = {
  httpOnly: true, // Prevent client-side JavaScript access
  secure: false, // Set to true if using HTTPS
};

const registration = async (req, res) => {
  try {
    // user er given value (req.body) thek destructuring kora hocche <= ekhane user hocche Postman, Postman theke data post kora hocche
    const { firstName, email, password, phoneNumber } = req.body;
    //if my value is emty throw this error
    if (!firstName || !email || !password || !phoneNumber) {
      return res
        .status(401)
        .json(new errorResponse(401, `User Credential error`, true, null));
    }
    //validation with regex
    //email, number, password format checker
    if (
      !emailChecker(email) ||
      !passwordChecker(password) ||
      !numberChecker(phoneNumber)
    ) {
      return res
        .status(401)
        .json(
          new errorResponse(
            401,
            `Email or Password format doesn't match`,
            true,
            null
          )
        );
    }
    //=========PASSWORD ENCRYPTION BCRYPT=========
    // here, password = user password
    const hassPass = await passEncryption(password);

    // check if user is already exist in database
    const isAlreadyUserExist = userModel.find({
      //or mongoDB er ekti logical operator ja ekadik object ke ekshathe find korte help kore
      $or: [
        { firstName: firstName },
        { email: email },
        { phoneNumber: phoneNumber },
      ],
    });

    if (isAlreadyUserExist?.length) {
      return res
        .status(400)
        .json(
          new errorResponse(
            400,
            `User is already exist! try with another account`,
            `${Error}`,
            null
          )
        );
    }

    // make a otp generator
    const Otp = otpgenetor();
    // send email verification to user (send otp)
    const messageId = await sendEmail(firstName, Otp, email);

    if (messageId) {
      //save user data to mongodb compass
      const saveUserData = await userModel.create({
        //item key (ueserModel)  and value(req.body er value) same hole single name use kora jabe
        firstName,
        email,
        password: hassPass,
        phoneNumber,

        //======for optional value======
        //judi amar lastName name kichu thake tahole item key (lastNmae)  er modde req.body (lastName) er value print hoye jabe

        // ...(lastName && {lastName: lastName}),
        // ...(permanentAddress && {permanentAddress: permanentAddress}),

        // usermodal er item key : destructring kora object er value
        /** firstName : firstName,
                email: email,
                address: address,
                password: password,*/
      });

      //email send hole amar OTP ta database e save korbo find > email use kore database khujbe and email khuje pele Otp ta DB te store kore felbe (new : true > DB te save koro)
      const userUpdated = await userModel
        .findOneAndUpdate(
          { email: email }, //find using email
          {
            // update otp , expireOtp
            otp: Otp,
            // new Date().getTime() + min + sec + milisecond
            expireOtp: new Date().getTime() + 10 * 60 * 1000,
          },
          //update successful
          { new: true }
        )
        // je value value gula ami user ke dekhate cacchi na se gulo  select("")er modde (-) kore likhbo kintu eigulo Database e save hobe
        .select("-lastName -isVerified -createdAt -address -updatedAt ");
      if (userUpdated) {
        return res
          .status(200)
          .json(
            new succssResponse(
              200,
              "Registration successfull",
              false,
              userUpdated
            )
          );
      }
    } else {
      return res
        .status(401)
        .json(new errorResponse(500, `Registration  unsuccessful`, true, null));
    }
  } catch (Error) {
    //==========New Method
    return res
      .status(500)
      .json(
        new errorResponse(500, `Error from Registration`, `${Error}`, null)
      );

    //==========Old Method
    // return res.status(404).json({
    //     statusCode: 404,
    //     message: `Can't found ${error}`,
    //     error: true,
    //     name: null,
    //     number: null,
    //     city: null,
    // })
  }
};
//log in
const login = async (req, res) => {
  try {
    const { emailOrphoneNumber, password } = req.body;
    if (!emailOrphoneNumber || !password) {
      return res
        .status(400)
        .json(
          new succssResponse(400, "Invalid Email or Password", false, null)
        );
    }
    //find (array of object return kore ) and findOne (only object return kore)
    const checkIsUserRegisterd = await userModel.findOne({
      $or: [
        // userModel or mongodb database e store howya email er value er shathe, user er login kora email (emailOrphoneNumber) judi mile jay tahole login successfull hobe.
        // abar judi user  phoneNumber (emailOrphoneNumber) diye login korte try kore , judi user er phone number and database e thaka phoneNumber judi mile jai tahole logIn successful hobe.
        { email: emailOrphoneNumber },
        { phoneNumber: emailOrphoneNumber },
      ],
    });

    //check user given password is correct or not
    if (checkIsUserRegisterd) {
      const isPassCorrect = await checkPassword(
        password,
        checkIsUserRegisterd.password
      );
      if (!isPassCorrect) {
        return res
          .status(400)
          .json(new errorResponse(400, `Password doesn't match`, ture, null));
      }
      //access token / cookie
      const userInfo = {
        _id: checkIsUserRegisterd._id,
        email: checkIsUserRegisterd.email,
        firstName: checkIsUserRegisterd.firstName,
        phoneNumber: checkIsUserRegisterd.phoneNumber,
      };
      const token = await generateToken(userInfo);
      // console.log(token);
      return res
        .status(200)
        .cookie("token", token, options)
        .json(
          new succssResponse(200, "LogIn successfull", false, {
            data: {
              token: `bearer: ${token}`,
              email: checkIsUserRegisterd.email,
              firstName: checkIsUserRegisterd.firstName,
            },
          })
        );
    } else {
      return res
        .status(401)
        .json(new errorResponse(401, `LogIn Failed`, true, null));
    }

    // console.log(checkIsUserRegisterd.email)
  } catch (error) {
    return res
      .status(500)
      .json(new errorResponse(500, `Error from login`, error, null));
  }
};
// OTP verify
const otpVerify = async (req, res) => {
  try {
    //user given value
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res
        .status(401)
        .json(new errorResponse(401, `Credential Missing!`, true, null));
    }
    const matchOtp = await userModel.findOne({ email: email });

    if (
      matchOtp.expireOtp >= new Date().getTime() &&
      matchOtp.otp === parseInt(otp)
    ) {
      const removeOtpCredential = await userModel.findOneAndUpdate(
        { email: email },
        {
          otp: null,
          expireOtp: null,
        },
        { new: true }
      );
      if (removeOtpCredential) {
        return res
          .status(200)
          .json(
            new succssResponse(
              200,
              `OTP verification successfull`,
              false,
              removeOtpCredential
            )
          );
      }
    } else {
      return res
        .status(401)
        .json(new succssResponse(200, "OTP invalid or expired", true, null));
    }
  } catch (error) {
    return res
      .status(500)
      .json(new errorResponse(500, `Error from otpVerify `, `${error}`, null));
  }
};
//resend otp
const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(401)
        .json(new errorResponse(401, `Email not found`, true, null));
    }
    const findUser = await userModel.findOne({ email: email });
    if (!findUser) {
      return res
        .status(404)
        .json(new errorResponse(404, `User not found`, true, null));
    }
    // make a otp generator
    const Otp = otpgenetor();
    // send email verification to user
    const messageId = await sendEmail(
      `${findUser.firstName}, Here is your resent otp `,
      Otp,
      email
    );

    if (messageId) {
      const userUpdated = await userModel
        .findOneAndUpdate(
          { email: email }, //find using email
          {
            // update otp , expireOtp
            otp: Otp,
            // new Date().getTime() + min + sec + milisecond
            expireOtp: new Date().getTime() + 10 * 60 * 1000,
          },
          //update successful
          { new: true }
        )
        .select("-lastName -isVerified -createdAt -address -updatedAt ");
      if (userUpdated) {
        return res
          .status(200)
          .json(
            new succssResponse(
              200,
              `We resent your OTP check email`,
              false,
              userUpdated
            )
          );
      }
    } else {
      return res
        .status(401)
        .json(new errorResponse(401, `Resent otp  unsuccessful`, true, null));
    }
  } catch (error) {
    return res
      .status(500)
      .json(new errorResponse(500, `Error from otpVerify `, `${error}`, null));
  }
};
// forget password
const forgetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword, oldPass } = req.body;
    //Credential ckecking
    if (!email || !newPassword || !confirmPassword || !oldPass) {
      return res
        .status(401)
        .json(new errorResponse(401, `Credential Missing!`, true, null));
    }
    //Password format checker
    if (!passwordChecker(newPassword)) {
      return res
        .status(401)
        .json(
          new errorResponse(401, `Password format Don't match`, true, null)
        );
    }
    const findUser = await userModel.findOne({ email: email });
    //check user given password is correct or not compare to database password
    const isPasswordCorrect = await checkPassword(oldPass, findUser.password);
    if (isPasswordCorrect) {
      if (newPassword === confirmPassword) {
        const newhassPass = await passEncryption(confirmPassword);
        const savePassDb = await userModel.findOneAndUpdate(
          { email: email },
          { password: newhassPass },
          { new: true }
        );
        if (!savePassDb) {
          return res
            .status(401)
            .json(new errorResponse(401, `Database don't save `, true, null));
        }
        return res
          .status(200)
          .json(
            new succssResponse(200, `Password change successful`, false, null)
          );
      } else {
        return res
          .status(401)
          .json(
            new errorResponse(
              401,
              `Password Don't match or something wrong`,
              true,
              null
            )
          );
      }
    } else {
      return res
        .status(401)
        .json(new errorResponse(401, `Password Don't match`, true, null));
    }
    return res
      .status(200)
      .json(
        new succssResponse(200, `Password Change successfull`, false, null)
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new errorResponse(500, `Error from forget password `, `${error}`, null)
      );
  }
};
module.exports = { registration, login, otpVerify, resendOtp, forgetPassword };
