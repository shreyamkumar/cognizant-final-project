import React from 'react';

function HomeStatic() {
	const paraStyle = {
		fontSize: '14px',
		fontFamily: 'sans-serif',
		color: '#B7BAC3',
	};

	const style2 = {
		height: '200px',
		width: 'auto',
	};
	const style3 = {
		backgroundColor: '#171E30',
		color: 'white',
	};

	return (
		<div>
			<div className="container-fluid mt-5">
				{/* <div className="row" style={{ backgroundColor: 'rgba(243, 240, 240, 0.932)' }}>
					<div className="offset-md-4 col-md-2">
						<img
							className="img img-fluid mx-auto"
							style={{ height: '300px' }}
							src="../../Images/dunzo-app-be5ce8c58d3ad0b183757f34179879b4.png"
						/>
					</div>
					<div className="col-md-3 text-center my-auto" style={{ fontWeight: '700' }}>
						<span>
							All this from the convenience of your phone. Download the Dunzo mobile
							app.
						</span>
					</div>
				</div> */}

				<div style={style3} className="row mt-3">
					<div className="container mt-5">
						<div>
							<span style={{ fontSize: 'medium' }}>
								<b>You can’t stop time, but you can save it!</b>
							</span>
						</div>
						<div className="mt-2" style={paraStyle}>
							<p>
								Living in the city, there is never enough time to shop for
								groceries, pick-up supplies, grab food and wade through traffic on
								the way back home. How about we take care of all of the above for
								you? What if we can give you all that time back? Send packages
								across the city and get everything from food, groceries, medicines
								and pet supplies delivered right to your doorstep. From any store to
								your door, just make a list and we’ll make it disappear. Just Dunzo
								It!
							</p>
						</div>
						<div className="mt-5">
							<hr style={{ backgroundColor: '#B7BAC3' }} />
						</div>

						<div className="row">
							<div className="col-md-1 mt-5">
								<img
									src="../../Images/logo-footer-a7423f59ce95bf41719960ee8314ff2d.png"
									className="img img-fluid"
								/>
							</div>
							<div className="col-md-3 mt-5">
								<ul className="list-unstyled">
									<li>
										<b>DUNZO</b>
									</li>
									<li className="mt-2">About</li>
									<li className="mt-2">Jobs</li>
									<li className="mt-2">Contact</li>
									<li className="mt-2">Terms & Conditions</li>
									<li className="mt-2">Privacy Policy</li>
									<li className="mt-2">Dunzo For Partner</li>
									<li className="mt-2">Dunzo For Business</li>
								</ul>
							</div>
							<div className="col-md-3 mt-5">
								<ul className="list-unstyled">
									<li>
										<b>SERVICABLE CITIES</b>
									</li>
									<li className="mt-2">Banglore</li>
									<li className="mt-2">Pune</li>
									<li className="mt-2">Gurgaon</li>
									<li className="mt-2">Hyderabad</li>
									<li className="mt-2">New Delhi</li>
									<li className="mt-2">Chennai</li>
									<li className="mt-2">Mumbai</li>
								</ul>
							</div>
							<div className="col-md-2 mt-5">
								<ul className="list-unstyled">
									<li>
										<b>GET IN TOUCH</b>
									</li>
									<li className="mt-2">Email</li>
									<li className="mt-2">Twitter</li>
									<li className="mt-2">Facebook</li>
									<li className="mt-2">Instagram</li>
									<li className="mt-2">LinkedIn</li>
								</ul>
							</div>
							<div className="col-md-3 mt-5">
								<img
									src="../../Images/footer-mascot-37512998a23e1abed75aa6c883d8f0a1.png"
									className="img img-fluid "
									style={style2}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HomeStatic;
