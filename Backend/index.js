var express = require('express');
var app = express();

require('./db');

//Moddlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('uploads/serviceImg'));

//Routes
app.get('/', function (req, res) {
	console.log('Request received....');

	res.send('Welcome to Web application development by Express');
});

const add_services = require('./Routes/add_services');
const add_location = require('./Routes/add_location');

app.use('/add_services', add_services);
app.use('/add_location', add_location);

app.get('**', (req, res) => {
	res.send('You dont have access to this route');
});

app.listen(9090, () => {
	console.log('web application running on 9090');
});
