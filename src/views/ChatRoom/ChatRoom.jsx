import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatRoom.module.scss';

// Components
import { MessageInput, MessageBox } from './components';
import { Layout } from '../../components';

// Utils
import { socket } from '../../utils';

// TODO -> message sent must be handed by hook
const chats = [
  {
    id: 0,
    messageSent: true,
    time: '9:50 pm',
    text: 'saoko papi',
  },
  {
    id: 1,
    messageSent: false,
    sender: 'Diego triviño',
    time: '9:50 pm',
    text: 'saoko papi',
  },
];

const ChatRoom = () => {
  // ---------------------- REAL TIME LOGIC ----------------------
  //   const [socket, setSocket] = useState();
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);

  // $
  const [name, setName] = useState(
    'user #' + Math.floor(Math.random() * 1000 + 1)
  );

  // CONNECT
  useEffect(() => {
    // $
    debugger;

    socket.on('connect', function () {
      console.log('user connected');

      const adminMessage = {
        id: Math.floor(100000000 + Math.random() * 900000000),
        username: 'ADMIN',
        message: `${name} ha entrado al chat`,
        // time: new Date().toLocaleString(),
        time: new Date().toLocaleTimeString(),
      };

      setAllMessages([...allMessages, adminMessage]);
    });

    socket.on('disconnect', function () {
      console.log('user disconnected');

      const adminMessage = {
        id: Math.floor(100000000 + Math.random() * 900000000),
        username: 'ADMIN',
        message: `${name} ha salido del chat`,
        time: new Date().toLocaleTimeString(),
      };

      setAllMessages([...allMessages, adminMessage]);
    });
  }, []);

  // SEND MESSAGE
  const sendMessage = () => {
    // event.preventDefault();

    debugger;

    // messageSent, sender, time, text
    const myObject = {
      id: Math.floor(100000000 + Math.random() * 900000000),
      username: name,
      message,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit('chat', myObject);

    setMessage('');
  };

  // NEW MESSAGES
  useEffect(() => {
    socket.on('chat', (message) => {
      // $
      debugger;

      setAllMessages([...allMessages, message]);
    });

    return () => {
      socket.off();
    };
  }, [allMessages]);

  // AUTO SCROLL
  //   const divRef = useRef(null);
  //   useEffect(() => {
  //     divRef.current.scrollIntoView({ behavior: 'smooth' });
  //   });

  //   function sendDisconnect() {
  //     socket.disconnect();
  //   }

  // -------------------------------------------------------------

  const messageInputProps = {
    message: message,
    setMessage: setMessage,
    sendMessage: sendMessage,
  };

  return (
    <Layout>
      <div className={styles['chatRoom-main']}>
        <div className={styles['chatRoom-container']}>
          <div className={styles['chatRoom-messageContainer']}>
            {allMessages.length > 0 &&
              allMessages.map((message) => (
                <MessageBox key={message.id} {...message} />
              ))}
          </div>
          <MessageInput {...messageInputProps} />
        </div>
      </div>
    </Layout>
  );
};

export default ChatRoom;
