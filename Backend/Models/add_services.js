var mongoose = require('mongoose');

// create an schema
var servicesSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	serviceTitle: {
		type: String,
		required: true,
	},
	serviceImage: {
		type: String,
		required: true,
	},
	serviceDesc: {
		type: String,
		required: true,
	},
});
module.exports = mongoose.model('Service', servicesSchema);
