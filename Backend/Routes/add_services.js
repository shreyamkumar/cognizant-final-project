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
		cb(null, file.originalname);
	},
});

// const fileFilter = (req, file, cb) => {
// 	if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
// 		cb(null, true);
// 	} else {
// 		cb(null, false);
// 	}
// };

const upload = multer({ storage: storage });
const Service = require('../Models/add_services');

router.post('/', upload.single('serviceImage'), (req, res, next) => {
	const file = req.file;
	Service.find({ serviceTitle: req.body.title }).then((doc) => {
		if (doc.length === 0) {
			let index = file.path.lastIndexOf('\\');
			let imgUrl = file.path.substring(index + 1, file.path.length);

			const service = new Service({
				_id: new mongoose.Types.ObjectId(),
				serviceTitle: req.body.title,
				serviceDesc: req.body.desc,
				serviceImage: imgUrl,
			});

			service.save().then((result) => {
				//console.log(result);
				req.session.ServiceId = result._id;

				console.log(req.session.ServiceId);
				res.status(201).json({
					message: 'created successfully',
					createdService: result,
				});
			});
		} else {
			res.json({
				error: 'Service already exists',
			});
		}
	});
	//console.log(req.file);
});

router.get('/checkSignin', (req, res) => {
	if (req.session.ServiceId) {
		return res.json({
			message: 'signedin',
		});
	} else {
		return res.json({
			message: 'not signedin',
		});
	}
});
router.get('/checkSignout', (req, res) => {
	if (req.session.ServiceId) {
		req.session.destroy();
		return res.json({
			message: 'signedout',
		});
	} else {
		return res.json({
			message: 'not signedin',
		});
	}
});

router.get('/', (req, res) => {
	//console.log('hello');
	//console.log(req.session);
	Service.find().then((docs) => {
		const response = {
			count: docs.length,
			services: docs.map((doc) => {
				return {
					id: doc._id,
					title: doc.serviceTitle,
					serviceImgUrl: doc.serviceImage,
					desc: doc.serviceDesc,
				};
			}),
		};

		res.status(201).json(response);
	});
});
module.exports = router;
