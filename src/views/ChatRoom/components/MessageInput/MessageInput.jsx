import React from 'react';
import styles from './MessageInput.module.scss';

// Components
import { IconContext } from 'react-icons';
import { AiOutlineSend } from 'react-icons/ai';

const MessageInput = () => {
  return (
    <div className={styles['messageInput-container']}>
      <input
        className={styles['messageInput-input']}
        type='text'
        placeholder='Escribe un mensaje nuevo'
      />

      <div className={styles['messageInput-icon']}>
        <IconContext.Provider value={{ size: '2.5rem' }}>
          <AiOutlineSend />
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default MessageInput;
