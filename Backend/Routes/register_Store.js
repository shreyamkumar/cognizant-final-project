const express = require('express');
const router = express.Router();
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'my-cts-final-internship-project-secret';
const multer = require('multer');
//const upload = multer({ dest: './uploads/serviceImg' });
const mongoose = require('mongoose');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, 'store' + file.originalname);
	},
});

const upload = multer({ storage: storage });
const Store = require('../Models/stores');

router.post('/', upload.single('storeImage'), (req, res, next) => {
	const file = req.file;
	Store.find({ email: req.body.email }).then((doc) => {
		if (doc.length === 0) {
			let index = file.path.lastIndexOf('\\');
			let imgUrl = file.path.substring(index + 1, file.path.length);

			const newStore = new Store({
				_id: new mongoose.Types.ObjectId(),
				ownerName: req.body.ownerName,
				email: req.body.email,
				password: req.body.password,
				storeName: req.body.storeName,
				storeType: req.body.storeType,
				address: req.body.address,
				location: req.body.location,
				logo: imgUrl,
				typeofuser: 'serviceprovider',
			});

			bcrpyt.genSalt(10, (err, salt) => {
				bcrpyt.hash(newStore.password, salt, (err, hash) => {
					if (err) throw err;
					newStore.password = hash;

					newStore.save().then((store) => {
						jwt.sign(
							{ id: store._id },
							JWT_SECRET,
							{ expiresIn: '2h' },
							(err, token) => {
								if (err) throw err;
								res.status(201).json({
									staus: 'success',
									token,
									user: {
										id: store._id,
										name: store.storeName,
										location: store.location,
										storeType: store.storeType,
										address: store.address,
										type: 'serviceprovider',
									},
								});
							}
						);
						//console.log(result);
					});
				});
			});
		} else {
			res.json({
				error: 'Store exist with same email id',
			});
		}
	});
	//console.log(req.file);
});

// router.get('/', (req, res, next) => {
// 	//console.log('hello');
// 	Service.find().then((docs) => {
// 		const response = {
// 			count: docs.length,
// 			services: docs.map((doc) => {
// 				return {
// 					id: doc._id,
// 					title: doc.serviceTitle,
// 					serviceImgUrl: doc.serviceImage,
// 					desc: doc.serviceDesc,
// 				};
// 			}),
// 		};

// 		res.status(201).json(response);
// 	});
// });
module.exports = router;
