import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		token: localStorage.getItem('token'),
		user: null,
		typeofuser: null,
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
			state.typeofuser = action.payload.typeofuser;
		},
		logoutUser: (state) => {
			localStorage.removeItem('token');
			state.user = null;
			state.typeofuser = null;
		},
	},
});

export const { logoutUser, setUser } = userSlice.actions;

export const selectUser = ({ user }) => user;

export default userSlice.reducer;
