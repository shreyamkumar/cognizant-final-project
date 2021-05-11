const Order = require('./../Models/orderModel');
const Cart = require('./../Models/cartModel');
const mongoose = require('mongoose');

exports.addOrder = async (req, res, next) => {
	const userId = req.body.userId;
	const orders = await Cart.find({ userId }).select();
	console.log(req.body);
	try {
		for (let i = 0; i < orders.length; i++) {
			await Cart.findByIdAndDelete(orders[i]._id);
			await Order.create({
				_id: new mongoose.Types.ObjectId(),
				name: orders[i].name,
				type: orders[i].type,
				price: orders[i].price,
				description: orders[i].description,
				userId: userId,
				storeId: orders[i].storeId,
				quantity: orders[i].quantity,
				prodId: orders[i].prodId,
			});
		}
		res.status(200).json({
			status: 'success',
			orders,
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: 'Order not added',
		});
	}
};

exports.getOrders = async (req, res, next) => {
	try {
		const userId = req.query.userid;
		const order = await Order.find({ userId });
		res.status(200).json({
			status: 'Success',
			results: order.length,
			order,
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: 'Order not fetched',
		});
	}
};
