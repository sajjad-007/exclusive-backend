const { succssResponse } = require("../utilitis/apiResponse");
const { errorResponse } = require("../utilitis/ErrorResponse");
const { cartModel } = require("../modal/cartShema");

const createCartController = (req, res) => {
  try {
    return res.status(200).json(new succssResponse(200,`create successful`,false,null))
  } catch (error) {
    return res
      .status(500)
      .json(new errorResponse(500, `Error from createCartController`, `${error}`, null));
  }
};

module.exports = {createCartController}

