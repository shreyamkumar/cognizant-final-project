const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Location = require('../Models/add_location');

router.post('/', (req, res) => {
	Location.find({ locationId: req.body.id }).then((doc) => {
		if (doc.length === 0) {
			const location = new Location({
				_id: new mongoose.Types.ObjectId(),
				locationName: req.body.location,
				locationId: req.body.id,
				state: req.body.state,
				country: req.body.country,
			});
			location.save().then((result) => {
				res.status(201).json({
					message: 'created successfully',
					createdService: result,
				});
			});
		} else {
			res.json({
				error: 'There is an existing location with the same pin code',
			});
		}
	});
});

router.get('/', (req, res) => {
	Location.find().then((docs) => {
		const response = {
			count: docs.length,
			locations: docs.map((doc) => {
				return {
					location: doc.locationName,
					id: doc.locationId,
					state: doc.state,
					country: doc.country,
				};
			}),
		};
		res.status(201).json(response);
	});
});

module.exports = router;
