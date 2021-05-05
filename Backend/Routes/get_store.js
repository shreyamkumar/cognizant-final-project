const express = require('express');
const router = express.Router();

//const upload = multer({ dest: './uploads/serviceImg' });

const Store = require('../Models/stores');

router.get('/', (req, res) => {
	const { location, storeType } = req.query;
	console.log(req.query);
	Store.find({ location: location, storeType: storeType }).then((docs) => {
		console.log(docs);
		if (!docs) return res.status(400).json({ message: 'No store exists' });

		const response = {
			count: docs.length,
			storeAvailable: docs.map((doc) => {
				return {
					id: doc._id,
					name: doc.storeName,
					location: doc.location,
					storeType: doc.storeType,
					imgUrl: doc.logo,
					address: doc.address,
				};
			}),
		};

		res.status(200).json(response);
	});
	//console.log(req.file);
});

module.exports = router;
