import React, { useState } from 'react';
import axios from '../axios';

let AddLocation = (props) => {
	const closeModal = props.onClick;
	const [formData, setFormData] = useState({
		locationName: {
			name: 'Location Name',
			value: '',
			max: 30,
			min: 5,
		},
		locationPin: {
			name: 'Pin Code',
			value: '',
			min: 6,
			max: 6,
		},
		state: {
			name: 'State',
			value: '',
		},

		country: {
			name: 'Country',
			value: '',
		},
	});
	const [error, setError] = useState({});
	const inputFeilds = (type, placeholder, ele) => (
		<div className="form-group">
			<label className="control-label" htmlFor={ele}>
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
			{error[ele] && <p>{error[ele]}</p>}
		</div>
	);
	const validateFormData = (name, value) => {
		const validateElement = { ...formData[name] };

		if (value.length >= validateElement.min && value.length <= validateElement.max) {
			setError({ ...error, [name]: '' });
		} else {
			let err = '';
			if (validateElement.min && validateElement.min === validateElement.max) {
				err = `${validateElement.name} should of ${validateElement.min} characters`;
			} else if (validateElement.min) {
				err = `${validateElement.name} should of ${validateElement.min} and ${validateElement.max}`;
			}
			setError({ ...error, [name]: err });
		}
	};

	const handleInput = (e) => {
		if ('locationExist' in error) {
			console.log('hello');
		}
		validateFormData(e.target.name, e.target.value);
		const updatedFormDataElement = { ...formData[e.target.name] };

		updatedFormDataElement.value = e.target.value;

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
		console.log(error);
		await axios
			.post('/add_location', {
				location: formData.locationName.value,
				id: formData.locationPin.value,
				state: formData.state.value,
				country: formData.country.value,
			})
			.then((res) => {
				setError((error) => ({ ...error, ['locationExist']: res.data.error }));
				setError((error) => ({ ...error, ['success']: res.data.message }));
				if (!res.data.error) {
					setTimeout(function () {
						closeModal();
					}, 1000);
				}
				handleReset(e);
				setTimeout(function () {
					setError({});
				}, 1000);
			});
	};
	return (
		<form onSubmit={handleSubmit} className="container">
			{error.success && (
				<div class="alert alert-success" role="alert">
					Location is successfully added
				</div>
			)}
			{error.locationExist && <p>{error.locationExist}</p>}
			<div className="form-group">{inputFeilds('text', 'Location Name', 'locationName')}</div>
			<div className="form-group">{inputFeilds('number', 'Pin Code', 'locationPin')}</div>
			<div className="form-group">{inputFeilds('text', 'State', 'state')}</div>
			<div className="form-group">{inputFeilds('text', 'Country', 'country')}</div>
			<div className="form-group">
				<button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>
					Add Location
				</button>
			</div>
		</form>
	);
};

export default AddLocation;
