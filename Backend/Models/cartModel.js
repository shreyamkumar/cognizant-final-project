const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	type: String,
	price: Number,
	description: String,
	userId: String,
	storeId: String,
	prodId: String,
	quantity: Number,
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
