var express = require('express');
var app = express();
var cors = require('cors');
require('dotenv/config');
require('./db');
app.use(cors());
//Moddlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('uploads/'));

//Routes
app.get('/', function (req, res) {
	console.log('Request received....');

	res.send('Welcome to Web application development by Express');
});
const PORT = process.env.PORT || 9000;

const add_services = require('./Routes/add_services');
const add_location = require('./Routes/add_location');
const map_ServicesToLocation = require('./Routes/map_ServicesToLocation');
const get_servicesforlocation = require('./Routes/get_servicesforlocation');
const userRouter = require('./Routes/userRoutes');
const cartRouter = require('./Routes/cartRoutes');
const orderRouter = require('./Routes/orderRoutes');

app.use('/add_services', add_services);
app.use('/add_location', add_location);
app.use('/map_ServicesToLocation', map_ServicesToLocation);
app.use('/get_servicesforlocation', get_servicesforlocation);
app.use('/register_store', require('./Routes/register_Store.js'));
app.use('/auth_store', require('./Routes/auth_store.js'));
app.use('/get_store', require('./Routes/get_store.js'));
app.use('/add_products', require('./Routes/add_products.js'));
app.use('/user.route', require('./Routes/user.route.js'));
app.use('/users', userRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);

app.get('**', (req, res) => {
	res.send('You dont have access to this route');
});

app.listen(PORT, () => {
	console.log(`Web application running on ${PORT}`);
});
