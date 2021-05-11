import React, { useEffect, useState } from 'react';
import '../Styles/AddProducts.css';
import axios from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, setProducts } from '../features/productsSlice';
import { selectUser } from '../features/userSlice';
import Cart from './Cart';
import realAxios from 'axios';

function ProductsView({ id }) {
	const categories = ['Dairy', 'Paan', 'Beverages', 'Household'];
	const [getCategory, setGetCategory] = useState('Dairy');
	const [localProducts, setLocalProducts] = useState([]);
	const dispatch = useDispatch();
	const { products } = useSelector(selectProducts);
	const { user } = useSelector(selectUser);
	const [orderId, setOrderid] = useState(['something']);
	const [cart, setCart] = useState([]);
	const [tempOrderId, setTempOrderId] = useState(true);
	const { typeofuser } = useSelector(selectUser);

	const addtoCart = (e, product) => {
		const token = localStorage.getItem('token');
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		if (token && user.typeofuser === 'customer') {
			axios
				.post(
					'/cart/addItem',
					{
						prodId: product.id,
						name: product.name,
						type: product.category,
						price: product.price,
						description: product.desc,
						userId: user._id,
						storeId: id,
					},
					config
				)
				.then((res) => {
					setTempOrderId(!tempOrderId);
				});
		} else {
			alert('Please login to add products to your cart');
		}
	};

	const incOrder = (e, product) => {
		axios
			.post('/cart/addItem', {
				prodId: product.id,
				userId: user._id,
			})
			.then((res) => {
				setTempOrderId(!tempOrderId);
			});
	};
	const decOrder = (e, product) => {
		axios
			.delete('/cart/deleteItem', {
				params: {
					prodId: product.id,
					userId: user._id,
				},
			})
			.then((res) => {
				setOrderid(res.data.ids);
				setTempOrderId(!tempOrderId);
			});
	};
	useEffect(() => {
		const source = realAxios.CancelToken.source();
		axios
			.get('/add_products', {
				params: {
					id,
				},
			})
			.then((res) => {
				if (res.data.status === 'success') {
					dispatch(setProducts(res.data.product.products));
					setLocalProducts(res.data.product.products);
				}
			});
		return () => {
			source.cancel();
		};
	}, []);

	useEffect(() => {
		const source = realAxios.CancelToken.source();
		const token = localStorage.getItem('token');
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		if (token && user !== null) {
			axios
				.get('/cart/getItems', {
					config,
					params: {
						userId: user._id,
					},
				})
				.then((res) => {
					setOrderid(res.data.ids);
					setCart(res.data.cart);
				});
		}

		return () => {
			source.cancel();
		};
	}, [user, tempOrderId]);
	return (
		<div className="productsview">
			<div className="heading">
				<p className="heading_details">
					<h1 className="store_number">{user !== null && user.storeName}</h1>
					<h3 className="store_number"> Your Products{}</h3>
				</p>
			</div>
			<div className="products-container">
				<div className="categories">
					{categories.map((category) => {
						return (
							<h6 onClick={() => setGetCategory(category)} className="category-name">
								{category}
							</h6>
						);
					})}
				</div>
				<div className="category-product">
					{localProducts.length === 0 && (
						<div>
							<h1>No Rroduct is added yet</h1>
						</div>
					)}
					{localProducts.map((product, index) => {
						if (product.category === getCategory) {
							return (
								<div class="product-card">
									<img
										className="product-img"
										alt={product.name}
										src={`http://localhost:9000/${product.imgUrl}`}></img>
									<div className="productcard-text">
										<h5>{product.name}</h5>
										<p>Rs. {product.price}</p>
									</div>

									{typeofuser === 'customer' || typeofuser === null ? (
										<div>
											{orderId && !orderId.includes(product.id) ? (
												<button
													onClick={(e) => addtoCart(e, product)}
													className="addtocart">
													Add to cart
												</button>
											) : (
												<div className="incdec">
													<button
														className="incdec-btn dec"
														onClick={(e) => decOrder(e, product)}>
														-
													</button>
													<button
														className="incdec-btn inc"
														onClick={(e) => incOrder(e, product)}>
														+
													</button>
												</div>
											)}
										</div>
									) : (
										<div></div>
									)}
								</div>
							);
						}
					})}
				</div>
				{typeofuser === 'customer' && (
					<Cart cart={cart} tempOrderId={tempOrderId} setTempOrderId={setTempOrderId} />
				)}
			</div>
		</div>
	);
}

export default ProductsView;
