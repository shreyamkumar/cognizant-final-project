import React from 'react';

const ServicesToLocation = () => {
	return (
		<div>
			<div className="container-fluid mt-3">
				<form>
					<div className="row ml-1">
						<div className="col-md-4">
							<div className="form-group">
								<h4>
									<label htmlFor="location">Select location:</label>
								</h4>
								<select className="form-control" id="location" name="location">
									<option value="banglore">Banglore</option>
									<option value="pune">Pune</option>
									<option value="delhi">Delhi</option>
									<option value="indore">Indore</option>
									<option value="bhopal">Bhopal</option>
									<option value="Mohali">Mohali</option>
								</select>
							</div>
						</div>
					</div>
					<div className="row pl-5">
						<h4>Services</h4>
						<div className="col-md-2 ml-1">
							<div className="custom-control custom-checkbox">
								<input
									type="checkbox"
									className="custom-control-input"
									id="groceries"
									name="services"
									value="groceries"
								/>
								<label className="custom-control-label" htmlFor="groceries">
									Groceries
								</label>
							</div>
						</div>
						<div className="col-md-2">
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
						<div className="col-md-2">
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
						<div className="col-md-2">
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
					</div>
					<div className="row">
						<div className="offset-md-1 col-md-2">
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
						<div className="col-md-2">
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
					<div className="row text-center">
						<div className="col-md-12">
							<button className="btn btn-primary">Save</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
export default ServicesToLocation;
