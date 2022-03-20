import {
    SET_NEW_ROOM_DATA,
    CLEAR_NEW_ROOM_DATA
} from './types';

export const reducers = (state, action) => {
    switch(action.type){
        // New room data
        case SET_NEW_ROOM_DATA:
            if (action.payload) {
                return {
                    ...state,
                    newRoomData: action.payload
                }
            } 

            return state;

        case CLEAR_NEW_ROOM_DATA:
            return {
                ...state,
                newRoomData: []
            }
        default:
            break;
    }
}