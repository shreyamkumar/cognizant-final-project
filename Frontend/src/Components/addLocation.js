import React from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = (values) => {
	const errors = {};
	if (!values.locationName) {
		errors.locationName = 'Please Enter Your Location Name';
	} else if (values.locationName.length < 5) {
		errors.locationName = 'Minimum be 5 characters or more';
	}
	if (!values.locationId) {
		errors.locationId = 'Please Enter Your Location Id';
	} else if (!/^[0-9\b]+$/i.test(values.locationId)) {
		errors.locationId = 'Invalid ID';
	}
	if (!values.states) {
		errors.states = 'Please Enter Your State Name';
	} else if (values.states.length < 3) {
		errors.states = 'Minimum be 3 characters or more';
	}
	if (!values.country) {
		errors.country = 'Please Enter Your Country Name';
	} else if (values.country.length < 3) {
		errors.country = 'Minimum be 3 characters or more';
	}
	return errors;
};

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
	<div>
		<label className="control-label">{label}</label>
		<div>
			<input {...input} placeholder={label} type={type} className="form-control" />
			{touched &&
				((error && <span className="text-danger">{error}</span>) ||
					(warning && <span>{warning}</span>))}
		</div>
	</div>
);

let AddLocation = (props) => {
	const { handleSubmit, pristine, submitting } = props;
	return (
		<form onSubmit={handleSubmit} className="container">
			<div className="form-group">
				<Field name="locationName" component={renderField} label="Location Name" />
			</div>
			<div className="form-group">
				<Field name="locationId" component={renderField} label="Location ID" />
			</div>
			<div className="form-group">
				<Field name="states" component={renderField} label="State" />
			</div>
			<div className="form-group">
				<Field name="country" component={renderField} label="Country" />
			</div>
			<div className="form-group">
				<button
					type="submit"
					disabled={pristine || submitting}
					className="btn btn-primary"
					onSubmit={handleSubmit}>
					Add Location
				</button>
			</div>
		</form>
	);
};
AddLocation = reduxForm({
	form: 'contact',
	validate,
})(AddLocation);

export default AddLocation;
