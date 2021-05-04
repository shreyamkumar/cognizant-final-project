import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios';
import '../Styles/AvailServices.css';

function AvailServices() {
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
		});
	}, []);

	return (
		<div className="availServices">
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

			<div className="service_cards">
				{availServices &&
					availServices.map((service) => (
						<Link to={`/${location}/${service.serviceName}`}>
							<div class="custom_card">
								<img
									alt={service.serviceName}
									src={`http://localhost:9000/${service.imgUrl}`}></img>
								<div className="card_text">
									<h5>{service.serviceName}</h5>
									<p>{service.serviceDesc}</p>
								</div>
							</div>
						</Link>
					))}
			</div>
		</div>
	);
}

export default AvailServices;
