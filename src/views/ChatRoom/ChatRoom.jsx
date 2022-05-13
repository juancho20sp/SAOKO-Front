import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatRoom.module.scss';

// State Management
import { useSelector, useDispatch } from 'react-redux';
import {
  addMessageToChatRoom,
  setConnected,
  CHAT,
} from '../../redux/slices/roomSlice';

// Components
import { MessageInput, MessageBox } from './components';
import { Layout, Loader } from '../../components';

// Utils
import { v4 as uuidv4 } from 'uuid';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

// Hooks
import { useRoomPath } from '../../utils/hooks';

var stompClient = null;

const useChatRoomProps = ({ path }) => {
  const { name, family_name } = useSelector((state) => state.login.userData);
  const isConnected = useSelector(
    (state) =>
      state.room.chatRooms.filter((room) => room.path === path)[0].isConnected
  );
  const allMessages = useSelector(
    (state) =>
      state.room.chatRooms.filter((room) => room.path === path)[0].messages
  );

  const username = `${name} ${family_name}`;

  return {
    username,
    isConnected,
    allMessages,
  };
};

const useChatRoomConstants = () => {
  const ADMIN = 'ADMIN';

  const URL = process.env.REACT_APP_REALTIME_URL;

  const status = {
    JOIN: 'JOIN',
    MESSAGE: 'MESSAGE',
    LEAVE: 'LEAVE',
  };

  return {
    ADMIN,
    URL,
    status,
  };
};

const useChatRoomEvents = ({
  receiverName,
  username,
  userJoin,
  setIsLoading,
}) => {
  const dispatch = useDispatch();

  const onConnected = () => {
    stompClient.subscribe(
      '/user/' + receiverName + '/private',
      onPrivateMessage
    );
    userJoin();
    setIsLoading(false);
  };

  const onError = (err) => {
    console.log(err);
  };

  const onPrivateMessage = (payload) => {
    console.log(payload);

    const payloadData = JSON.parse(payload.body);

    // Value added in order to see if its a message sent or received
    const messageSent = payloadData.senderName === username;

    payloadData.messageSent = messageSent;

    dispatch(addMessageToChatRoom(payloadData));
  };

  return {
    onConnected,
    onError,
    onPrivateMessage,
  };
};

const useChatRoomLogic = ({
  receiverName,
  username,
  isConnected,
  path,
  setIsLoading,
}) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const { ADMIN, URL, status } = useChatRoomConstants();

  const { onConnected, onError } = useChatRoomEvents({
    receiverName,
    userJoin,
    username,
    setIsLoading,
  });

  const connect = () => {
    const sock = new SockJS(URL);

    stompClient = over(sock);
    stompClient.connect({}, onConnected, onError);
  };

  const createMessage = ({ senderName, message, messageStatus }) => {
    const date = new Date();

    return {
      id: uuidv4(),
      senderName,
      message,
      receiverName,
      messageStatus,
      date: `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}`,
    };
  };

  function userJoin() {
    if (!username) {
      return;
    }

    if (!isConnected) {
      dispatch(
        setConnected({
          type: CHAT,
          path: path,
          isConnected: true,
        })
      );

      const message = createMessage({
        message: `${username} ha entrado al chat`,
        messageStatus: status.JOIN,
        senderName: ADMIN,
      });

      stompClient.send('/app/private-message', {}, JSON.stringify(message));
    }
  }

  const sendMessage = () => {
    if (stompClient) {
      const newMessage = createMessage({
        message,
        messageStatus: status.MESSAGE,
        senderName: username,
      });

      stompClient.send('/app/private-message', {}, JSON.stringify(newMessage));
      setMessage('');
    }
  };

  return {
    connect,
    createMessage,
    userJoin,
    sendMessage,
    message,
    setMessage,
  };
};

const useAutoScroll = () => {
  const lastMessageRef = useRef(null);
  useEffect(() => {
    lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  return {
    lastMessageRef,
  };
};

const ChatRoom = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { path } = useRoomPath();

  const { username, isConnected, allMessages } = useChatRoomProps({ path });

  const [receiverName] = useState(path);

  const { connect, message, setMessage, sendMessage } = useChatRoomLogic({
    isConnected,
    path,
    receiverName,
    username,
    setIsLoading,
  });

  const { lastMessageRef } = useAutoScroll();

  useEffect(() => {
    // $
    debugger;
    if (username && receiverName && !isConnected) {
      setIsLoading(true);
      connect();
    }
  }, [username, receiverName, isConnected]);

  const messageInputProps = {
    message,
    setMessage,
    sendMessage,
  };

  return (
    <Layout>
      {isLoading ? (
        <>
          <Loader />
          <div ref={lastMessageRef}></div>
        </>
      ) : (
        <div className={styles['chatRoom-main']}>
          <div className={styles['chatRoom-container']}>
            <div className={styles['chatRoom-messageContainer']}>
              {allMessages.map((message) => (
                <MessageBox key={message.id} {...message} />
              ))}

              <div ref={lastMessageRef}></div>
            </div>
            <MessageInput {...messageInputProps} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ChatRoom;
