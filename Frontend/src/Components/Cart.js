import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../axios';
import { selectUser } from '../features/userSlice';
import realAxios from 'axios';
import '../Styles/Cart.css';

function Cart({ cart, tempOrderId, setTempOrderId }) {
	const { user } = useSelector(selectUser);
	const [order, setOrder] = useState(false);

	const addToOrder = () => {
		axios
			.post('/orders/addOrder', {
				userId: user._id,
			})
			.then((res) => {
				console.log(res.data);
				if (res.data.status === 'success') {
					setTempOrderId(!tempOrderId);
					setOrder(true);
					setTimeout(() => {
						setOrder(false);
					}, 1000);
				}
			});
	};

	const totalPrice = () => {
		let bill = 0;
		for (let i = 0; i < cart.length; i++) {
			bill += parseInt(cart[i].price);
		}

		return bill;
	};

	return (
		<div className="cart">
			<h3>Your Cart</h3>
			{order === true && (
				<div class="alert alert-success" role="alert">
					Your order is successfully placed!!
				</div>
			)}
			{cart.length === 0 && <div>Add something to cart </div>}
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

			{cart.length !== 0 && (
				<div className="bill-wrapper">
					<div className="bill-container">
						<p className="bill">Your total paybable bill is</p>
						<p>Rs. {totalPrice()}</p>
					</div>
					<div className="order-button">
						<button onClick={addToOrder}>Order now</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default Cart;
