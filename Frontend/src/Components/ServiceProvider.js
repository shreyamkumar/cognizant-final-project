import React, { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import axios from '../axios';

import '../Styles/ServiceProvider.css';
import HomeStatic from './HomeStatic';
function ServiceProvider() {
	const match = useRouteMatch();
	const { location, serviceName } = match.params;
	const [message, setMessage] = useState('');
	const [count, setCount] = useState('');
	const [serviceProvider, setServiceProvider] = useState([]);
	useEffect(() => {
		axios
			.get('/get_store', {
				params: {
					location: location,
					storeType: serviceName,
				},
			})
			.then((res) => {
				if (res.data.message) {
					setMessage(res.data.message);
				} else {
					setMessage('');
					setCount(res.data.count);
					setServiceProvider(res.data.storeAvailable);
				}
			});
	}, []);
	return (
		<div className="serviceprovider">
			<div className="heading">
				<p className="heading_details">
					<h1 className="store_number">{serviceName}</h1>
					<h3 className="store_number">{count} Stores</h3>
				</p>
			</div>
			<div className="store_container">
				{serviceProvider &&
					serviceProvider.map((service) => (
						<Link
							className="store_card_link"
							to={`/${location}/${serviceName}/${service.id}`}
							key={service.id}>
							<div class="store_card">
								<img
									className="store_img"
									alt={service.name}
									src={`http://localhost:9000/${service.imgUrl}`}></img>
								<div className="storecard_text">
									<h5>{service.name}</h5>
									<p>
										{service.address}, {service.location}
									</p>
								</div>
							</div>
						</Link>
					))}
			</div>
			<HomeStatic />
		</div>
	);
}

export default ServiceProvider;
