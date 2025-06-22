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
// Create Product
exports.create_product = (req, res) => {
  try {
    console.log("Incoming body:", req.body);
    console.log("Incoming files:", req.files);

    // Handle uploaded images (via multer)
    const imagePaths =
      req.files?.map((file) => `/uploads/${file.filename}`) || [];

    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      images: imagePaths, // ✅ save uploaded image paths
      category: req.body.category,
      stock: req.body.stock,
      createdAt: new Date(), // or just remove this and use timestamps
    });

    product
      .save()
      .then((saved) => {
        res.status(201).json({
          message: "✅ Product created successfully",
          product: saved,
          request: {
            type: "GET",
            url: `http://localhost:3000/products/${saved._id}`,
          },
        });
      })
      .catch((err) => {
        console.error("❌ DB error:", err);
        res.status(500).json({ error: err.message });
      });
  } catch (err) {
    console.error("❌ Server crash:", err);
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.update_product = (req, res, next) => {
  const id = req.params.productId;
  const update = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    images: req.body.images,
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
