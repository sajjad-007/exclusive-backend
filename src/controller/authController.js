
const {succssResponse} = require("../utilitis/apiResponse")
const {errorResponse} = require("../utilitis/ErrorResponse")
const registration = async (req,res)=>{
    try {
        // throw new Error("Invalid credential")
        res.status(200).json(new succssResponse(200,"Registration done",false,null) )

    } catch (Error) {
        //==========New Method
        res.status(500).json(new errorResponse(500,`registration unsuccessful ${Error}`,true,null))
        
        
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