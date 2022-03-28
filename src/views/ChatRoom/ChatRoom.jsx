import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatRoom.module.scss';

// Routing
import { useLocation } from 'react-router-dom';

// State Management
import { useSelector, useDispatch } from 'react-redux';
import {
  addMessageToChatRoom,
  setConnected,
  CHAT,
} from '../../redux/slices/roomSlice';

// Components
import { MessageInput, MessageBox } from './components';
import { Layout } from '../../components';

// Utils
import { socket } from '../../utils';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

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

var stompClient = null;

/**
 * TODO
 * Assign the room code using the path
 * Send all the messages to the room
 */

const ChatRoom = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const path = pathname.split('/')[2];

  const username = useSelector((state) => state.login.username);
  const isConnected = useSelector(
    (state) =>
      state.room.chatRooms.filter((room) => room.path === path)[0].isConnected
  );
  const allMessages = useSelector(
    (state) =>
      state.room.chatRooms.filter((room) => room.path === path)[0].messages
  );

  // TODO
  // CONSTANTS
  const URL = 'http://localhost:8080/ws';

  // const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [receiverName, setReceiverName] = useState(path);
  // const [username, setUsername] = useState(
  //   `user #${Math.floor(Math.random() * 1000 + 1)}`
  // );
  // const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (username && receiverName && !isConnected) {
      connect();
    }
  }, [username, receiverName]);

  useEffect(() => {
    debugger;
  }, [allMessages]);

  const connect = () => {
    const sock = new SockJS(URL);

    stompClient = over(sock);
    stompClient.connect({}, onConnected, onError);
  };

  const userJoin = () => {
    if (!username) {
      return;
    }

    // $
    debugger;

    if (!isConnected) {
      dispatch(
        setConnected({
          type: CHAT,
          path: path,
          isConnected: true,
        })
      );

      const chatMessage = {
        // TODO -> Exteriorize this
        senderName: 'ADMIN',
        message: `${username} ha entrado al chat`,
        receiverName: receiverName,
        messageStatus: 'JOIN',
      };

      stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
    }
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      const chatMessage = {
        senderName: username,
        receiverName: receiverName,
        message: message,
        messageStatus: 'MESSAGE',
      };

      //$
      debugger;

      stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
      setMessage('');
    }
  };

  // EVENTS
  const onConnected = () => {
    stompClient.subscribe(
      '/user/' + receiverName + '/private',
      onPrivateMessage
    );
    userJoin();
  };

  const onError = (err) => {
    console.log(err);
  };

  const onPrivateMessage = (payload) => {
    console.log(payload);

    const payloadData = JSON.parse(payload.body);
    // $
    debugger;
    dispatch(addMessageToChatRoom(payloadData));
  };

  // -------------------------------------------------------------

  const messageInputProps = {
    message: message,
    setMessage: setMessage,
    sendMessage: sendPrivateValue,
  };

  return (
    <Layout>
      <div className={styles['chatRoom-main']}>
        <div className={styles['chatRoom-container']}>
          <div className={styles['chatRoom-messageContainer']}>
            {
              // allMessages.length > 0 &&
              allMessages.map((message) => (
                <MessageBox key={message.id} {...message} />
              ))
            }
          </div>
          <MessageInput {...messageInputProps} />
        </div>
      </div>
    </Layout>
  );
};

export default ChatRoom;
