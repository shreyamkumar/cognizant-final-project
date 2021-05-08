const Cart = require('./../Models/cartModel');

exports.addItem = async (req,res,next) =>{
    try{
        const newItem = await Cart.create({
			name: req.body.name,
			type: req.body.type,
			price: req.body.price,
			description: req.body.description,
			userId: req.body.userId,
		});
        res.status(200).json({
			status: 'success',
			data: {
				item: newItem
			},
		});
    }
    catch(err)
    {
        res.status(404).json({
			status: 'fail',
			message: 'Item not added to cart',
		});
    }
}
exports.getItems = async (req,res,next)=>{
    try{
        const userId = req.params.id;
        const cart = await Cart.find({userId});
		res.status(200).json({
			status: 'Success',
			results: cart.length,
			data: {
				cart
			},
		});
    }catch(err)
    {
        res.status(404).json({
			status: 'fail',
			message: err,
		});
    }
}
exports.deleteItem = async (req,res,next) =>{
    try{
        //You have to send _id(Collection ID) for deleting in param
        await Cart.findByIdAndDelete(req.params.id);
        res.status(204).json({
			status: 'success',
			data: null,
		});
    }catch(err)
    {
        res.status(404).json({
			status: 'fail',
			message: err,
		});
    }
}