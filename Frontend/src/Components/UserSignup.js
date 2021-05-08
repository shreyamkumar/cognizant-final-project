import React, { useState, useEffect } from 'react';
import axios from '../axios';

let UserSignup = (props) => {
	const [formData, setFormData] = useState({
		name: {
			name: 'name',
			value: '',
		},
		email: {
			name: 'email',
			value: '',
		},
		password: {
			name: 'password',
			value: '',
			min: 8,
		},
		passwordConfirm: {
			name: 'passwordConfirm',
			value: '',
			min: 8,
		},
		mobile: {
			name: 'mobile',
			value: '',
			min: 10,
			max: 10,
		},
		address: {
			name: 'address',
			value: '',
		},
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post('/users/signup', {
				name: formData.name.value,
				email: formData.email.value,
				password: formData.password.value,
				passwordConfirm: formData.passwordConfirm.value,
				mobile: formData.mobile.value,
				address: formData.address.value,
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
			<form>
				<div className="form-group">
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						className="form-control"
						name="email"
						placeholder="Enter Name"
						onChange={(e) => changeHandler(e)}
					/>
				</div>
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
				<div className="form-group">
					<label htmlFor="passwordConfirm">Confirm Password:</label>
					<input
						type="password"
						className="form-control"
						name="passwordConfirm"
						placeholder="Enter Confirm Password"
						onChange={(e) => changeHandler(e)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="mobile">Mobile:</label>
					<input
						type="number"
						className="form-control"
						name="mobile"
						placeholder="Enter Mobile"
						onChange={(e) => changeHandler(e)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="address">Address:</label>
					<input
						type="text"
						className="form-control"
						name="address"
						placeholder="Enter Address"
						onChange={(e) => changeHandler(e)}
					/>
				</div>

				<div className="text-center">
					<button type="submit" className="btn btn-primary" onClick={handleSubmit}>
						SignUp
					</button>
				</div>
			</form>
		</div>
	);
};
export default UserSignup;
