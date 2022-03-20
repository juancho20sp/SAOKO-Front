import React from 'react';
import styles from './ChatRoom.module.scss';

// Components
import { MessageInput, MessageBox } from './components';
import { Layout } from '../../components';

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
  return (
    <Layout>
      <div className={styles['chatRoom-main']}>
        <div className={styles['chatRoom-container']}>
          <div className={styles['chatRoom-messageContainer']}>
            {chats.length > 0 &&
              chats.map((chat) => <MessageBox key={chat.id} {...chat} />)}
          </div>
          <MessageInput />
        </div>
      </div>
    </Layout>
  );
};

export default ChatRoom;
