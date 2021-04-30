import React, { useState } from 'react';

function AddServices() {
	const [formData, setFormData] = useState({
		serviceName: {
			name: 'Service Name',
			value: '',
			max: 30,
			min: 5,
		},
		serviceImage: {
			name: 'Service Thumbnail',
			value: '',
		},
		serviceDesc: {
			name: 'Description',
			value: '',
		},
	});

	const handleInput = (e) => {
		const updatedFormData = { ...formData };
		const updatedFormDataElement = { ...formData[e.target.name] };
		if ((e.target.name = 'serviceImage')) {
			updatedFormDataElement.value = e.target.files[0];
			setFormData((formData) => ({ ...formData, [e.target.name]: updatedFormDataElement }));
			console.log(formData);
		}
	};
	const inputFeilds = (type, placeholder, ele) => (
		<div className="form__inputOptions">
			<label htmlFor={ele}> {placeholder} </label>
			<input
				type={type}
				id={ele}
				name={ele}
				placeholder={placeholder}
				value={formData[ele].value}
				onChange={(e) => handleInput(e)}
			/>
			{/* {errors[ele] && <p className="form__ErrorMsg ">{errors[ele]}</p>} */}
		</div>
	);

	const handleSubmit = (e) => {
		console.log(formData.serviceImage);
	};
	return (
		<div className="addservices">
			{inputFeilds('text', 'Service Name', 'serviceName')}
			<div className="form__inputOptions">
				<label htmlFor="profile"> Upload File </label>
				<input
					type="file"
					id="profile"
					name="serviceImage"
					onChange={(e) => handleInput(e)}
				/>
				{/* {errors.profile && <p className="form__ErrorMsg ">{errors.profile}</p>} */}
			</div>
			{inputFeilds('text', 'Description', 'serviceDesc')}
			<input type="submit" value="Click" onClick={(e) => handleSubmit(e)}></input>
		</div>
	);
}

export default AddServices;
