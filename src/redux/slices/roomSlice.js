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
                messages: [],
                isConnected: false,
              },
              {
                id: 1,
                name: 'Chat 2',
                path: 'chat-two',
                messages: [],
                isConnected: false,
              },
              {
                id: 2,
                name: 'Chat 3',
                path: 'chat-three',
                messages: [],
                isConnected: false,
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
        addMessageToChatRoom: (state, action) => {
          // $
          debugger;
          const room = state.chatRooms.filter(room => room.path === action.payload.receiverName)[0];

          const idx = state.chatRooms.findIndex(room => room.path === action.payload.receiverName)
          // room.messages.push(action.payload);

          state.chatRooms[idx] = {...room,
            messages: [...room.messages, action.payload]
          };
        },
        setConnected: (state, action) => {
          const room = state.chatRooms.filter(room => room.path === action.payload.path)[0];

          const idx = state.chatRooms.findIndex(room => room.path === action.payload.path)

          state.chatRooms[idx] = {...room,
            isConnected: action.payload.isConnected
          };
        }

    }
});

export const { setNewChatRoom, setChatRooms, addMessageToChatRoom, setConnected } = roomSlice.actions;
export default roomSlice.reducer;