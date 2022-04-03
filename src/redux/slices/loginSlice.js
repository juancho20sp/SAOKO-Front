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
        cellphone: '',
        userId: ''
    },
    reducers: {
        login: (state, action) => {
            const {
                email,
                firstName,
                lastName,
                role,
                userId
            } = action.payload
            
            state.isLoggedIn = true;
            state.username = `${firstName} ${lastName}`;
            state.firstName = firstName;
            state.lastName = lastName;
            state.email = email;
            state.role = role;
            state.userId = userId;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.username = '';
            state.firstName = '';
            state.lastName = '';
            state.email = '';
            state.role = '';
            state.userId = '';
        }
    }
});

export const {
    login,
    logout
} = loginSlice.actions;

export default loginSlice.reducer;
