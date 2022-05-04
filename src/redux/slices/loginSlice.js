import { createSlice } from '@reduxjs/toolkit';

const saveToLocalStorage = (state) => {
    localStorage.setItem('globalState', JSON.stringify(state));
};

const getFromLocalStorage = (keyName) => {
    const item = localStorage.getItem(keyName);

    if (item) {
        return JSON.parse(item);
    }

    return false;
}

export const loginSlice = createSlice({
    name: 'login',
    initialState: getFromLocalStorage('globalState') ? getFromLocalStorage('globalState') : {
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

            saveToLocalStorage(state);
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.username = '';
            state.firstName = '';
            state.lastName = '';
            state.email = '';
            state.role = '';

            saveToLocalStorage(state);
        }
    }
});

export const {
    login,
    logout
} = loginSlice.actions;

export default loginSlice.reducer;
