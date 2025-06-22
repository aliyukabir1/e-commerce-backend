// packages
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");

// routes
const productsRoute = require("./api/routes/products");
const ordersRoute = require("./api/routes/orders");
const UserRoute = require("./api/routes/user");
const CategoryRoute = require("./api/routes/category");
const PaymentRoute = require("./api/routes/payment");

// set up url for db and connect using mongoose
const url = "mongodb://127.0.0.1:27017/shop-app";
mongoose.connect(url, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);
const db = mongoose.connection;
db.once("open", (_) => {
  console.log("Database connected:", url);
});

db.on("error", (err) => {
  console.error("connection error:", err);
});

//middleware
const app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,PATCH,DELETE");
    return res.status(200).json({});
  }
  next();
});
// sending request to their routes
app.use("/products", productsRoute);
app.use("/orders", ordersRoute);
app.use("/user", UserRoute);
app.use("/category", CategoryRoute);
app.use("/paystack", PaymentRoute);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});

// export module
module.exports = app;

// import mongoose,express,morgan(logging console),body-parser
