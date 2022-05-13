import React from 'react';
import styles from './RoomCode.module.scss';

// Redux
import { useSelector } from 'react-redux';

const RoomCode = () => {
  const code = useSelector((state) => state.room.createdCode);

  return <p className={styles['roomCode-main']}>{code}</p>;
};

export default RoomCode;
