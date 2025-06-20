const { succssResponse } = require("../utilitis/apiResponse");
const { errorResponse } = require("../utilitis/ErrorResponse");
const { orderModel } = require("../modal/orderSchema");
const { cartModel } = require("../modal/addtocartShema");
const placeOrder = async (req, res) => {
  try {
    const { customerInfo, paymentInfo } = req.body;
    const { paymentmethod } = paymentInfo;
    const { city, district, address, phoneNumber } = customerInfo;
    const { _id } = req.user;
    if (!city || !district || !address || !phoneNumber) {
      return res
        .status(401)
        .json(new errorResponse(401, `Credential missing! `, true, null));
    }
    //find user's cart items or purchased product
    const userCart = await cartModel
      .find({ user: _id })
      .populate({ path: "user", select: "-password -createdAt -updatedAt" })
      .populate({ path: "product" });
    if (!userCart) {
      return res
        .status(401)
        .json(new errorResponse(401, `Couldn't found userCart `, true, null));
    }
    //userCart ke map korte hobe reduce()
    const orderInfo = userCart.reduce(
      (initailItem, item) => {
        const { _id, product, quantity } = item;
        initailItem.cart.push(_id);
        initailItem.totalQuantity += quantity;
        initailItem.totalPrice += product.price;
        //initialItem ke must return korte hobe
        return initailItem;
      },
      {
        cart: [],
        totalQuantity: 0,
        totalPrice: 0,
      }
    );
    //make payment by cash
    if (paymentmethod === "cash") {
      //save the order information into database
      const saveOrderInfo = await orderModel.create({
        user: req.user._id,
        cartItem: orderInfo.cart,
        customerInfo: customerInfo,
        paymentInfo: paymentInfo,
        subTotal: orderInfo.totalPrice,
        totalQuantity: orderInfo.totalQuantity,
      });
      if (!saveOrderInfo) {
        return res
          .status(200)
          .json(new succssResponse(200, `You order is placed `, false, null));
      }
      return res
      .status(200)
      .json(
        new succssResponse(200, `You order is placed `, false, saveOrderInfo)
      );
    } else {
      return res
        .status(401)
        .json(
          new errorResponse(401, `Order couldn't save into DB`, true, null)
        );
    }
  } catch (error) {
    return res
      .status(500)
      .json(
        new errorResponse(500, `Error from, placeOrder controller`, error, null)
      );
  }
};

module.exports = { placeOrder };
