const Order = require('./../Models/orderModel');

exports.addOrder = async (req,res,next) =>{
    try{
        const newOrder = await Order.create({
			name: req.body.name,
			type: req.body.type,
			price: req.body.price,
			description: req.body.description,
			userId: req.body.userId
		});
        res.status(200).json({
			status: 'success',
			data: {
				order: newOrder
			},
		});
    }catch(err)
    {
        res.status(404).json({
			status: 'fail',
			message: 'Order not added',
		});
    }
};

exports.getOrders = async (req,res,next) =>{
    try{
        const userId = req.params.id;
        const order = await Order.find({userId});
		res.status(200).json({
			status: 'Success',
			results: order.length,
			data: {
				order
			},
		});
    }catch(err)
    {
        res.status(404).json({
			status: 'fail',
			message: 'Order not fetched',
		});
    }
};