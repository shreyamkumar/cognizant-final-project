import React, { useState, useEffect } from 'react';
import axios from 'axios';
let UserSignin = (props) => {
	const [formData, setFormData] = useState({
		email: {
			name: 'email',
			value: '',
		},
		password: {
			name: 'password',
			value: '',
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post('/users/login', {
				email: formData.email.value,
				password: formData.password.value,
			})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const changeHandler = (e) => {
		const updatedFormDataElement = { ...formData[e.target.name] };
		updatedFormDataElement.value = e.target.value;
		setFormData((formData) => ({
			...formData,
			[e.target.name]: updatedFormDataElement,
		}));
	};
	return (
		<div className="p-3">
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input
						type="text"
						className="form-control"
						name="email"
						placeholder="Enter Email"
						onChange={(e) => changeHandler(e)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						className="form-control"
						name="password"
						placeholder="Enter Password"
						onChange={(e) => changeHandler(e)}
					/>
				</div>

				<div className="text-center">
					<button type="submit" className="btn btn-primary" onClick={handleSubmit}>
						Login
					</button>
				</div>
			</form>
		</div>
	);
};
export default UserSignin;
