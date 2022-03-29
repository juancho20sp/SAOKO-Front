import React from 'react';
import styles from './MessageBox.module.scss';

const MessageBox = ({ messageSent, senderName, date, message }) => {
  const ADMIN = 'ADMIN';

  return (
    <div
      className={styles['messageBox-container']}
      style={{
        backgroundColor:
          senderName === ADMIN
            ? '#8884FF'
            : messageSent
            ? '#FDE2FF'
            : '#D7BCE8',

        // ADMIN MESSAGES
        width: senderName === ADMIN ? '95%' : '',
        margin: senderName === ADMIN ? '15px auto' : '',
        minHeight: senderName === ADMIN ? 'auto' : '',
        textAlign: senderName === ADMIN ? 'center' : '',
        marginLeft: senderName !== ADMIN && messageSent ? 'auto' : '',
      }}
    >
      <div className={styles['messageBox-info']}>
        {/* Validate if the message is sent by the current user */}
        {!messageSent && senderName !== ADMIN && (
          <p className={styles['messageBox-username']}>{senderName}</p>
        )}
        <p className={styles['messageBox-time']}>{date}</p>
      </div>

      <p className={styles['messageBox-message']}>{message}</p>
    </div>
  );
};

export default React.memo(MessageBox);
