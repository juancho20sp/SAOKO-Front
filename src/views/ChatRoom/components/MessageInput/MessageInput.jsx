import React from 'react';
import styles from './MessageInput.module.scss';

// Components
import { IconContext } from 'react-icons';
import { AiOutlineSend } from 'react-icons/ai';

const MessageInput = ({ message, setMessage, sendMessage }) => {
  return (
    <form className={styles['messageInput-container']}>
      <input
        className={styles['messageInput-input']}
        type='text'
        placeholder='Escribe un mensaje nuevo'
        value={message}
        onChange={(ev) => setMessage(ev.target.value)}
      />

      <div className={styles['messageInput-icon']}>
        <IconContext.Provider value={{ size: '2.5rem' }}>
          <AiOutlineSend onClick={sendMessage} />
        </IconContext.Provider>
      </div>
    </form>
  );
};

export default MessageInput;
