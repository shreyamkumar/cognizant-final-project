var mongoose = require('mongoose');

// create an schema
var locationSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	locationName: {
		type: String,
		required: true,
	},
	locationId: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
});
module.exports = mongoose.model('Location', locationSchema);
