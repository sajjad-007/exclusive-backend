const { succssResponse } = require("../utilitis/apiResponse");
const { errorResponse } = require("../utilitis/ErrorResponse");

exports.paymentSuccess = async (req, res) => {
  try {
    return res
      .status(200)
      .json(new succssResponse(200, `payment successfull `, false, null));
  } catch (error) {
    return res
      .status(401)
      .json(
        new errorResponse(
          401,
          `Error from paymentSuccess controller`,
          error,
          null
        )
      );
  }
};
exports.paymentFailed = async (req, res) => {
  try {
    return res
      .status(200)
      .json(
        new succssResponse(
          200,
          `payment failded controller success `,
          false,
          null
        )
      );
  } catch (error) {
    return res
      .status(401)
      .json(
        new errorResponse(
          401,
          `Error from paymentFailed controller`,
          error,
          null
        )
      );
  }
};
exports.paymentCancel = async (req, res) => {
  try {
    return res
      .status(200)
      .json(
        new succssResponse(200, `payment cancel successfull `, false, null)
      );
  } catch (error) {
    return res
      .status(401)
      .json(
        new errorResponse(
          401,
          `Error from paymentCancel controller`,
          error,
          null
        )
      );
  }
};
//Instant Payment Notification (IPN)
exports.paymentIpn = async (req, res) => {
  try {
    return res
      .status(200)
      .json(new succssResponse(200, `payment IPN successfull `, false, null));
  } catch (error) {
    return res
      .status(401)
      .json(
        new errorResponse(401, `Error from paymentIpn controller`, error, null)
      );
  }
};
