const mongoose = require("mongoose");
const product = require("./product");

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
});

module.exports = mongoose.model("Order", orderSchema);
