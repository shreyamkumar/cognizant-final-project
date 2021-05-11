import React from 'react';

function Mobile() {
	return (
		<div>
			<div className="row" style={{ backgroundColor: 'rgba(243, 240, 240, 0.932)' }}>
				<div className="offset-md-4 col-md-2">
					<img
						className="img img-fluid mx-auto"
						style={{ height: '300px' }}
						src="../../Images/dunzo-app-be5ce8c58d3ad0b183757f34179879b4.png"
					/>
				</div>
				<div className="col-md-3 text-center my-auto" style={{ fontWeight: '700' }}>
					<span>
						All this from the convenience of your phone. Download the Dunzo mobile app.
					</span>
				</div>
			</div>
		</div>
	);
}

export default Mobile;
