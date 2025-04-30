const Product = require("../models/product");
const mongoose = require("mongoose");

// Get All Products
exports.get_all_products = (req, res) => {
  Product.find()
    .exec()
    .then((result) => {
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
      res.status(200).json({
        message: "successful",
        products: data,
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
    .select("name price _id productImage")
    .exec()
    .then((result) => {
      res.status(200).json(result);
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
  });
  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Product saved successfully",
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
    richDescription: req.body.richDescription,
    image: req.body.image,
    images: req.body.images,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    isFeatured: req.body.isFeatured,
    dateCreated: req.body.dateCreated,
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
