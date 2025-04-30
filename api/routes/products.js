const express = require('express');
const mongoose = require('mongoose');
const  router = express.Router();
const Product = require('../models/product');
//const multer = require('multer')
const checkAuth = require('../middleware/check-auth')
const productController = require('../controllers/products')

// get all products
router.get('/',checkAuth, productController.get_all_products)

// get single product
router.get("/:productId", checkAuth, productController.get_one_product)

// post new product
router.post('/',checkAuth,productController.create_product)
  
// update product
router.patch('/:productId',checkAuth,productController.update_product)

// delete product
    router.delete('/:productId',checkAuth,productController.delete_product)

module.exports =router;


// import mongoose,product model, express and create router throung express
// handle req type
// export router