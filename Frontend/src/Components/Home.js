import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import AvailServices from './AvailServices';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ServiceProvider from './ServiceProvider';
import RegisterServiceProvider from './RegisterServiceProvider';
import Store from './Store';
import axios from '../axios';
import { setUser } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import Signin from './Signin';

function Home() {
	const [type, setType] = useState('');
	const [id, setId] = useState('');
	const dispatch = useDispatch();
	// useEffect(() => {
	// 	axios.get('/user.route').then((res) => {
	// 		if (res.data.type && res.data.id) {
	// 			setType(res.data.type);
	// 			setId(res.data.id);
	// 		} else {
	// 			setType('customer');
	// 		}
	// 	});
	// 	return () => {};
	// }, []);
	useEffect(() => {
		axios.get('/getserviceprovider').then((res) => {
			dispatch(setUser(res.data.serviceprovider));
		});
		return () => {};
	}, [id]);
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
			</Router>
		</div>
	);
}

export default Home;
