import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import axios from '../axios';

function Home() {
	const [availServices, setAvailServices] = useState([]);
	const [location, setLocation] = useState('');
	const [getLocations, setGetLocations] = useState([]);

	const handleSelect = (e) => {
		setLocation(e.target.value);
		setAvailServices([]);
	};

	useEffect(() => {
		console.log(location);
		axios
			.get('/get_servicesforlocation', {
				params: {
					location: location,
				},
			})
			.then((res) => {
				console.log(res.data);
				setAvailServices(res.data.servicesAvailable);
			});
	}, [location]);
	useEffect(() => {
		axios.get('/add_location').then((response) => {
			let count = response.data.count;
			setGetLocations(response.data.locations);
			//console.log(response.data.locations);
		});
	}, []);

	const renderServiceCard = (service) => <div>hello</div>;

	return (
		<div className="home">
			<Nav />
			<div className="location">
				<label htmlFor="location">Select location:</label>
				<select
					className="form-control"
					id="location"
					name="location"
					defaultValue={'DEFAULT'}
					onChange={(e) => handleSelect(e)}>
					<option value="DEFAULT" disabled>
						Select Location
					</option>
					{getLocations.map((loc) => (
						<option key={loc.location} value={loc.location}>
							{loc.location}
						</option>
					))}
				</select>
			</div>
			{availServices.map((service) => (
				<div className="serviceCard" key={service.id}>
					<h4>{service.serviceName}</h4>
					<h5>{service.serviceDesc}</h5>
				</div>
			))}
		</div>
	);
}

export default Home;
