const {succssResponse} = require("../utilitis/apiResponse")
const {errorResponse} = require("../utilitis/ErrorResponse");
const { emailChecker, passwordChecker, numberChecker} = require("../utilitis/regex");
const {userModel} = require("../modal/modalSchema")
const {sendEmail} = require("../helper/nodeMailer")
const {otpgenetor} = require("../helper/optGenerate")
const { passEncryption,checkPassword } = require("../helper/bcrypt")

const registration = async (req,res)=>{
    try {
        // user er given value (req.body) thek destructuring kora hocche <= ekhane user hocche Postman, Postman theke data post kora hocche
        const {firstName,lastName,email,address,permanentAddress,password,phoneNumber} = req.body;
        //if my value is emty throw this error
        if (!firstName || !email || !address || !password || !phoneNumber) {
            return res
                .status(401)
                .json(new errorResponse(401,`User Credential error`,true,null))
        }
        //validation with regex
        if (!emailChecker(email) || !passwordChecker(password) || !numberChecker(phoneNumber)) {
            return res
                .status(401)
                .json(new errorResponse(401,`Email or Password format doesn't match`,true,null))
        }
        //=========PASSWORD ENCRYPTION BCRYPT========= 
        // here password = user password
        const hassPass= await passEncryption(password)
        //save user data to mongodb compass
        const saveUserData = await userModel.create({
            //item key (ueserModel)  and value(req.body value) same hole single name use kora jabe
            firstName,
            email,
            address,
            password: hassPass,
            phoneNumber,
            //======for optional value======
            //judi amar lastName name kichu thake tahole item key (lastNmae)  er modde req.body (lastName) er value print hoye jabe  
            ...(lastName && {lastName: lastName}),
            ...(permanentAddress && {permanentAddress: permanentAddress}),

            // usermodal er item key : destructring kora object er value
            /** firstName : firstName,
            email: email,
            address: address,
            password: password,*/
        });
        
        // check if user is already exist in database
        const isAlreadyUserExist = userModel.find({
            //or mongoDB er ekti logical operator ja ekadik object ke ekshathe find korte help kore
            $or:[
                {firstName:firstName},
                {email:email},
                {phoneNumber:phoneNumber},
            ]
        })

        if (isAlreadyUserExist?.length) {
            return res
            .status(400)
            .json(new errorResponse(400,`User is already exist! try with another account`,`${Error}`,null))
        }

        // make a otp generator
        const Otp = otpgenetor()
         // send email verification to user
        const messageId = await sendEmail(firstName,Otp,email)
        
        if (messageId) {
            //email send hole amar OTP ta database e save korbo find > email use kore database khujbe and email khuje pele Otp ta DB te store kore felbe (new : true > DB te save koro) 
            const emailUpdated = await userModel.findOneAndUpdate(
                {email :email},
                {otp : Otp},
                {new : true},
            )
            // je value value gula ami user ke dekhate cacchi na se gulo  select("")er modde (-) kore likhbo kintu eigulo Database e save hobe 
            .select("-lastName -isVerified -createdAt -address -updatedAt -otp")
            return res.status(200).json(new succssResponse(200,"Registration done",false,emailUpdated))
        }
            
    } catch (Error) {
        //==========New Method
        return res.status(500).json(new errorResponse(500,`registration unsuccessful`,`${Error}`,null))
        
        
        //==========Old Method
        // res.status(404).json({
        //     statusCode: 404,
        //     message: `Can't found ${error}`,
        //     error: true,
        //     name: null,
        //     number: null,
        //     city: null,
        // })
    }



}

const login = async (req,res) => {
    try {
        const {emailOrphoneNumber, password} = req.body
        if (!emailOrphoneNumber || !password) {
            return res.
            status(400)
            .json(new succssResponse(400,"Invalid Email or Password",false,null))
        }
        //find (array of object return kore ) and findOne (only object return kore)
        const checkIsUserRegisterd = await userModel.findOne({
            $or: [
                // userModel or mongodb database e store howya email er value er shathe, user er login kora email (emailOrphoneNumber) judi mile jay tahole login successfull hobe.
                // abar judi user  phoneNumber (emailOrphoneNumber) diye login korte try kore , judi user er phone number and database e thaka phoneNumber judi mile jai tahole logIn successful hobe.
                {email : emailOrphoneNumber},
                {phoneNumber : emailOrphoneNumber},
            ]
        })
        if (checkIsUserRegisterd) {

            const isPassCorrect = await checkPassword(password, checkIsUserRegisterd.password)
            if(!isPassCorrect){
                return res
                    .status(400).
                    json(new errorResponse(400,`Password doesn't match`,`${Error}`,null))
            }
        }
        
        
        return res.
            status(200)
            .json(new succssResponse(200,"LogIn successfull",false,null))
    } catch (error) {
        return res
        .status(500).
        json(new errorResponse(500,`LogIn Failed`,`${Error}`,null))
    }
}
module.exports = {registration, login}