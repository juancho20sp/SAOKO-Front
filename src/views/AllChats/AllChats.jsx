import React, { useContext, useEffect, useState } from 'react';

// State management
import { ModalContext } from '../../utils';
import { useSelector } from 'react-redux';

// Components
import { Layout, RoomCard, AddRoom } from '../../components';

import styles from './AllChats.module.scss';

const addRoomClick = (setIsShowing, setModalType, modalOptions) => {
  console.log('Adding room...');
  setIsShowing((isShowing) => !isShowing);
  setModalType(modalOptions.createChat);
};

const AllChats = () => {
  // Cards
  const cards = useSelector((state) => state.room.chatRooms);

  const { setIsShowing, setModalType, modalOptions } = useContext(ModalContext);

  return (
    <Layout>
      <main className={styles['chats-container']}>
        {cards.map((card) => (
          <RoomCard key={card.id} isChatCard={true} {...card} />
        ))}
        <AddRoom
          handleClick={() =>
            addRoomClick(setIsShowing, setModalType, modalOptions)
          }
        />
      </main>
    </Layout>
  );
};

export default AllChats;
