const mongoose = require("mongoose");

const category = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, require: true, unique: true },
  color: { type: String },
  description: { type: String },
  image: { type: String },
});

module.exports = mongoose.model("Category", category);
