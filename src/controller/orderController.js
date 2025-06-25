const { succssResponse } = require("../utilitis/apiResponse");
const { errorResponse } = require("../utilitis/ErrorResponse");
const { orderModel } = require("../modal/orderSchema");
const { cartModel } = require("../modal/addtocartShema");
const SSLCommerzPayment = require("sslcommerz-lts");
const crypto = require("crypto");

const store_id = " sajja6856a5e6cb0f6";
const store_passwd = "sajja6856a5e6cb0f6@ssl";
const is_live = false; //true for live, false for sandbox
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
          .status(401)
          .json(
            new succssResponse(
              401,
              `Your order didn't save into database`,
              true,
              null
            )
          );
      }
      return res
        .status(200)
        .json(
          new succssResponse(200, `You order is placed `, false, saveOrderInfo)
        );
    } else if (paymentmethod === "online") {
      //( online payment method )
      const id = crypto.randomUUID();
      let tranId = id.split("-")[0];
      // console.log(id.split("-")[0]);
      const data = {
        total_amount: orderInfo.totalPrice,
        currency: "BDT",
        tran_id: tranId, // use unique tran_id for each api call
        success_url: "http://localhost:3000/api/v1/success",
        fail_url: "http://localhost:3000/api/v1/fail",
        cancel_url: "http://localhost:3000/api/v1/cancel",
        ipn_url: "http://localhost:3000/api/v1/ipn", //Instant Payment Notification (ipn)
        shipping_method: "Courier",
        product_name: "Computer.",
        product_category: "Electronic",
        product_profile: "general",
        cus_name: "Customer Name",
        cus_email: "customer@example.com",
        cus_add1: "Dhaka",
        cus_add2: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: "01711111111",
        cus_fax: "01711111111",
        ship_name: "Customer Name",
        ship_add1: "Dhaka",
        ship_add2: "Dhaka",
        ship_city: "Dhaka",
        ship_state: "Dhaka",
        ship_postcode: 1000,
        ship_country: "Bangladesh",
      };
      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
      const apiResponses = await sslcz.init(data);
      // Redirect the user to payment gateway
      let GatewayPageURL = apiResponses.GatewayPageURL;
      //save  order information ( online payment method ) into database
      const onlineOrderInfo = await  orderModel.create({
        user: req.user._id,
        cartItem: orderInfo.cart,
        customerInfo: customerInfo,
        paymentInfo: paymentInfo,
        subTotal: orderInfo.totalPrice,
        totalQuantity: orderInfo.totalQuantity,
      });

      onlineOrderInfo.paymentInfo.tranId = tranId;
      await onlineOrderInfo.save();

      if (!onlineOrderInfo) {
        return res
          .status(401)
          .json(
            new errorResponse(
              401,
              `online order info couldn't save in db`,
              true,
              saveOrderInfo
            )
          );
      }

      console.log("Redirecting to: ", GatewayPageURL);
      return res.status(200).json({ url: GatewayPageURL });

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
