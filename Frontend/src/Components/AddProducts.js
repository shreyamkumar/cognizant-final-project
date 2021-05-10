import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from '../axios';
import { selectUser } from '../features/userSlice';
import '../Styles/AddProducts.css';
function AddProducts(props) {
	const closeModal = props.onClick;
	const categories = ['Dairy', 'Paan', 'Beverages', 'Household'];
	const { user } = useSelector(selectUser);
	const [formData, setFormData] = useState({
		productName: {
			name: 'Product Name',
			value: '',
			max: 30,
			min: 5,
		},
		productImage: {
			name: 'Product Thumbnail',
			value: null,
			displayValue: '',
		},
		productPrice: {
			name: 'Price',
			value: '',
		},
		category: {
			name: 'Product Category',
			value: '',
		},
		productDesc: {
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
			if (key === 'productImage') {
				let img = document.getElementById('productImage');
				img.value = null;
			} else resetFormData.value = '';
			setFormData((formData) => ({ ...formData, [key]: resetFormData }));
		}
	};
	const isalphanum = (value) => {
		var letterNumber = /^[0-9a-zA-Z ]+$/;
		if (value.match(letterNumber)) return true;
		else return false;
	};

	const validateFormData = (e) => {
		const validateElement = { ...formData[e.target.name] };
		if (e.target.name === 'productImage') {
			let file = e.target.files[0];
			if (
				file.type === 'image/jpeg' ||
				file.type === 'image/jpg' ||
				file.type === 'image/png'
			) {
				setError({ ...error, productImage: '' });
				return 1;
			} else {
				setError({
					...error,
					productImage: 'Please upload only jpeg or jpg or png format image',
				});
				return 0;
			}
		} else if (e.target.name === 'productPrice' && e.target.value <= 0) {
			let err = '';
			err = 'Price must be a positve value';
			setError({ ...error, [e.target.name]: err });
			return err === '' ? 1 : 0;
		} else {
			let value = e.target.value;
			let name = e.target.name;
			let err = '';
			if (value.length < validateElement.min || value.length > validateElement.max) {
				err = `${validateElement.name} should of ${validateElement.min} and ${validateElement.max}`;
			}
			if (e.target.name === 'productName' && !isalphanum(e.target.value)) {
				err = `${validateElement.name} should only contain letters and numbers`;
			}
			setError({ ...error, [name]: err });
			return err === '' ? 1 : 0;
		}
	};

	const handleInput = (e) => {
		let flag = validateFormData(e);
		const updatedFormDataElement = { ...formData[e.target.name] };

		if (e.target.name === 'productImage') {
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
			<label className="addproducts-label control-label" htmlFor={ele}>
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);

		const postData = new FormData();
		postData.append('id', user._id);
		postData.append('name', formData.productName.value);
		postData.append('desc', formData.productDesc.value);
		postData.append('productImage', formData.productImage.value);
		postData.append('price', formData.productPrice.value);
		postData.append('category', formData.category.value);

		await axios.post('/add_products', postData).then((res) => {
			setError((error) => ({ ...error, productExist: res.data.error }));
			setError((error) => ({ ...error, success: res.data.message }));
			console.log(res.data);
			// if (!res.data.error) {
			// 	setTimeout(function () {
			// 		closeModal();
			// 	}, 1000);
			// }
			// setTimeout(function () {
			// 	setError({});
			// }, 1000);
			// handleReset(e);
		});
	};

	useEffect(() => {
		console.log(error);
		if (Object.keys(error).length >= 5) {
			if (
				error.productDesc === '' &&
				error.productImage === '' &&
				error.productName === '' &&
				error.productPrice === '' &&
				error.category === ''
			) {
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
		<div className="addproducts">
			<form className="addproducts__form container" action="" encType="multipart/form-data">
				{error.success && (
					<div className="alert alert-success" role="alert">
						product is successfully added
					</div>
				)}
				{error.productExist && <p className="error">{error.productExist}</p>}
				{inputFeilds('text', 'Product Name', 'productName')}
				{inputFeilds('number', 'Product Price', 'productPrice')}

				<div className="form-group">
					<label className="addproducts-label" htmlFor="category">
						Select Category:
					</label>
					<select
						className="form-control"
						id="category"
						name="category"
						defaultValue={'DEFAULT'}
						onChange={(e) => handleInput(e)}>
						<option value="DEFAULT" disabled>
							Select Category
						</option>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
					{error.locations && <p className="error">{error.locations}</p>}
				</div>
				<div className="form-group">
					<label className="addproducts-label control-label" htmlFor="profile">
						Upload File
					</label>
					<input
						className="form-control"
						type="file"
						id="productImage"
						name="productImage"
						onChange={(e) => handleInput(e)}
					/>
					{error.productImage && <p className="error">{error.productImage}</p>}
				</div>
				<div className="form-group">
					<label className="addproducts-label control-label" htmlFor="productDesc">
						Description
					</label>
					<textarea
						className="form-control"
						name="productDesc"
						id="productDesc"
						cols="30"
						rows="5"
						placeholder="Description"
						value={formData.productDesc.value}
						onChange={(e) => handleInput(e)}></textarea>

					{error.productDesc && <p className="error">{error.productDesc}</p>}
				</div>

				<div className="row mt-3">
					<div className="col-md-12">
						<button
							type="submit"
							className="btn btn-primary"
							disabled={disable}
							onClick={(e) => handleSubmit(e)}>
							Add product
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default AddProducts;
