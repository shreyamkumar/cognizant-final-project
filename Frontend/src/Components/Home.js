import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import AvailServices from './AvailServices';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ServiceProvider from './ServiceProvider';
import RegisterServiceProvider from './RegisterServiceProvider';
import Store from './Store';
import { useDispatch } from 'react-redux';
import Signin from './Signin';
import UserSignup from './UserSignup';
import UserSignin from './UserSignin';

function Home() {
	const [type, setType] = useState('');
	const [id, setId] = useState('');
	const dispatch = useDispatch();

	return (
		<div className="home">
			<Router>
				<Nav />
				<Route exact path="/">
					<AvailServices />
				</Route>
				<Route exact path={`/:location/:serviceName`}>
					<ServiceProvider />
				</Route>
				<Route path={`/registerstore`}>
					<RegisterServiceProvider />
				</Route>
				<Route path={`/store/:location/:storeId`}>
					<Store />
				</Route>
				<Route path={`/storesignin`}>
					<Signin />
				</Route>
				<Route path={`/signup`}>
					<UserSignup />
				</Route>
				<Route path={`/signin`}>
					<UserSignin />
				</Route>
			</Router>
		</div>
	);
}

export default Home;
