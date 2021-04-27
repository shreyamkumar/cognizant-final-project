const mongoose = require('mongoose');

mongoose.connect(
	'mongodb://localhost:27017/dunzo',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (!err) {
			console.log('databse connected>>>>>>>>');
		} else {
			console.log('database not connected');
		}
	}
);

module.exports = mongoose;
