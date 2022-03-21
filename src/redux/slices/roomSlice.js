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
        boardRooms: [
            {
                id: 0,
                name: 'Board 1',
                path: 'board-one',
              },
              {
                id: 1,
                name: 'Board 2',
                path: 'board-two',
              },
              {
                id: 2,
                name: 'Board 3',
                path: 'board-three',
              },
        ],
        newRoom: {}
    },
    reducers: {
        setChatRooms: (state, action) => {
            state.chatRooms = [ ...action.payload];
        },
        setNewChatRoom: (state, action) => {
            state.chatRooms = [...state.chatRooms, action.payload];
        },
        clearNewRoomData: (state) => {
            state.newRoom = {};
        }
    }
});

export const { setNewChatRoom, clearNewRoomData, setChatRooms } = roomSlice.actions;
export default roomSlice.reducer;