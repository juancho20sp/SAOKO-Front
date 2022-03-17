import React from 'react';
import styles from './RoomCard.module.scss';

// Components
import { IconContext } from 'react-icons';
import { BsChatLeftDots } from 'react-icons/bs';

const RoomCard = ({ icon, text, path }) => {
  return (
    <div
      className={styles['roomCard-container']}
      //   onClick={() => handleClick(navigate)}
    >
      <IconContext.Provider value={{ size: '3.5rem' }}>
        <BsChatLeftDots />
      </IconContext.Provider>

      <p className={styles['roomCard-name']}>Chat 1</p>
    </div>
  );
};

export default RoomCard;
