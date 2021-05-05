import React, { useState } from 'react';
import { useHistory } from 'react-router';
import axios from '../axios';
function Signin() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post('/auth_store/auth', {
				email,
				password,
			})
			.then((res) => {
				console.log(res.data);
				if (res.data.auth) {
					//history.push(`/store/${res.data.result.location}/${res.data.result.id}`);
				}
			});
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button onSubmit={(e) => handleSubmit(e)}>Signin</button>
			</form>
		</div>
	);
}

export default Signin;
