import React, { useState } from 'react';
import '../Styles/ServicesToLocation.css';

const ServicesToLocation = () => {
	const [location, setLocation] = useState('');
	const [services, setServices] = useState([]);

	const handleSelect = (e) => {
		setLocation(e.target.value);
		console.log(location);
	};

	const handleCheck = () => {};
	return (
		<div className="serviceToLocation">
			<div className="container-fluid mt-3">
				<form>
					<div className="location">
						<label htmlFor="location">Select location:</label>
						<select
							className="form-control"
							id="location"
							name="location"
							onChange={(e) => handleSelect(e)}>
							<option value="banglore">Banglore</option>
							<option value="pune">Pune</option>
							<option value="delhi">Delhi</option>
							<option value="indore">Indore</option>
							<option value="bhopal">Bhopal</option>
							<option value="Mohali">Mohali</option>
						</select>
					</div>

					<div className="mt-2">
						<h5>Services</h5>
						<div className="services_options">
							<div className="options">
								<div className="custom-control custom-checkbox">
									<input
										type="checkbox"
										className="custom-control-input"
										id="groceries"
										name="services"
										value="groceries"
										onChange={handleCheck}
									/>
									<label className="custom-control-label" htmlFor="groceries">
										Groceries
									</label>
								</div>
							</div>
							<div className="options">
								<div className="custom-control custom-checkbox">
									<input
										type="checkbox"
										className="custom-control-input"
										id="restaurants"
										name="services"
										value="restaurants"
									/>
									<label className="custom-control-label" htmlFor="restaurants">
										Restaurants
									</label>
								</div>
							</div>
							<div className="options">
								<div className="custom-control custom-checkbox">
									<input
										type="checkbox"
										className="custom-control-input"
										id="panshop"
										name="services"
										value="panshop"
									/>
									<label className="custom-control-label" htmlFor="panshop">
										Panshop
									</label>
								</div>
							</div>
							<div className="options">
								<div className="custom-control custom-checkbox">
									<input
										type="checkbox"
										className="custom-control-input"
										id="medicines"
										name="services"
										value="medicines"
									/>
									<label className="custom-control-label" htmlFor="medicines">
										Restaurants
									</label>
								</div>
							</div>

							<div className="options">
								<div className="custom-control custom-checkbox">
									<input
										type="checkbox"
										className="custom-control-input"
										id="pet"
										name="services"
										value="pet"
									/>
									<label className="custom-control-label" htmlFor="pet">
										Pet Supplies{' '}
									</label>
								</div>
							</div>
							<div className="options">
								<div className="custom-control custom-checkbox">
									<input
										type="checkbox"
										className="custom-control-input"
										id="pick"
										name="services"
										value="pick"
									/>
									<label className="custom-control-label" htmlFor="pick">
										Pick and Drop{' '}
									</label>
								</div>
							</div>
						</div>
					</div>
					<div className="row mt-3">
						<div className="col-md-12">
							<button type="submit" className="btn btn-primary">
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
