import React, { useEffect, useState } from 'react';
import axios from '../axios';
import realaxios from 'axios';
import '../Styles/RegisterServiceProvider.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/userSlice';

function RegisterServiceProvider() {
	const history = useHistory();
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		ownerName: {
			name: 'Owner Name',
			value: '',
			max: 30,
			min: 5,
		},
		storeName: {
			name: 'Store Name',
			value: '',
			max: 30,
			min: 5,
		},
		storeType: {
			name: 'Store Type',
			value: '',
		},
		email: {
			name: 'Email',
			value: '',
		},
		password: {
			name: 'Password',
			value: '',
			max: 30,
			min: 5,
		},

		address: {
			name: 'Address',
			value: '',
			max: 100,
			min: 5,
		},
		location: {
			name: 'Location',
			value: '',
		},
		logo: {
			name: 'Store Image',
			value: null,
		},
	});
	const [disable, setDisable] = useState(true);
	const [error, setError] = useState({});
	const [message, setMessage] = useState('');
	const [getLocations, setGetLocations] = useState([]);
	const [getServices, setGetServices] = useState([]);
	const [token, setToken] = useState('');
	const [id, setId] = useState('');
	const inputFeilds = (type, placeholder, ele) => (
		<div className="form-group">
			<label className="control-label provider_label" htmlFor={ele}>
				{placeholder}
			</label>
			<input
				type={type}
				className="form-control"
				id={ele}
				name={ele}
				placeholder={placeholder}
				value={formData[ele].value}
				onChange={(e) => handleInput(e)}
			/>
			{error[ele] && <p className="error">{error[ele]}</p>}
		</div>
	);
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

	const handleInput = (e) => {
		validateFormData(e);
		const updatedFormDataElement = { ...formData[e.target.name] };
		if (e.target.name === 'logo') {
			updatedFormDataElement.value = e.target.files[0];
		} else {
			updatedFormDataElement.value = e.target.value;
		}

		setFormData((formData) => ({ ...formData, [e.target.name]: updatedFormDataElement }));
	};

	const handleReset = (e) => {
		for (let key in formData) {
			const resetFormData = { ...formData[key] };
			resetFormData.value = '';
			setFormData((formData) => ({ ...formData, [key]: resetFormData }));
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const postData = new FormData();
		postData.append('ownerName', formData.ownerName.value);
		postData.append('email', formData.email.value);
		postData.append('password', formData.password.value);
		postData.append('storeName', formData.storeName.value);
		postData.append('storeType', formData.storeType.value);
		postData.append('address', formData.address.value);
		postData.append('location', formData.location.value);
		postData.append('storeImage', formData.logo.value);

		await axios.post('/register_store', postData).then((res) => {
			if (!res.data.error) {
				setError((error) => ({ ...error, success: res.data.status }));
				localStorage.setItem('token', res.data.token);
				setToken(res.data.token);
				setId(res.data.user.id);
				dispatch(setUser(res.data.user));
			} else {
				setError((error) => ({ ...error, storeExist: res.data.error }));
			}
			setTimeout(function () {
				setError({});
			}, 1000);

			handleReset(e);
		});
	};
	const compare = (a, b) => {
		if (a.location < b.location) {
			return -1;
		} else if (a.location > b.location) {
			return 1;
		}
		return 0;
	};
	useEffect(() => {
		const source = realaxios.CancelToken.source();
		const token = localStorage.getItem('token');
		if (token) {
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};
			axios.get('/auth_store/issignedin', config).then((res) => {
				if (res.data.status === 'fail') {
				} else {
					dispatch(setUser(res.data.user));
					history.push('/');
				}
			});
		}
		return () => {
			source.cancel();
		};
	}, [token]);

	useEffect(() => {
		const source = realaxios.CancelToken.source();
		axios
			.get('/add_location', {
				cancelToken: source.token,
			})
			.then((response) => {
				let count = response.data.count;
				setGetLocations(response.data.locations.sort(compare));
			});
		return () => {
			source.cancel();
		};
	}, []);

	useEffect(() => {
		const source = realaxios.CancelToken.source();
		axios
			.get('/get_servicesforlocation', {
				cancelToken: source.token,
				params: {
					location: formData.location.value,
				},
			})
			.then((res) => {
				if (res.data.message) {
					setMessage(res.data.message);
				} else {
					setMessage('');
				}
				setGetServices(res.data.servicesAvailable);
			});

		return () => {
			source.cancel();
		};
	}, [formData.location.value]);

	useEffect(() => {
		if (Object.keys(error).length >= 8) {
			if (
				error.ownerName === '' &&
				error.storeName === '' &&
				error.storeType === '' &&
				error.address === '' &&
				error.location === '' &&
				error.logo === '' &&
				error.password === '' &&
				error.email === ''
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
		<div className="registerserviceprovider">
			{error.success && (
				<div className="alert alert-success" role="alert">
					Your store is successfully registered
				</div>
			)}
			{error.storeExist && (
				<div className="alert alert-danger" role="alert">
					{error.storeExist}
				</div>
			)}
			<h1 className="provider_heading">Register Your Store & Become Our Partner</h1>
			<form onSubmit={handleSubmit} className="provider_form">
				{inputFeilds('text', 'Owner Name', 'ownerName')}
				{inputFeilds('text', 'Store Name', 'storeName')}
				{inputFeilds('email', 'Email', 'email')}
				{inputFeilds('password', 'Password', 'password')}
				<div className="form-group">
					<label className="provider_label" htmlFor="location">
						Select location
					</label>
					<select
						className="form-control"
						id="location"
						name="location"
						defaultValue={'DEFAULT'}
						onChange={(e) => handleInput(e)}>
						<option value="DEFAULT" disabled>
							Select Location
						</option>
						{getLocations.map((loc) => (
							<option key={loc.location} value={loc.location}>
								{loc.location}
							</option>
						))}
					</select>
					{/* {error.locations && <p className="error">{error.locations}</p>} */}
				</div>
				<div className="form-group">
					<label className="provider_label" htmlFor="storeType">
						Select your store type
					</label>
					<select
						className="form-control"
						id="storeType"
						name="storeType"
						defaultValue={'DEFAULT'}
						onChange={(e) => handleInput(e)}>
						<option value="DEFAULT" disabled>
							Select Location
						</option>
						{getServices &&
							getServices.map((service) => (
								<option key={service.id} value={service.serviceName}>
									{service.serviceName}
								</option>
							))}
					</select>
					{/* {error.locations && <p className="error">{error.locations}</p>} */}
				</div>

				<div className="form-group">
					<label className="control-label provider_label" htmlFor="logo">
						Upload File
					</label>
					<input
						className="form-control"
						type="file"
						id="logo"
						name="logo"
						onChange={(e) => handleInput(e)}
					/>
					{/* {error.serviceImage && <p className="error">{error.serviceImage}</p>} */}
				</div>
				<div className="form-group">
					<label className="control-label provider_label" htmlFor="address">
						Address
					</label>
					<textarea
						className="form-control"
						name="address"
						id="address"
						cols="30"
						rows="5"
						placeholder="Store Address"
						value={formData.address.value}
						onChange={(e) => handleInput(e)}></textarea>

					{error.address && <p className="error">{error.address}</p>}
				</div>
				<div className="form-group">
					<button
						type="submit"
						className="btn btn-primary provider_button"
						disabled={disable}
						onSubmit={handleSubmit}>
						Register
					</button>
				</div>
			</form>
		</div>
	);
}

export default RegisterServiceProvider;
