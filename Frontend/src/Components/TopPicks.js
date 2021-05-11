import React from 'react';

function TopPicks() {
	return (
		<div>
			<div className="container mt-5">
				<div>
					<h3>Top Picks For You</h3>
				</div>
				<div className="row">
					<div className="col-md-3 p-2">
						<img
							className="img img-fluid rounded"
							src="../../Images/d4b.jpg"
							alt="image not found"
						/>
					</div>
					<div className="col-md-3 p-2">
						<img
							className="img img-fluid rounded"
							src="../../Images/grocery.jpg"
							alt="image not found"
						/>
					</div>
					<div className="col-md-3 p-2">
						<img
							className="img img-fluid rounded"
							src="../../Images/restaurants.jpg"
							alt="image not found"
						/>
					</div>
					<div className="col-md-3 p-2">
						<img
							className="img img-fluid rounded"
							src="../../Images/send-packages.jpg"
							alt="image not found"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TopPicks;
