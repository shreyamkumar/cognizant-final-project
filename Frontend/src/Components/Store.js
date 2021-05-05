import React, { useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import axios from '../axios';

function Store() {
	const match = useRouteMatch();
	const history = useHistory();
	const { location, storeId } = match.params;
	useEffect(() => {
		axios
			.get('/auth_store/issignedin', {
				withCredentials: true,
				params: {
					storeId,
				},
			})
			.then((res) => {
				// if (!res.data.auth) history.push('/storesignin');
				console.log(res.data);
			});
	}, []);
	return (
		<div>
			<h1>hello</h1>
		</div>
	);
}

export default Store;
