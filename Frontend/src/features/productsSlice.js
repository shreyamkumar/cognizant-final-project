import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
	name: 'products',
	initialState: {
		products: null,
	},
	reducers: {
		setProducts: (state, action) => {
			state.products = action.payload;
		},
		// logoutUser: (state) => {
		// 	localStorage.removeItem('token');
		// 	state.user = null;
		// 	state.token = null;
		// 	state.typeofuser = null;
		// },
	},
});

export const { setProducts } = productsSlice.actions;

export const selectProducts = ({ products }) => products;

export default productsSlice.reducer;
