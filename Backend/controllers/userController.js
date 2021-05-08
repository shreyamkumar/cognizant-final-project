const User = require('./../Models/userModel');

const filterObj = (obj, ...allowedFields) => {
	const newObj = {};
	Object.keys(obj).forEach((el) => {
		if (allowedFields.includes(el)) newObj[el] = obj[el];
	});
	return newObj;
};

exports.getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		res.status(200).json({
			status: 'Success',
			results: users.length,
			data: {
				users,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};

exports.deleteUser = async (req, res, next) => {
	try {
		console.log(req.params.id);
		await User.findByIdAndDelete(req.params.id);
		res.status(204).json({
			status: 'success',
			data: null,
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};
exports.updateUser = async (req, res, next) => {
	try {
		const id = req.body._id;
		const filteredBody = filterObj(req.body, 'name', 'email', 'mobile', 'address');
		const updatedUser = await User.findByIdAndUpdate(id, filteredBody, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({
			status: 'success',
			data: {
				user: updatedUser,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};
exports.deleteUser = async (req, res, next) => {
	try {
		await User.findByIdAndDelete(req.body._id);
		res.status(204).json({
			status: 'success',
			message: 'User Deleted',
			data: null,
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};
