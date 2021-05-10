const express = require('express');
const router = express.Router();
const bcrpyt = require('bcrypt');
const authController = require('./../controllers/authControllerUser');
//const upload = multer({ dest: './uploads/serviceImg' });

const Store = require('../Models/stores');

router.post('/auth', (req, res) => {
	if (req.session.serviceProviderid) {
		return res.json({
			auth: true,
		});
	}
	//console.log(req.session.serviceProviderid);
	const { email, password } = req.body;
	try {
		Store.findOne({ email }).then((doc) => {
			if (!doc) {
				return res.json({ auth: false, notexist: 'No store exist with this email' });
			}

			bcrpyt.compare(password, doc.password).then((isMatch) => {
				if (!isMatch)
					return res
						.status(400)
						.json({ auth: false, wrongcredentials: 'Invalid Credentials' });

				req.session.serviceProviderid = doc._id;
				res.status(200).json({
					auth: true,
					message: 'signedin successfully',
					result: {
						id: doc._id,
						name: doc.storeName,
						location: doc.location,
						storeType: doc.storeType,
					},
				});
			});
		});
	} catch (e) {
		console.log(e);
	}

	//console.log(req.file);
});

router.get('/issignedin', authController.protect, async (req, res) => {
	const id = req.query.id;
	const store = await Store.findOne({ _id: id }).select('-password');
	if (store !== null) {
		let user = store;
		return res.json({
			status: 'success',
			user,
			typeofuser: 'serviceprovider',
		});
	} else {
		res.json({
			status: 'fail',
			error: 'Service Provider does not exist',
		});
	}
	// Store.findOne({ id })
	// 	.select('-password')
	// 	.then((user) => {
	// 		if (!user) {
	// 			return res.json({
	// 				status: 'fail',
	// 				error: 'Not signed in as Service Provider',
	// 			});
	// 		}
	// 		res.json({
	// 			status: 'success',
	// 			user,
	// 		});
	// 	});
});

router.get('/getserviceprovider', (req, res) => {
	const id = req.query.id;
	Store.findOne({ _id: id })
		.select('-password')
		.then((serviceprovider) => {
			return res.json(serviceprovider);
		});
});
module.exports = router;
