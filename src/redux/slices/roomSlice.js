import { createSlice } from '@reduxjs/toolkit';

export const CHAT = 'CHAT';
export const BOARD = 'BOARD';

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
                columns: {
                  TO_DO: {
                    name: 'To Do',
                    items: [],
                  },
                  IN_PROGRESS: {
                    name: 'In Progress',
                    items: [],
                  },
                  DONE: {
                    name: 'Done',
                    items: [],
                  },
                },
                isConnected: false,
              },
              {
                id: 1,
                name: 'Board 2',
                path: 'board-two',
                columns: {
                  TO_DO: {
                    name: 'To Do',
                    items: [],
                  },
                  IN_PROGRESS: {
                    name: 'In Progress',
                    items: [],
                  },
                  DONE: {
                    name: 'Done',
                    items: [],
                  },
                },
                isConnected: false,
              },
              {
                id: 2,
                name: 'Board 3',
                path: 'board-three',
                columns: {
                  TO_DO: {
                    name: 'To Do',
                    items: [],
                  },
                  IN_PROGRESS: {
                    name: 'In Progress',
                    items: [],
                  },
                  DONE: {
                    name: 'Done',
                    items: [],
                  },
                },
                isConnected: false,
              },
        ],
        newRoom: {},
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
          // debugger;;
          const room = state.chatRooms.filter(room => room.path === action.payload.receiverName)[0];

          const idx = state.chatRooms.findIndex(room => room.path === action.payload.receiverName)
          // room.messages.push(action.payload);

          state.chatRooms[idx] = {...room,
            messages: [...room.messages, action.payload]
          };
        },

        setConnected: (state, action) => {
          // $
          // debugger;;

          let rooms;
          let roomLabel;

          switch(action.payload.type){
            case CHAT:
              rooms = state.chatRooms;
              roomLabel = 'chatRooms';
              break;

            case BOARD:
              rooms = state.boardRooms;
              roomLabel = 'boardRooms';
              break;

            default:

          }

          const room = rooms.filter(room => room.path === action.payload.path)[0];

          const idx = rooms.findIndex(room => room.path === action.payload.path)

          state[roomLabel][idx] = {...room,
            isConnected: action.payload.isConnected
          };
        },

        addCardToColumn: (state, action) => {
          // $
          // debugger;;
          const { from, to, path, card } = action.payload;

          let room = state.boardRooms.find(room => room.path === path);
          const roomIdx = state.boardRooms.findIndex(room => room.path === path);
          room = state.boardRooms[roomIdx];

          
          if (!from) {
            const targetItems = [...room.columns.TO_DO.items];
            room.columns.TO_DO.items = [...new Set([...targetItems, card])];

            console.log('NEW SET FROM REDUX')
            console.log(room.columns.TO_DO.items)
          } 

        },

        moveCard: (state, action) => {
          const { result, columns, path } = action.payload.resultData ? action.payload.resultData : action.payload;

          let room = state.boardRooms.find(room => room.path === path);
          const roomIdx = state.boardRooms.findIndex(room => room.path === path);
          room = state.boardRooms[roomIdx];


          if (!result.destination) {
            return;
          }
          const { source, destination } = result;
    
      
          if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destinyColumn = columns[destination.droppableId];
      
            const sourceItems = [...sourceColumn.items];
            const destinyItems = [...destinyColumn.items];
      
            const [removed] = sourceItems.splice(source.index, 1);
      
            destinyItems.splice(destination.index, 0, removed);
      

            room.columns = {
              ...room.columns,
              [source.droppableId]: {
                ...sourceColumn,
                items: [...new Set(sourceItems)],
              },
              [destination.droppableId]: {
                ...destinyColumn,
                items: [...new Set(destinyItems)],
              },
            }
          } else {
            const column = columns[source.droppableId];
      
            const copiedItems = [...column.items];
      
            const [removed] = copiedItems.splice(source.index, 1);
      
            copiedItems.splice(destination.index, 0, removed);
      

            room.columns = {
              ...room.columns,
              [source.droppableId]: {
                ...column,
                items: copiedItems,
              },
            }
          }
        },
    }
});

export const { setNewChatRoom, setChatRooms, addMessageToChatRoom, setConnected, addCardToColumn, moveCard } = roomSlice.actions;
export default roomSlice.reducer;