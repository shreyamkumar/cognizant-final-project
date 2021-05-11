const express = require('express');
const router = express.Router();
const cartController = require('./../controllers/cartController');

router.post('/addItem', cartController.addItem);
router.get('/getItems', cartController.getItems);
router.delete('/deleteItem', cartController.deleteItem);

module.exports = router;
