import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slices/loginSlice';
import roomReducer from './slices/roomSlice';

export default configureStore({
    reducer: {
        login: loginReducer,
        room: roomReducer
    }
});