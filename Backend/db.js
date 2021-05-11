const mongoose = require('mongoose');

mongoose.connect(
	process.env.DB_CONNECTION,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
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
