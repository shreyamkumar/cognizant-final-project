import { configureStore } from '@reduxjs/toolkit';
import currentLocationReducer from '../features/currentlocationSlice';
import productsSlice from '../features/productsSlice';
import userSlice from '../features/userSlice';

export const store = configureStore({
	reducer: {
		currentLocation: currentLocationReducer,
		user: userSlice,
		products: productsSlice,
	},
});
