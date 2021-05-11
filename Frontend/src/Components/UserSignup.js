import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import axios from '../axios';
import { setUser } from '../features/userSlice';
import '../Styles/UserSignin.css';

const UserSignup = (props) => {
	const [formData, setFormData] = useState({
		name: {
			name: 'Name',
			value: '',
			max: 30,
			min: 5,
		},
		email: {
			name: 'Email',
			value: '',
		},
		password: {
			name: 'Password',
			value: '',
			min: 8,
		},
		passwordConfirm: {
			name: 'PasswordConfirm',
			value: '',
			min: 8,
		},
		mobile: {
			name: 'Mobile',
			value: '',
			min: 10,
			max: 10,
		},
		address: {
			name: 'Address',
			value: '',
			min: 10,
			max: 100,
		},
	});
	const [disable, setDisable] = useState(true);
	const [error, setError] = useState({});
	const [message, setMessage] = useState('');
	const dispatch = useDispatch();
	const history = useHistory();
	const validateFormData = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		const validateElement = { ...formData[name] };
		if (e.target.name === 'email') {
			let index = e.target.value.indexOf('@');
			let err = '';
			if (index === -1) {
				err = `Invalid Email`;
			}
			setError({ ...error, [name]: err });
			return err === '' ? 1 : 0;
		}
		if (value.length >= validateElement.min && value.length <= validateElement.max) {
			setError({ ...error, [name]: '' });
			return 1;
		} else if (e.target.name === 'passwordConfirm') {
			let err = '';
			if (e.target.value !== formData.password.value) {
				err = 'Password did not match';
			} else {
				err = '';
			}
			setError({ ...error, [name]: err });
			return err === '' ? 1 : 0;
		} else {
			let err = '';
			if (validateElement.min && validateElement.min === validateElement.max) {
				err = `${validateElement.name} should of ${validateElement.min} characters`;
			} else if (validateElement.min && validateElement.max) {
				err = `${validateElement.name} should between ${validateElement.min} and ${validateElement.max} characters`;
			} else if (value === '' && validateElement.min) {
				err = `	${validateElement.name} is required and should be atleast ${validateElement.min} characters long`;
			}
			setError({ ...error, [name]: err });
			return err === '' ? 1 : 0;
		}
	};
	const handleReset = (e) => {
		for (let key in formData) {
			const resetFormData = { ...formData[key] };
			resetFormData.value = '';
			setFormData((formData) => ({ ...formData, [key]: resetFormData }));
		}
	};
	const spinner = () => {
		document.getElementsByClassName('usersignup')[0].style.filter = 'blur(1px)';
		document.getElementsByClassName('loader')[0].style.display = 'block';
	};
	const stopSpinner = () => {
		document.getElementsByClassName('usersignup')[0].style.filter = 'none';
		document.getElementsByClassName('loader')[0].style.display = 'none';
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		spinner();

		axios
			.post('/users/signup', {
				name: formData.name.value,
				email: formData.email.value,
				password: formData.password.value,
				confirmPassword: formData.passwordConfirm.value,
				mobile: formData.mobile.value,
				address: formData.address.value,
			})
			.then((res) => {
				stopSpinner();
				if (res.data.status === 'success') {
					setMessage('');
					history.push('/');
					localStorage.setItem('token', res.data.token);
					dispatch(setUser(res.data.user));
				} else if (res.data.status === 'fail') {
					setMessage(res.data.message);
					handleReset(e);
				}
			})
			.catch((err) => {
				handleReset(e);
			});
	};
	const changeHandler = (e) => {
		validateFormData(e);
		const updatedFormDataElement = { ...formData[e.target.name] };
		updatedFormDataElement.value = e.target.value;
		setFormData((formData) => ({
			...formData,
			[e.target.name]: updatedFormDataElement,
		}));
	};
	useEffect(() => {
		if (Object.keys(error).length >= 6) {
			if (
				error.name === '' &&
				error.email === '' &&
				error.password === '' &&
				error.passwordConfirm === '' &&
				error.mobile === '' &&
				error.address === ''
			) {
				setDisable(false);
			} else {
				setDisable(true);
			}
		} else {
			setDisable(true);
		}
	}, [error]);
	return (
		<div className="p-3 usersignup">
			<h1 className="provider_heading">
				Register Yourself With Us And Enjoy Online Shopping
			</h1>
			<form className="user-signup-form" onSubmit={handleSubmit}>
				<div className="form-group user-signup-input-group">
					<input
						type="text"
						className="form-control user-signup-input"
						name="name"
						placeholder="Name*"
						value={formData.name.value}
						onChange={(e) => changeHandler(e)}
					/>
					{error.name && <p className="error">{error.name}</p>}
				</div>
				<div className="form-group user-signup-input-group">
					<input
						type="text"
						className="form-control user-signup-input"
						name="email"
						placeholder="Email*"
						value={formData.email.value}
						onChange={(e) => changeHandler(e)}
					/>
					{error.email && <p className="error">{error.email}</p>}
				</div>
				<div className="form-group user-signup-input-group">
					<input
						type="password"
						className="form-control user-signup-input"
						name="password"
						placeholder="Password*"
						value={formData.password.value}
						onChange={(e) => changeHandler(e)}
					/>
					{error.password && <p className="error">{error.password}</p>}
				</div>
				<div className="form-group user-signup-input-group">
					<input
						type="password"
						className="form-control user-signup-input"
						name="passwordConfirm"
						placeholder="Confirm Password*"
						value={formData.passwordConfirm.value}
						onChange={(e) => changeHandler(e)}
					/>
					{error.passwordConfirm && <p className="error">{error.passwordConfirm}</p>}
				</div>
				<div className="form-group user-signup-input-group">
					<input
						type="number"
						className="form-control user-signup-input"
						name="mobile"
						placeholder="Mobile*"
						value={formData.mobile.value}
						onChange={(e) => changeHandler(e)}
					/>
					{error.mobile && <p className="error">{error.mobile}</p>}
				</div>
				<div className="form-group user-signup-input-group">
					<textarea
						className="form-control user-signup-input"
						name="address"
						id="address"
						cols="30"
						rows="5"
						placeholder="Address"
						value={formData.address.value}
						onChange={(e) => changeHandler(e)}></textarea>

					{error.address && <p className="error">{error.address}</p>}
				</div>
				{message && <p className="error text-center">{message}</p>}
				<div className="text-center">
					<button
						type="submit"
						className="user-button"
						disabled={disable}
						onClick={handleSubmit}>
						SignUp
					</button>
				</div>
			</form>
			<div class="loader">
				<div class="loading"></div>
			</div>
		</div>
	);
};
export default UserSignup;
