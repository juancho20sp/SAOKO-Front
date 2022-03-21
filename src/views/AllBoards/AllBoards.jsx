import React, { useContext } from 'react';
import styles from './AllBoards.module.scss';

// State management
import { ModalContext } from '../../utils';
import { useSelector } from 'react-redux';

// Components
import { Layout, RoomCard, AddRoom } from '../../components';

const addRoomClick = (setIsShowing, setModalType, modalOptions) => {
  console.log('Adding room...');
  setIsShowing((isShowing) => !isShowing);
  setModalType(modalOptions.createBoard);
};

const AllBoards = () => {
  // Cards
  const cards = useSelector((state) => state.room.boardRooms);

  const { setIsShowing, setModalType, modalOptions } = useContext(ModalContext);

  return (
    <Layout>
      <main className={styles['boards-container']}>
        {cards.map((card) => (
          <RoomCard key={card.id} isChatCard={false} {...card} />
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

export default AllBoards;
