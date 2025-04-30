const express = require('express');

const Order = require('../models/order');
const product = require('../models/product');
const checkAuth = require('../middleware/check-auth')
const orderController = require('../controllers/orders')


const router = express.Router();

//get all orders
router.get('/',checkAuth,orderController.get_all_orders)

//post order
router.post('/',checkAuth,orderController.create_order)

// get single order
router.get('/:orderId',checkAuth,orderController.get_one_order)

// update order
router.patch('/:orderId',checkAuth,orderController.update_order)

//delete order
router.delete('/:orderId',checkAuth,orderController.delete_orders)

module.exports =router