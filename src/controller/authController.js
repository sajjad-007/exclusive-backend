const {succssResponse} = require("../utilitis/apiResponse")
const {errorResponse} = require("../utilitis/ErrorResponse");
const { emailChecker, passwordChecker, numberChecker} = require("../utilitis/regex");
const {userModel} = require("../modal/modalSchema")

const registration = async (req,res)=>{
    try {
        const {firstName,email,address,password,phoneNumber} = req.body;
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
        // throw new Error("Invalid credential")
        const saveUserData = await userModel.create({
            //variable and valu same hole single name use kora jabe
            firstName,
            email,
            address,
            password,
            phoneNumber,
            
            // usermodal er variable : destructring kora object er value
            /** firstName: firstName,
            email: email,
            address: address,
            password: password,*/
        })
        console.log(saveUserData);
        
        return res.status(200).json(new succssResponse(200,"Registration done",false,saveUserData) )

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
module.exports = {registration}