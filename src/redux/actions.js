import { SET_NEW_ROOM_DATA, CLEAR_NEW_ROOM_DATA } from './types';

// New room data
export const setNewRoomData = (payload) => ({
    type: SET_NEW_ROOM_DATA,
    payload
});

export const clearNewRoomData = (payload) => ({
    type: CLEAR_NEW_ROOM_DATA,
    payload
});