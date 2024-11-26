const { aleaRNGFactory } = require("number-generator")


const otpgenetor = ()=>{
    // Date.now() => jokhon user login korbe sei time ta niya ekti number generate korbe
    const { uInt32 } =  aleaRNGFactory(Date.now())
    return uInt32().toString().slice(0,4);
    
}


module.exports = { otpgenetor }