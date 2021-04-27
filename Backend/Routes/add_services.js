const express = require('express');
const router = express.Router();

const multer = require('multer');
//const upload = multer({ dest: './uploads/serviceImg' });
const mongoose = require('mongoose');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads/serviceImg/');
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
	//console.log(req.file);

	const service = new Service({
		_id: new mongoose.Types.ObjectId(),
		serviceTitle: req.body.title,
		serviceDesc: req.body.desc,
		serviceImage: req.file.path,
	});

	service.save().then((result) => {
		//console.log(result);
		res.status(201).json({
			message: 'created successfully',
			createdService: result,
		});
	});
});

router.get('/', (req, res, next) => {
	//console.log('hello');
	Service.find().then((docs) => {
		const response = {
			count: docs.length,
			services: docs.map((doc) => {
				return {
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
