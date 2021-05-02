var express = require('express');
var app = express();
var cors = require('cors');
require('./db');
app.use(cors());
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
const map_ServicesToLocation = require('./Routes/map_ServicesToLocation');
const get_servicesforlocation = require('./Routes/get_servicesforlocation');

app.use('/add_services', add_services);
app.use('/add_location', add_location);
app.use('/map_ServicesToLocation', map_ServicesToLocation);
app.use('/get_servicesforlocation', get_servicesforlocation);

app.get('**', (req, res) => {
	res.send('You dont have access to this route');
});

app.listen(9000, () => {
	console.log('web application running on 9000');
});
