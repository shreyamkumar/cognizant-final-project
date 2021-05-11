import { createSlice } from '@reduxjs/toolkit';

export const currentLocationSlice = createSlice({
	name: 'currentLocation',
	initialState: {
		location: 'Ambikapur',
	},
	reducers: {
		setCurrentLocation: (state, action) => {
			state.location = action.payload;
		},
	},
});

export const { setCurrentLocation } = currentLocationSlice.actions;

export const selectCurrentLocation = ({ currentLocation }) => currentLocation;

export default currentLocationSlice.reducer;
