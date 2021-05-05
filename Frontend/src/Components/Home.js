import React from 'react';
import Nav from './Nav';
import AvailServices from './AvailServices';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ServiceProvider from './ServiceProvider';

function Home() {
	return (
		<div className="home">
			<Router>
				<Nav />
				<Route exact path="/">
					<AvailServices />
				</Route>
				<Route path={`/:location/:serviceName`}>
					<ServiceProvider />
				</Route>
			</Router>
		</div>
	);
}

export default Home;
