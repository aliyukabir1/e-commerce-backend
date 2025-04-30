const { name } = require("body-parser");
const Category = require("../models/category");
const mongoose = require("mongoose");

exports.get_all_categories = (req, res) => {
  Category.find()
    .exec()
    .then((doc) => {
      res.status(200).json({
        success: true,
        body: doc,
      });
    })
    .catch((e) => {
      res.status(404).json({
        success: false,
        message: "Not found",
      });
    });
};

exports.get_one_category = (req, res) => {
  let id = req.params.categoryId;
  Category.findById(id)
    .exec()
    .then((result) => {
      res.status(200).json({
        success: true,
        body: result,
      });
    })
    .catch((e) => {
      res.status(404).json({ success: false, message: "Category Not Found" });
    });
};

exports.create_category = (req, res) => {
  const cat = new Category({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    color: req.body.color,
    description: req.body.description,
    image: req.body.image,
  });
  Category.find({ name: req.body.name })
    .exec()
    .then((result) => {
      cat
        .save()
        .then((obj) => {
          res.status(201).json({
            success: true,
            message: `${req.body.name} Category Added`,
          });
        })
        .catch((e) => {
          res.status(404).json({
            success: false,
            message: "Not found",
          });
        });
    });
};

exports.delete_category = (req, res) => {
  const id = req.params.categoryId;
  Category.findByIdAndDelete(id)
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Category Deleted",
      });
    })
    .catch((error) => res.status(500).json(error));
};

exports.update_category = (req, res) => {
  let id = req.params.categoryId;
  let update = {
    name: req.body.name,
    color: req.body.color,
    image: req.body.image,
    icon: req.body.icon,
  };
  Category.findByIdAndUpdate(id, update)
    .exec()
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Category Updated Successfuly",
      });
    })
    .catch((error) => res.status(500).json(error));
};
