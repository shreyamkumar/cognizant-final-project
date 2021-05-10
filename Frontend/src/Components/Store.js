import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import axios from '../axios';
import { selectUser, setUser } from '../features/userSlice';
import realAxios from 'axios';
import ProductsView from './ProductsView';

function Store() {
	const dispatch = useDispatch();
	const match = useRouteMatch();
	const history = useHistory();
	const { user } = useSelector(selectUser);
	const { storeId } = match.params;
	const { token } = useSelector(selectUser);
	useEffect(() => {
		console.log(match.params);
		const source = realAxios.CancelToken.source();
		const token = localStorage.getItem('token');
		if (token && user && user.typeofuser === 'serviceprovider') {
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};
			axios.get('/auth_store/issignedin', config).then((res) => {
				if (res.data.status === 'success') {
					dispatch(setUser(res.data.user));
				} else if (res.data.status === 'fail') {
					history.push('/');
				}
				// else {
				// 	dispatch(setUser(res.data.user));
				// 	history.push(`/store/${res.data.user.location}/${res.data.user._id}`);
				// }
			});
		}
		return () => {
			source.cancel();
		};
	}, [token]);
	return (
		<div>
			<ProductsView id={storeId} />
		</div>
	);
}

export default Store;
