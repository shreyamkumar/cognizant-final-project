import React, { useState, useEffect } from 'react';
import axios from '../axios';
import '../Styles/AddService.css';

function AddServices(props) {
	const closeModal = props.onClick;
	const [formData, setFormData] = useState({
		serviceName: {
			name: 'Service Name',
			value: '',
			max: 30,
			min: 5,
		},
		serviceImage: {
			name: 'Service Thumbnail',
			value: null,
			displayValue: '',
		},
		serviceDesc: {
			name: 'Description',
			value: '',
			max: 100,
			min: 10,
		},
	});
	const [disable, setDisable] = useState(true);
	const [error, setError] = useState({});
	const handleReset = (e) => {
		setDisable(true);
		for (let key in formData) {
			const resetFormData = { ...formData[key] };
			if (key === 'serviceImage') {
				let img = document.getElementById('serviceImage');
				img.value = null;
			} else resetFormData.value = '';
			setFormData((formData) => ({ ...formData, [key]: resetFormData }));
		}
		console.log(formData);
	};
	const isalphanum = (value) => {
		var letterNumber = /^[0-9a-zA-Z ]+$/;
		if (value.match(letterNumber)) return true;
		else return false;
	};

	const validateFormData = (e) => {
		const validateElement = { ...formData[e.target.name] };
		if (e.target.name === 'serviceImage') {
			let file = e.target.files[0];
			if (
				file.type === 'image/jpeg' ||
				file.type === 'image/jpg' ||
				file.type === 'image/png'
			) {
				console.log('hello');
				setError({ ...error, serviceImage: '' });
				return 1;
			} else {
				setError({
					...error,
					serviceImage: 'Please upload only jpeg or jpg or png format image',
				});
				return 0;
			}
		} else {
			let value = e.target.value;
			let name = e.target.name;
			let err = '';
			if (value.length < validateElement.min || value.length > validateElement.max) {
				err = `${validateElement.name} should of ${validateElement.min} and ${validateElement.max}`;
			}
			if (e.target.name === 'serviceName' && !isalphanum(e.target.value)) {
				err = `${validateElement.name} should only contain letters and numbers`;
			}
			setError({ ...error, [name]: err });
			return err === '' ? 1 : 0;
		}
	};

	const handleInput = (e) => {
		let flag = validateFormData(e);
		const updatedFormDataElement = { ...formData[e.target.name] };

		console.log('hello');
		if (e.target.name === 'serviceImage') {
			if (flag === 1) {
				updatedFormDataElement.value = e.target.files[0];
				updatedFormDataElement.displayValue = e.target.files[0].name;
			}
		} else {
			updatedFormDataElement.value = e.target.value;
		}
		setFormData((formData) => ({ ...formData, [e.target.name]: updatedFormDataElement }));
	};
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		const postData = new FormData();

		postData.append('title', formData.serviceName.value);
		postData.append('desc', formData.serviceDesc.value);
		postData.append('serviceImage', formData.serviceImage.value);
		await axios.post('/add_services', postData).then((res) => {
			setError((error) => ({ ...error, serviceExist: res.data.error }));
			setError((error) => ({ ...error, success: res.data.message }));
			if (!res.data.error) {
				setTimeout(function () {
					closeModal();
				}, 1000);
			}
			setTimeout(function () {
				setError({});
			}, 1000);
			handleReset(e);
		});
	};

	useEffect(() => {
		console.log(error);
		console.log(formData.serviceImage.value);
		if (Object.keys(error).length >= 3) {
			if (error.serviceDesc === '' && error.serviceImage === '' && error.serviceName === '') {
				setDisable(false);
			} else {
				setDisable(true);
			}
		} else {
			setDisable(true);
		}
		// return () => {
		// 	cleanup;
		// };
	}, [error]);
	return (
		<div className="addservices">
			<form className="addservices__form container" action="" encType="multipart/form-data">
				{error.success && (
					<div class="alert alert-success" role="alert">
						Service is successfully added
					</div>
				)}
				{error.serviceExist && <p>{error.serviceExist}</p>}
				{inputFeilds('text', 'Service Name', 'serviceName')}
				<div className="form-group">
					<label className="control-label" htmlFor="profile">
						Upload File
					</label>
					<input
						className="form-control"
						type="file"
						id="serviceImage"
						name="serviceImage"
						onChange={(e) => handleInput(e)}
					/>
					{error.serviceImage && <p>{error.serviceImage}</p>}
				</div>
				<div className="form-group">
					<label className="control-label" htmlFor="serviceDesc">
						Description
					</label>
					<textarea
						className="form-control"
						name="serviceDesc"
						id="serviceDesc"
						cols="30"
						rows="5"
						placeholder="Description"
						value={formData.serviceDesc.value}
						onChange={(e) => handleInput(e)}></textarea>

					{error.serviceDesc && <p>{error.serviceDesc}</p>}
				</div>

				<div className="row mt-3">
					<div className="col-md-12">
						<button
							type="submit"
							className="btn btn-primary"
							disabled={disable}
							onClick={(e) => handleSubmit(e)}>
							Add Services
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default AddServices;
