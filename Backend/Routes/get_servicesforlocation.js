const express = require('express');
const router = express.Router();

const Location = require('../Models/map_ServicesToLocation');
const Service = require('../Models/add_services');

router.get('/', (req, res) => {
	let reqLocation = req.query.location;

	Location.find({ serviceLocation: reqLocation }).then((doc) => {
		if (doc.length >= 1) {
			const serviceArray = doc[0].availServices;
			Service.find({ serviceTitle: { $in: serviceArray } }).then((docs) => {
				const response = {
					count: docs.length,
					servicesAvailable: docs.map((doc) => {
						return {
							id: doc._id,
							serviceName: doc.serviceTitle,
							serviceDesc: doc.serviceDesc,
							imgUrl: doc.serviceImage,
						};
					}),
				};
				res.status(201).json(response);
			});
		} else {
			res.json({
				message: 'No services for this location',
			});
		}
	});
});

module.exports = router;
