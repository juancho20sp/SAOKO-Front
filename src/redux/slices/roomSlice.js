import { createSlice } from '@reduxjs/toolkit';

export const roomSlice = createSlice({
    name: 'room',
    initialState: {
        // $
        // TODO -> eliminar esto
        chatRooms: [
            {
                id: 0,
                name: 'Chat 1',
                path: 'chat-one',
              },
              {
                id: 1,
                name: 'Chat 2',
                path: 'chat-two',
              },
              {
                id: 2,
                name: 'Chat 3',
                path: 'chat-three',
              },
        ],
        newRoom: {}
    },
    reducers: {
        setChatRooms: (state, action) => {
            state.chatRooms = [ ...action.payload];
        },
        setNewRoomData: (state, action) => {
            state.chatRooms = [...state.chatRooms, action.payload];
        },
        clearNewRoomData: (state) => {
            state.newRoom = {};
        }
    }
});

export const { setNewRoomData, clearNewRoomData, setChatRooms } = roomSlice.actions;
export default roomSlice.reducer;