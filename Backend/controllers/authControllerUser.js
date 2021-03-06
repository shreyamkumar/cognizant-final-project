const crypto = require('crypto');
const { promisify } = require('util');
const User = require('./../Models/userModel');
const Store = require('./../Models/stores');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'my-cts-final-internship-project-secret';
const sendEmail = require('./../utils/email');
const bcrypt = require('bcrypt');
const signToken = (id) => {
	return jwt.sign({ id }, JWT_SECRET, {
		expiresIn: '2h',
	});
};
exports.signup = async (req, res) => {
	User.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			return res.json({
				status: 'fail',
				message: 'User already exist',
			});
		}
	});
	let userType = req.body.name === 'admin' ? 'admin' : 'customer';
	try {
		const newUser = User({
			name: req.body.name,
			password: req.body.password,
			email: req.body.email,
			mobile: req.body.mobile,
			address: req.body.address,
			typeofuser: userType,
		});
		const savedUser = await newUser.save();
		const token = signToken(newUser._id);

		try {
			await sendEmail({
				email: req.body.email,
				subject: 'Dunzo Welcome Mail',
				message: 'Welcome To Dunzo',
			});
			res.status(201).json({
				status: 'success',
				token,
				user: savedUser,
			});
		} catch (err) {
			res.status(500).json({
				status: 'fail',
				message: 'There was an error sending the email. Try again later',
				error: err,
			});
		}
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const store = await Store.findOne({ email });
		const newUser = await User.findOne({ email }).select('+password');
		if (store !== null) {
			let user = store;
			const isMatch = await bcrypt.compare(password, store.password);
			if (!isMatch) {
				return res.json({
					status: 'fail',
					message: 'Email or Password is incorrect',
				});
			}
			const token = signToken(store._id);
			return res.status(200).json({
				status: 'success',
				token,
				user,
				typeofuser: 'serviceprovider',
			});
		} else if (newUser !== null) {
			const user = await User.findOne({ email }).select('-password');

			if (!newUser || !(await newUser.correctPassword(password, newUser.password))) {
				return res.json({
					status: 'fail',
					message: 'Email or Password is incorrect',
				});
			}

			const token = signToken(user._id);
			return res.status(200).json({
				status: 'success',
				token,
				user,
				typeofuser: 'customer',
			});
		} else {
			return res.json({
				status: 'fail',
				message: 'User does not exist',
			});
		}
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};

exports.protect = async (req, res, next) => {
	try {
		let token;
		if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
			token = req.headers.authorization.split(' ')[1];
		}
		if (token === 'null') {
			return res.json({
				status: 'failed',
				message: 'You are not logged in',
			});
		}

		try {
			const decoded = await promisify(jwt.verify)(token, JWT_SECRET);
			req.query.id = decoded.id;
			//console.log(req.query);
		} catch (err) {
			return res.status(401).json({
				status: 'failed',
				message: 'Invalid Token Please Login Again',
			});
		}

		next();
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};
exports.issignedin = async (req, res) => {
	const id = req.query.id;
	const store = await Store.findOne({ _id: id }).select('-password');
	const customer = await User.findOne({ _id: id }).select('-password');
	if (store !== null) {
		let user = store;
		return res.json({
			status: 'success',
			user,
			typeofuser: 'serviceprovider',
		});
	} else if (customer !== null) {
		let user = customer;
		return res.json({
			status: 'success',
			user,
			typeofuser: 'customer',
		});
	} else {
		res.json({
			status: 'fail',
			error: 'User does not exist ',
		});
	}
};

exports.forgetPassword = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		const resetToken = user.createPasswordResetToken();
		await user.save({ validateBeforeSave: false });
		const resetUrl = `${req.protocol}://${req.get('host')}/users/resetPassword/${resetToken}`;
		const message = `Forgot Your Password. Reset It Now: ${resetUrl}`;
		try {
			await sendEmail({
				email: user.email,
				subject: 'Your Password reset token is valid for 10 mins',
				message,
			});
			res.status(200).json({
				status: 'success',
				message: 'Token sent to email',
			});
		} catch (err) {
			user.passwordResetToken = undefined;
			user.passwordResetExpires = undefined;
			await user.save({ validateBeforeSave: false });
			res.status(500).json({
				status: 'fail',
				message: 'There was an error sending the email. Try again later',
			});
		}
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: 'Not valid email',
		});
	}
};
exports.resetPassword = async (req, res, next) => {
	try {
		const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

		const user = await User.findOne({
			passwordResetToken: hashedToken,
			passwordResetExpires: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({
				status: 'fail',
				message: 'Token is invalid or has expired',
			});
		}
		user.password = req.body.password;
		user.passwordConfirm = req.body.passwordConfirm;
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save();

		const token = signToken(user._id);
		res.status(200).json({
			status: 'success',
			token,
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};

exports.updatePassword = async (req, res, next) => {
	try {
		const user = await User.findById(req.body._id).select('+password');

		if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
			return res.status(401).json({
				status: 'fail',
				message: 'Your current password is wrong.',
			});
		}

		user.password = req.body.password;
		user.passwordConfirm = req.body.passwordConfirm;
		await user.save();

		const token = signToken(user._id);
		res.status(200).json({
			status: 'success',
			token,
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: 'Invalid Id',
		});
	}
};
