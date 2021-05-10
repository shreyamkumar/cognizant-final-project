var mongoose = require('mongoose');

// create an schema
var storeSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	ownerName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	storeName: {
		type: String,
		required: true,
	},
	products: {
		type: Array,
		default: [
			{
				_id: mongoose.Schema.Types.ObjectId,
				name: String,
				price: String,
				desc: String,
				category: String,
				prodImg: String,
			},
		],
	},
	storeType: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	logo: {
		type: String,
		required: true,
	},
	typeofuser: {
		type: String,
		required: true,
	},
});
module.exports = mongoose.model('Store', storeSchema);
