import React, { useEffect, useState } from 'react';
import '../Styles/ServicesToLocation.css';
import axios from '../axios';
import mongoose from 'mongoose';
const ServicesToLocation = (props) => {
	const [location, setLocation] = useState('');
	const [error, setError] = useState({});
	const [services, setServices] = useState([]);
	const [servicesId, setServicesId] = useState([]);
	const [getLocations, setGetLocations] = useState([]);
	const [getServices, setGetServices] = useState([]);
	const closeModal = props.onClick;
	const [disable, setDisable] = useState(true);

	const handleSelect = (e) => {
		setError((error) => ({ ...error, locations: '' }));
		setLocation(e.target.value);
	};
	const handleCheck = (e) => {
		let val = e.target.value;
		let valId = mongoose.Types.ObjectId(e.target.id);
		let index = services.indexOf(val);

		if (index === -1) {
			setError((error) => ({ ...error, services: '' }));
			setServices((services) => [...services, val]);
			setServicesId((servicesId) => [...servicesId, valId]);
		} else {
			if (services.length === 1) {
				setError((error) => ({ ...error, services: 'Please select the services' }));
			}
			let tempServices = [...services];
			tempServices.splice(index, 1);
			let tempServicesId = [...servicesId];
			tempServicesId.splice(index, 1);
			setServices(tempServices);
			setServicesId(tempServicesId);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (location === '') {
			setError((error) => ({ ...error, locations: 'Please select the location' }));
		} else {
		}
		if (services.length === 0) {
			setError((error) => ({ ...error, services: 'Please select the services' }));
		} else {
			await axios
				.post('/map_ServicesToLocation', {
					location: location,
					mapservice: services,
					mapserviceId: servicesId,
				})
				.then((res) => {
					setError((error) => ({ ...error, response: res.data.error }));
					if (!res.data.error) {
						setError((error) => ({ ...error, success: res.data.message }));
						setTimeout(function () {
							closeModal();
						}, 1000);
					}
					setTimeout(function () {
						setError({});
					}, 1000);
				});
		}
	};

	const compare = (a, b) => {
		if (a.location < b.location) {
			return -1;
		} else if (a.location > b.location) {
			return 1;
		}
		return 0;
	};

	useEffect(() => {
		axios.get('/add_location').then((response) => {
			let count = response.data.count;
			setGetLocations(response.data.locations.sort(compare));
		});

		axios.get('/add_services').then((response) => {
			let count = response.data.count;
			setGetServices(response.data.services);
		});
		return () => {};
	}, []);

	useEffect(() => {
		if (Object.keys(error).length >= 2) {
			if (error.locations === '' && error.services === '') {
				setDisable(false);
			} else {
				setDisable(true);
			}
		} else {
			setDisable(true);
		}
	}, [error]);

	return (
		<div className="serviceToLocation">
			<div className="container-fluid mt-3">
				{error.success && (
					<div class="alert alert-success" role="alert">
						Location is successfully added
					</div>
				)}
				{error.response && <p className="error">{error.response}</p>}
				<form>
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
						{error.locations && <p className="error">{error.locations}</p>}
					</div>

					<div className="mt-2">
						<h5>Services</h5>
						<div className="services_options">
							{getServices.map((service) => (
								<div className="options" key={service.id}>
									<div className="custom-control custom-checkbox">
										<input
											type="checkbox"
											className="custom-control-input"
											id={service.id}
											name="services"
											value={service.title}
											onChange={handleCheck}
										/>
										<label
											className="custom-control-label serviceLabel"
											htmlFor={service.id}>
											{service.title}
										</label>
									</div>
								</div>
							))}
						</div>

						{error.services && <p className="error">{error.services}</p>}
					</div>
					<div className="row mt-3">
						<div className="col-md-12">
							<button
								type="submit"
								disabled={disable}
								className="btn btn-primary"
								onClick={(e) => handleSubmit(e)}>
								Map Services
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
export default ServicesToLocation;
