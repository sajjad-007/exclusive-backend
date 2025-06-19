const jwt = require('jsonwebtoken');

const generateToken = async(payload) => {
   try {
      //payload = user er data, for example: email,phoneNumber,_id
      const token = await jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRE_DATE });
      return token
   } catch (error) {
    console.log(error);
    
   }
      
}

module.exports = {generateToken}

