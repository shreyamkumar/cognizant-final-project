const express=require('express');
const router=express.Router();
const cartController = require('./../controllers/cartController');
const authController = require('./../controllers/authControllerUser');

router.post('/addItem',authController.protect,cartController.addItem);
router.get('/:id',authController.protect,cartController.getItems);
router.delete('/deleteItem/:id',authController.protect,cartController.deleteItem);

module.exports=router;