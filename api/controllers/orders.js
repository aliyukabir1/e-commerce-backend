const mongoose = require("mongoose");
const Order = require("../models/order");
const product = require("../models/product");
const user = require("../models/user");

// Get All Orders
exports.get_all_orders = (req, res) => {
  Order.find()
    .populate("products.product")
    .exec()
    .then((docs) => {
      res.status(200).json({
        message: "success",
        orders: docs,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

// Get single Orders
exports.create_order = async (req, res) => {
  const { products, shippingAddress, totalAmount } = req.body;

  const order = new Order({
    _id: mongoose.Types.ObjectId(),
    user: req.userData._id,
    products,
    shippingAddress,
    totalAmount,
  });
  order.save().then((result) => {
    res.status(201).json({
      message: "order created",
      createdOrder: result,
    });
  });
};

// Get one order
exports.get_my_orders = (req, res) => {
  const id = req.userData._id;
  Order.find({ user: id })
    .populate("products.product user")
    .exec()
    .then((order) => {
      if (!order) {
        return res.status(404).json({
          message: "Order Not Found",
        });
      }
      res.status(200).json(order);
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

// Update Order
exports.update_order = (req, res) => {
  const { id, status } = req.body;

  Order.findByIdAndUpdate(id, { status: status })
    .exec()
    .then((result) => {
      res.status(200).json({ message: "Order updated" });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
