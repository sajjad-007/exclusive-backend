const { succssResponse } = require("../utilitis/apiResponse");
const { errorResponse } = require("../utilitis/ErrorResponse");
const { cartModel } = require("../modal/addtocartShema");

const addtoCart = async (req, res) => {
  try {
    const { cartProduct, quantity } = req.body;
    if (!cartProduct) {
      return res
        .status(401)
        .json(new errorResponse(401, `Product missing`, true, null));
    }
    //is product already exist
    const isAlreadyExist = await cartModel.find({cartProduct: cartProduct})
    if(isAlreadyExist?.length){
      return res
        .status(401)
        .json(new errorResponse(401, `This product is already exist`, true, null));
    }  
    //create addtoCart database 
    const creatAddtocarteDB = await cartModel.create({
      cartUser: req.user._id,
      cartProduct,
      quantity,
    })
    if(!creatAddtocarteDB){
      return res
        .status(401)
        .json(new errorResponse(401, `Database create Unsuccessfull`, true, null));
    }
    return res
      .status(200)
      .json(new succssResponse(200, `AddtoCart Database create  successful`, creatAddtocarteDB, null));
  } catch (error) {
    return res
      .status(500)
      .json(
        new errorResponse(
          500,
          `Error from createCartController`,
          `${error}`,
          null
        )
      );
  }
};

module.exports = { addtoCart };
