const mongoose = require("mongoose");
const Product = require("./product");
const { type } = require("express/lib/response");

const cartModel = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  createdAd: { type: Date, ref: Date.now },
});

module.exports = mongoose.model("Cart", cartModel);
