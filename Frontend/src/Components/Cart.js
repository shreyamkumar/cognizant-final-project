import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../axios';
import { selectUser } from '../features/userSlice';
import realAxios from 'axios';
import '../Styles/Cart.css';

function Cart({ cart }) {
	// const { user } = useSelector(selectUser);
	// const [cart, setCart] = useState([]);

	// useEffect(() => {
	// 	const source = realAxios.CancelToken.source();
	// 	const token = localStorage.getItem('token');
	// 	const config = {
	// 		headers: { Authorization: `Bearer ${token}` },
	// 	};
	// 	if (token && user !== null) {
	// 		axios
	// 			.get('/cart/getItems', {
	// 				config,
	// 				params: {
	// 					userId: user._id,
	// 				},
	// 			})
	// 			.then((res) => {
	// 				console.log(res.data.cart);
	// 				setCart(res.data.cart);
	// 			});
	// 	}

	// 	return () => {
	// 		source.cancel();
	// 	};
	// }, [user]);

	return (
		<div className="cart">
			<h3>Your Cart</h3>
			{cart.map((item) => {
				return (
					<div ker={item._id} className="cart-card">
						<div className="cart-text">
							<h5>{item.name}</h5>
							<p>Quantity: {item.quantity}</p>
							<p>Cost: Rs. {item.price}</p>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Cart;
