const express = require('express');
const router = express.Router();
const orderController = require('./../controllers/orderController');
const authController = require('./../controllers/authControllerUser');

router.post('/addOrder', orderController.addOrder);
router.get('/getOrders', orderController.getOrders);

module.exports = router;
