const Cart = require('./../Models/cartModel');
const mongoose = require('mongoose');
exports.addItem = async (req, res, next) => {
	// console.log(req.body);
	// res.json(req.body);
	try {
		//console.log(req.body);
		const prod = await Cart.findOne({ prodId: req.body.prodId, userId: req.body.userId });
		console.log(prod);
		if (prod === null) {
			const newItem = await Cart.create({
				_id: new mongoose.Types.ObjectId(),
				name: req.body.name,
				type: req.body.type,
				price: parseInt(req.body.price),
				description: req.body.desc,
				userId: req.body.userId,
				storeId: req.body.storeId,
				prodId: req.body.prodId,
				quantity: 1,
			});
			return res.status(200).json({
				status: 'success',
				data: {
					item: newItem,
				},
			});
		} else {
			prod.quantity += 1;
			prod.price *= prod.quantity;
			prod.save().then((item) => {
				return res.json({
					status: 'success',
					item,
				});
			});
		}
	} catch (err) {
		return res.status(404).json({
			status: 'fail',
			message: 'Item not added to cart',
		});
	}
};
exports.getItems = async (req, res) => {
	//console.log(req.query);
	// res.json({
	// 	status: 'oka',
	// });
	try {
		const userId = req.query.userId;
		const cart = await Cart.find({ userId: userId });
		//console.log(cart);
		const ids = cart.map((item) => {
			return item.prodId;
		});
		res.status(200).json({
			status: 'Success',
			results: cart.length,
			cart,
			ids,
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};
exports.deleteItem = async (req, res, next) => {
	const { prodId, userId } = req.query;
	// res.json({
	// 	status: 'okay',
	// });
	try {
		//You have to send _id(Collection ID) for deleting in param
		const prod = await Cart.findOne({ prodId, userId });
		console.log(prod);
		if (prod.quantity === 1) {
			await Cart.findByIdAndDelete(prod._id);
			const cart = await Cart.find({ userId });
			const ids = cart.map((item) => {
				return item.prodId;
			});
			res.status(204).json({
				status: 'success',
				item: null,
				ids,
			});
		} else {
			prod.quantity -= 1;
			prod.price *= prod.quantity;
			const item = await prod.save();
			const cart = await Cart.find({ userId });
			const ids = cart.map((item) => {
				return item.prodId;
			});
			return res.json({
				status: 'success',
				item,
				ids,
			});
		}
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};
