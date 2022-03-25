import React from 'react';
import styles from './MessageBox.module.scss';

const MessageBox = ({ messageSent, senderName, time, message }) => {
  return (
    <div
      className={styles['messageBox-container']}
      style={{
        marginLeft: messageSent ? 'auto' : '',
        backgroundColor:
          senderName === 'ADMIN'
            ? '#8884FF'
            : messageSent
            ? '#FDE2FF'
            : '#D7BCE8',

        // ADMIN MESSAGES
        width: senderName === 'ADMIN' ? '100%' : '',
        minHeight: senderName === 'ADMIN' ? 'auto' : '',
        textAlign: senderName === 'ADMIN' ? 'center' : '',
      }}
    >
      <div className={styles['messageBox-info']}>
        {/* Validate if the message is sent by the current user */}
        {messageSent && (
          <p className={styles['messageBox-username']}>{senderName}</p>
        )}
        <p className={styles['messageBox-time']}>{time}</p>
      </div>

      <p className={styles['messageBox-message']}>{message}</p>
    </div>
  );
};

export default React.memo(MessageBox);
