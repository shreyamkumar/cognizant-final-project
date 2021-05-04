import { configureStore } from '@reduxjs/toolkit';
import currentLocationReducer from '../features/currentlocationSlice';

export const store = configureStore({
	reducer: {
		currentLocation: currentLocationReducer,
	},
});
