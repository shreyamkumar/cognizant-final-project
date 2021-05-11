const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
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

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
