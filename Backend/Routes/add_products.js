const express = require('express');
const router = express.Router();

const multer = require('multer');
//const upload = multer({ dest: './uploads/serviceImg' });
const mongoose = require('mongoose');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, 'product' + file.originalname);
	},
});

const upload = multer({ storage: storage });
const Product = require('../Models/stores');

router.post('/', upload.single('productImage'), (req, res, next) => {
	const file = req.file;
	Product.findOne({ _id: req.body.id }).then((doc) => {
		if (doc.length !== null) {
			let index = file.path.lastIndexOf('\\');
			let imgUrl = file.path.substring(index + 1, file.path.length);
			const product = {
				_id: new mongoose.Types.ObjectId(),
				name: req.body.name,
				price: req.body.price,
				desc: req.body.desc,
				category: req.body.category,
				prodImg: imgUrl,
			};
			doc.products = [...doc.products, product];
			// Product.updateOne(
			// 	{ _id: req.body.id },
			// 	{
			// 		$push: {
			// 			products: product,
			// 		},
			// 	}
			// );
			//console.log(product);
			//console.log(doc);
			doc.save().then((result) => {
				res.status(201).json({
					status: 'success',
					message: 'created successfully',
					createdService: result,
				});
			});
		} else {
			res.json({
				status: 'fail',
				error: 'Login First',
			});
		}
	});

	//console.log(req.file);
});

// router.get('/checkSignin', (req, res) => {
// 	if (req.session.ServiceId) {
// 		return res.json({
// 			message: 'signedin',
// 		});
// 	} else {
// 		return res.json({
// 			message: 'not signedin',
// 		});
// 	}
// });
// router.get('/checkSignout', (req, res) => {
// 	if (req.session.ServiceId) {
// 		req.session.destroy();
// 		return res.json({
// 			message: 'signedout',
// 		});
// 	} else {
// 		return res.json({
// 			message: 'not signedin',
// 		});
// 	}
// });

router.get('/', (req, res) => {
	const id = req.query.id;
	Product.findOne({ _id: id }).then((doc) => {
		if (doc) {
			const product = {
				count: doc.products.length,
				products: doc.products.map((prod) => {
					return {
						id: prod._id,
						name: prod.name,
						price: prod.price,
						desc: prod.desc,
						category: prod.category,
						imgUrl: prod.prodImg,
					};
				}),
			};
			return res.json({
				status: 'success',
				product,
			});
		}
	});

	// 	res.status(201).json(response);
	// });
	// res.json({
	// 	message: 'hello',
	// });
});
module.exports = router;
