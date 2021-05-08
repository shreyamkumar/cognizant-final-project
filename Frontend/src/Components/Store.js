import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import axios from '../axios';
import { selectUser, setUser } from '../features/userSlice';
import realAxios from 'axios';

function Store() {
	const dispatch = useDispatch();
	const match = useRouteMatch();
	const history = useHistory();
	const { location, storeId } = match.params;
	const { token } = useSelector(selectUser);
	useEffect(() => {
		const source = realAxios.CancelToken.source();
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		axios.get('/auth_store/issignedin', config).then((res) => {
			if (res.data.status === 'failed') {
				console.log('therer');
				history.push('/registerstore');
			} else {
				dispatch(setUser(res.data.user));
			}
		});
		return () => {
			source.cancel();
		};
	}, []);
	return (
		<div>
			<h1>hello</h1>
		</div>
	);
}

export default Store;
