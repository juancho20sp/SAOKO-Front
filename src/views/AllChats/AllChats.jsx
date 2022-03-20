import React, { useContext, useEffect, useState } from 'react';

// State management
import { ModalContext } from '../../utils';
import { useSelector } from 'react-redux';

// Components
import { Layout, RoomCard, AddRoom } from '../../components';

import styles from './AllChats.module.scss';

const myCards = [
  {
    id: 0,
    name: 'Chat 1',
    path: 'chat-one',
  },
  {
    id: 1,
    name: 'Chat 2',
    path: 'chat-two',
  },
  {
    id: 2,
    name: 'Chat 3',
    path: 'chat-three',
  },
];

const addRoomClick = (setIsShowing, setModalType, modalOptions) => {
  console.log('Adding room...');
  setIsShowing((isShowing) => !isShowing);
  setModalType(modalOptions.createChat);
};

const AllChats = () => {
  // Redux
  const globalState = useSelector((state) => state);

  useEffect(() => {
    console.log(globalState);
  }, [globalState]);

  const { setIsShowing, setModalType, modalOptions } = useContext(ModalContext);

  // Cards
  const [cards, setCards] = useState(myCards);

  return (
    <Layout>
      <main className={styles['chats-container']}>
        {cards.map((card) => (
          <RoomCard key={card.id} {...card} />
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
