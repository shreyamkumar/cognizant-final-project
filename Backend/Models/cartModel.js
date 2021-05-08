const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
	name: String,
    type: String,
    price: Number,
    description: String,
    userId: String
});


const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
