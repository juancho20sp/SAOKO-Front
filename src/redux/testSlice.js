import { createSlice } from '@reduxjs/toolkit';

export const testSlice = createSlice({
    name: 'test',
    initialState: {
        isLoggedIn: false
    },

    reducers: {
        login: (state) => {
            state.isLoggedIn = true
        },
        logout: (state) => {
            state.isLoggedIn = false
        }
    }
});

export const { login, logout } = testSlice.actions;

export default testSlice.reducer