const express = require("express");

const Order = require("../models/order");
const product = require("../models/product");
const {checkAuth} = require("../middleware/check-auth");
const orderController = require("../controllers/orders");

const router = express.Router();

//get all orders
router.get("/", checkAuth, orderController.get_all_orders);

//post order
router.post("/", checkAuth, orderController.create_order);

// get single order
router.get("/my-orders", checkAuth, orderController.get_my_orders);

// update order
router.patch("/", checkAuth, orderController.update_order);

module.exports = router;
