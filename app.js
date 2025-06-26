const express = require("express");
const app = express();
const { route } = require("./src/route/index");
const allRoute = route;
const cookieParser = require("cookie-parser");
const cors = require("cors");

// if we want to use frontend with backend we must use cors origin, it connents both frontend and backed
// here credentials: true means it allow browser header to use my cookies(jwt token)
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
//Without this middleware, req.body will be undefined for JSON payloads.
app.use(express.json());
//my routes
app.use(allRoute);

//browser e cookie te access token save korar jonno cookieParser use korbo
app.use(cookieParser());

//local server e static image dekhar jonn
app.use("/static/temp", express.static("public/temp"));

module.exports = { app };
