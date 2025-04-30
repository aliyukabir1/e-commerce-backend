const category = require("../models/category");
const Product = require("../models/product");
const mongoose = require("mongoose");

// Get All Products
exports.get_all_products = (req, res) => {
  Product.find()
    .exec()
    .then(async (result) => {
      const data = result.map((sdata) => {
        return {
          name: sdata.name,
          price: sdata.price,
          _id: sdata._id,
          request: {
            type: "GET",
            url: "localhost:3000/products/" + sdata._id,
          },
        };
      });
      result = await category.populate(result, { path: "category" });
      res.status(200).json({
        message: "successful",
        body: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
};

// Get one Product
exports.get_one_product = (req, res) => {
  const id = req.params.productId;

  Product.findById(id)

    .exec()
    .then(async (result) => {
      result = await category.populate(result, { path: "category" });
      res.status(200).json({
        success: true,
        body: result,
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

// Create Product
exports.create_product = (req, res) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
    stock: req.body.stock,
    createdAt: req.body.createdAt,
  });
  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Product Created successfully",
        request: {
          type: "GET",
          createdProduct: product,
        },
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

// Update
exports.update_product = (req, res, next) => {
  const id = req.params.productId;
  const update = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
    stock: req.body.stock,
    createdAt: req.body.createdAt,
  };
  Product.findByIdAndUpdate(id, update)
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Update Successfull",
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

// Delete
exports.delete_product = (req, res, next) => {
  const id = req.params.productId;
  Product.findByIdAndDelete(id)
    .exec()
    .then(() => {
      res.status(200).json({
        message: "deleted product",
      });
    })
    .catch((error) => res.status(500).json(error));
};
