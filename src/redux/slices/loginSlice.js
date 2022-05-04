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
        // username: '',
        // email: '',
        // firstName: '',
        // lastName: '',
        // role: '',
        // cellphone: '',
        // userId: '',
        awsUserData: {},
        userData: {}
    },
    reducers: {
        login: (state, action) => {
            // const {
            //     email,
            //     firstName,
            //     lastName,
            //     role,
            //     userId
            // } = JSON.parse(action.payload);

            // // $
            // debugger;
            
            state.isLoggedIn = true;
            // state.username = `${firstName} ${lastName}`;
            // state.firstName = firstName;
            // state.lastName = lastName;
            // state.email = email;
            // state.role = role;
            // state.userId = userId;

            if (action.payload) {
                state.awsUserData = {...JSON.parse(action.payload)};
            }

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
        },
        setUserData: (state, action) => {
            // $
            debugger;

            state.userData = {...action.payload};
            saveToLocalStorage(state);
        }
    }
});

export const {
    login,
    logout,
    setUserData
} = loginSlice.actions;

export default loginSlice.reducer;
