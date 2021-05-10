import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../axios';
import { selectCurrentLocation, setCurrentLocation } from '../features/currentlocationSlice';
import '../Styles/AvailServices.css';

function AvailServices() {
	const dispatch = useDispatch();
	const currentLocation = useSelector(selectCurrentLocation);
	const [availServices, setAvailServices] = useState([]);
	const [location, setLocation] = useState('');
	const [getLocations, setGetLocations] = useState([]);
	const [message, setMessage] = useState('');

	const handleSelect = (e) => {
		dispatch(setCurrentLocation(e.target.value));
		setAvailServices([]);
		setLocation(e.target.value);
	};

	useEffect(() => {
		axios
			.get('/get_servicesforlocation', {
				params: {
					location: currentLocation.location,
				},
			})
			.then((res) => {
				if (res.data.message) {
					setMessage(res.data.message);
				} else {
					setMessage('');
				}
				setAvailServices(res.data.servicesAvailable);
			});
	}, [location]);

	useEffect(() => {
		setLocation(currentLocation.location);
		axios.get('/add_location').then((response) => {
			let count = response.data.count;
			setGetLocations(response.data.locations);
		});
	}, []);

	return (
		<div className="availServices">
			{/* <nav aria-label="breadcrumb">
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">{currentLocation.location}</a>
					</li>
				</ol>
			</nav> */}
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
				{message && <h1>We are coming to your location very soon.....</h1>}
				{availServices &&
					availServices.map((service) => (
						<Link
							className="service_link"
							to={`/${location}/${service.serviceName}`}
							key={service.id}>
							<div class="custom_card">
								<img
									className="service_img"
									alt={service.serviceName}
									src={`http://localhost:9000/${service.imgUrl}`}></img>
								{/* <div className="card_text">
									<h5>{service.serviceName}</h5>
									<p>{service.serviceDesc}</p>
								</div> */}
							</div>
						</Link>
					))}
			</div>
		</div>
	);
}

export default AvailServices;
