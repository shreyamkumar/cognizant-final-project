const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	name: String,
    type: String,
    price: Number,
    description: String,
    userId: String
});


const Order = mongoose.model('Order', orderSchema);
module.exports = Order;