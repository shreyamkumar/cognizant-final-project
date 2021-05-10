import React, { useState, useEffect } from 'react';
import axios from '../axios';
import '../Styles/UserSignin.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setUser } from '../features/userSlice';
import realAxios from 'axios';

const UserSignin = (props) => {
	const [formData, setFormData] = useState({
		email: {
			name: 'Email',
			value: '',
		},
		password: {
			name: 'Password',
			value: '',
		},
	});
	const [disable, setDisable] = useState(true);
	const [error, setError] = useState({});
	const dispatch = useDispatch();
	const history = useHistory();
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post('/users/login', {
				email: formData.email.value,
				password: formData.password.value,
			})
			.then((res) => {
				console.log(res.data);
				if (res.data.status === 'success') {
					localStorage.setItem('token', res.data.token);
					dispatch(setUser(res.data.user));
					if (res.data.typeofuser === 'serviceprovider') {
						history.push(`store/${res.data.user.location}/${res.data.user._id}`);
					} else {
						history.push('/');
					}
				}
			})
			.catch((err) => {
				//handleReset(e);
				console.log(err.response);
				// if (err.response.status === 401) {
				// }
			});
	};

	const validate = (e) => {
		let err = '';
		if (e.target.name === 'email') {
			let index = e.target.value.indexOf('@');
			if (index === -1) {
				err = `Invalid Email`;
			}
			//return err === '' ? 1 : 0;
		} else if (e.target.value.length < 8) {
			err = 'Password must be 8 characters long';
		}
		setError({ ...error, [e.target.name]: err });
	};

	const handleReset = (e) => {
		for (let key in formData) {
			const resetFormData = { ...formData[key] };
			resetFormData.value = '';
			setFormData((formData) => ({ ...formData, [key]: resetFormData }));
		}
	};
	const changeHandler = (e) => {
		validate(e);
		const updatedFormDataElement = { ...formData[e.target.name] };
		updatedFormDataElement.value = e.target.value;
		setFormData((formData) => ({
			...formData,
			[e.target.name]: updatedFormDataElement,
		}));
	};
	useEffect(() => {
		const source = realAxios.CancelToken.source();
		const token = localStorage.getItem('token');

		if (token) {
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};
			axios
				.get('/users/issignedin', config)
				.then((res) => {
					dispatch(setUser(res.data.user));
					history.push('/');
					if (res.data.typeofuser === 'serviceprovider') {
						history.push(`store/${res.data.user.location}/${res.data.user._id}`);
					} else {
						history.push('/');
					}
				})
				.catch((err) => {
					if (err.response.status === 401) {
						//console.log(err.response)
					}
				});
		}
		return () => {
			source.cancel();
		};
	}, []);
	useEffect(() => {
		if (Object.keys(error).length >= 2) {
			if (error.email === '' && error.password === '') {
				setDisable(false);
			} else {
				setDisable(true);
			}
		} else {
			setDisable(true);
		}
	}, [error]);

	return (
		<div className="p-3">
			<h1 className="user-signin-heading">Welcome Back!!!</h1>
			<form className="user-form" onSubmit={handleSubmit}>
				<div className="form-group">
					{/* <label className="user-label" htmlFor="email">
						Email:
					</label> */}
					<input
						type="text"
						className="form-control user-signin-input"
						name="email"
						placeholder="Email"
						value={formData.email.value}
						onChange={(e) => changeHandler(e)}
					/>
					{error.email && <p className="error">{error.email}</p>}
				</div>
				<div className="form-group">
					{/* <label className="user-label" htmlFor="password">
						Password:
					</label> */}
					<input
						type="password"
						className="form-control user-signin-input"
						name="password"
						placeholder="Password"
						value={formData.password.value}
						onChange={(e) => changeHandler(e)}
					/>
					{error.password && <p className="error">{error.password}</p>}
				</div>

				<div className="text-center">
					<button
						type="submit"
						className="user-button"
						disabled={disable}
						onClick={handleSubmit}>
						Login
					</button>
				</div>
			</form>
		</div>
	);
};
export default UserSignin;
