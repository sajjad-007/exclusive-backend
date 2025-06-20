const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utilitis/ErrorResponse");

const authGuard = (req, res, next) => {
  try {
    // req.headers.cookie = website
    if (req.headers.cookie) {
      const token = req.headers.cookie.replace("token=", "").trim();
      // invalid token - synchronous (detect invalid tokens)
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      if (!decoded) {
        return res
          .status(401)
          .json(new errorResponse(401, `Invalid token`, true, null));
      }
      // req.user =decoded (new object was build and that stored decoded's value)
      req.user = decoded;

      next();
    } else if (req.headers.authorization) {
      //req.headers.authorization = anroid
      const token = req.headers.authorization.replace("bearer ", "").trim();
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      if (!decoded) {
        return res
          .status(401)
          .json(new errorResponse(401, `Invalid token`, true, null));
      }
      req.user = decoded;
      next();
    } else {
      return res
        .status(401)
        .json(new errorResponse(401, `Expire or Token Missing`, true, null));
    }
  } catch (error) {
    console.error("error from auth guard", error);
  }
};

module.exports = { authGuard };
