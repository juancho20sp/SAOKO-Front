import React, { useContext, useEffect, useState, useCallback } from 'react';

// State management
import { ModalContext } from '../../utils';
import { setNewChatRoom, setChatRooms } from '../../redux/slices/roomSlice';
import { useDispatch, useSelector } from 'react-redux';

// Components
import { Layout, RoomCard, AddRoom, Loader } from '../../components';

import styles from './AllChats.module.scss';

const addRoomClick = (setIsShowing, setModalType, modalOptions) => {
  console.log('Adding room...');
  setIsShowing((isShowing) => !isShowing);
  setModalType(modalOptions.createChat);
};

const AllChats = () => {
  const { setIsShowing, setModalType, modalOptions } = useContext(ModalContext);

  // $
  const [isLoading, setIsLoading] = useState(false);

  const { userId } = useSelector((state) => state.login);
  const { chatRooms } = useSelector((state) => state.room);

  const dispatch = useDispatch();

  const fetchBackendChatRooms = useCallback(async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/room/CHAT/${userId}`;
    const chatRoomsData = await fetch(url);
    const chatRooms = await chatRoomsData.json();

    return chatRooms;
  }, [userId]);

  // $
  useEffect(() => {
    setIsLoading(true);
    fetchBackendChatRooms()
      .then((backendChatRooms) => {
        if (backendChatRooms.length + 1 !== chatRooms.length) {
          const newChatRooms = backendChatRooms.map((room) => {
            const newRoom = {
              id: room.roomID,
              name: room.roomName,
              // $
              // TODO -> once laura finish this `` wont be necessary
              path: `${room.roomCode}`,
              messages: [],
              isConnected: false,
            };

            return newRoom;
          });

          dispatch(setChatRooms(newChatRooms));
        }
      })
      .catch((err) => {
        console.err(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [chatRooms, fetchBackendChatRooms, dispatch]);

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <main className={styles['chats-container']}>
          {chatRooms.map((card) => (
            <RoomCard key={card.id} isChatCard={true} {...card} />
          ))}
          <AddRoom
            handleClick={() =>
              addRoomClick(setIsShowing, setModalType, modalOptions)
            }
          />
        </main>
      )}
    </Layout>
  );
};

export default AllChats;
