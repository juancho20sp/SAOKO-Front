import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false,
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        role: '',
        cellphone: ''
    },
    reducers: {
        login: (state, action) => {
            const {
                email,
                firstName,
                lastName,
                role
            } = action.payload
            
            state.isLoggedIn = true;
            state.username = `${firstName} ${lastName}`;
            state.firstName = firstName;
            state.lastName = lastName;
            state.email = email;
            state.role = role;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.username = '';
            state.firstName = '';
            state.lastName = '';
            state.email = '';
            state.role = '';
        }
    }
});

export const {
    login,
    logout
} = loginSlice.actions;

export default loginSlice.reducer;
