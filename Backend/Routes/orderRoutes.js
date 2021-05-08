const express=require('express');
const router=express.Router();
const orderController = require('./../controllers/orderController');
const authController = require('./../controllers/authControllerUser');

router.post('/addOrder',authController.protect,orderController.addOrder);
router.get('/:id',authController.protect,orderController.getOrders);

module.exports=router;