import { configureStore } from '@reduxjs/toolkit'
// import testReducer from './testSlice';
import loginReducer from './slices/loginSlice';

export default configureStore({
    reducer: {
        login: loginReducer
    }
});