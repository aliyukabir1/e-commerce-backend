const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const Category = require("./category");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  images: { type: [String] },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);

// import mongoose
// buidl a schema and pass the object and type
// export
