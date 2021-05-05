import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'currentLocation',
	initialState: {
		user: null,
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

export const { setUser } = userSlice.actions;

export const selectUser = ({ user }) => user;

export default userSlice.reducer;
