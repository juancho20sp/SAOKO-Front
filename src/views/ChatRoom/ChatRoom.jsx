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

    // socket.emit('connect', name);
    socket.connect();

    socket.on('disconnect', (data) => {
      console.log('USER DISCONECTED WITH DATA:');
      console.log(data);
    });

    socket.on('reconnect_attempt', (attempts) => {
      console.log('Try to reconnect at ' + attempts + ' attempt(s).');
    });
  }, []);

  // SEND MESSAGE
  const sendMessage = () => {
    // event.preventDefault();

    debugger;

    const myObject = {
      userName: name,
      message,
    };

    socket.emit('chat', myObject);

    setMessage('');
  };

  // NEW MESSAGES
  useEffect(() => {
    socket.on('newMessages', (message) => {
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
            {chats.length > 0 &&
              chats.map((chat) => <MessageBox key={chat.id} {...chat} />)}
          </div>
          <MessageInput {...messageInputProps} />
        </div>
      </div>
    </Layout>
  );
};

export default ChatRoom;
