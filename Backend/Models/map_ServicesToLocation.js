var mongoose = require('mongoose');

// create an schema
var mapservicesSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	serviceLocation: {
		type: String,
		required: true,
	},
	availServices: {
		type: Array,
		required: true,
	},
	availServicesId: {
		type: Array,
		required: true,
	},
});
module.exports = mongoose.model('MappedService', mapservicesSchema);
