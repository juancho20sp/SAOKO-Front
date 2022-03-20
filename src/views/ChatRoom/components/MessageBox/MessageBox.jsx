import React from 'react';
import styles from './MessageBox.module.scss';

const MessageBox = ({ messageSent, sender, time, text }) => {
  return (
    <div
      className={styles['messageBox-container']}
      style={{
        marginLeft: messageSent ? 'auto' : '',
        backgroundColor: messageSent ? '#FDE2FF' : '#D7BCE8',
      }}
    >
      <div className={styles['messageBox-info']}>
        {/* Validate if the message is sent by the current user */}
        {messageSent && <p className={styles['messageBox-sender']}>{sender}</p>}
        <p className={styles['messageBox-time']}>{time}</p>
      </div>

      <p className={styles['messageBox-text']}>{text}</p>
    </div>
  );
};

export default MessageBox;
