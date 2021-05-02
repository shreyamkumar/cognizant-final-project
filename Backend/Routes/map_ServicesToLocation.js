const express = require('express');
const router = express.Router();
const app = express();
//const upload = multer({ dest: './uploads/serviceImg' });
const mongoose = require('mongoose');

const MapServices = require('../Models/map_ServicesToLocation');

const unCommonServices = (first, second) => {
	const res = [];

	for (let j = 0; j < second.length; j++) {
		if (first.indexOf(second[j]) === -1) {
			res.push(second[j]);
		}
	}
	return res;
};

router.post('/', (req, res) => {
	// let mapservice = new MapServices({
	// 	_id: new mongoose.Types.ObjectId(),
	// 	serviceLocation: req.body.location,
	// 	availServices: req.body.mapservice,
	// });
	// mapservice.save().then((result) => {
	// 	//console.log(result);
	// 	res.status(201).json({
	// 		message: 'created successfully',
	// 		createdService: result,
	// 	});
	// });
	const reqLocation = req.body.location;
	MapServices.find({ serviceLocation: reqLocation }).then((doc) => {
		let error = '';
		if (doc.length != 0) {
			const data = doc[0];
			const uniqueServices = unCommonServices(data.availServices, req.body.mapservice);
			const uniqueServicesId = unCommonServices(data.availServicesId, req.body.mapserviceId);
			if (uniqueServices.length === 0) {
				error = 'The services are already mapped to this location';
			}
			data.availServices = [...data.availServices, ...uniqueServices];
			data.availServicesId = [...data.availServicesId, ...uniqueServicesId];
			data.save();
		} else {
			let mapservice = new MapServices({
				_id: new mongoose.Types.ObjectId(),
				serviceLocation: reqLocation,
				availServices: req.body.mapservice,
				availServicesId: req.body.mapserviceId,
			});
			mapservice.save().then((result) => {
				//console.log(result);
			});
		}

		res.status(201).json({
			message: 'created successfully',
			error: error,
			// createdService: result,
		});
	});
});

module.exports = router;
