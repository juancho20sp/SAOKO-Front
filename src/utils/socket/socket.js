import io from 'socket.io-client';

// Socket host direction
// const socketHost = 'http://localhost:9092/chat';
// const socket = io(socketHost, {
//     transports: ['polling', 'websocket']
// });

debugger;

const socket = io('http://localhost:9092')

export default socket;