import React from 'react';
import styles from './Modal.module.scss';

// Constants
import { modalOptions } from '../../utils/modal/modal';

// Components
import { Button, RoomCode, Input } from './components';

// State Management
import { useDispatch, useSelector } from 'react-redux';
import { setNewChatRoom, setNewBoardRoom } from '../../redux/slices/roomSlice';

// Utils
import { v4 as uuidv4 } from 'uuid';
import { post } from '../../utils';

const useModalType = (type, setModalType, setIsShowing, dispatch) => {
  // $
  const { userId } = useSelector((state) => state.login);

  const handleCloseModal = () => {
    setIsShowing((isShowing) => !isShowing);
  };

  switch (type) {
    case modalOptions.createChat:
      const handleCreateChat = async () => {
        // $
        // const realID = uuidv4();
        // const realPath = [...realID].splice(0, 8).join('').toUpperCase()
        const tempId = Math.floor(100000000 + Math.random() * 900000000);

        const url = `${process.env.REACT_APP_BACKEND_URL}/room`;

        const data = {
          roomID: tempId,
          roomName: 'New chat',
          roomType: 'CHAT',
          userId: userId,
          roomCode: tempId,
        };

        // TODO
        // Corregir el télefono en el usuario y al momento de crear usuario
        // Verificar las salas
        // Agregar la ultima sala al redux para usar el código en el modal

        try {
          const newRoomData = await post(url, data);

          debugger;

          dispatch(setNewChatRoom(newRoomData));

          setModalType(modalOptions.shareChat);
        } catch (err) {
          console.error(err);
        }
      };

      const handleUseChatCode = () => {
        setModalType(modalOptions.enterChat);
      };

      return [
        modalOptions.createChat.title,
        <Button
          title={modalOptions.createChat.firstRow.title}
          handleClick={handleCreateChat}
        />,
        <Button
          title={modalOptions.createChat.secondRow.title}
          handleClick={handleUseChatCode}
        />,
      ];

    case modalOptions.shareChat:
      return [
        modalOptions.shareChat.title,
        <RoomCode />,
        <Button
          title={modalOptions.shareChat.secondRow.title}
          handleClick={handleCloseModal}
        />,
      ];

    case modalOptions.enterChat:
      return [
        modalOptions.enterChat.title,
        <Input />,
        <div className={styles['modal-row_inputActions']}>
          <Button
            title={modalOptions.enterChat.secondRow.firstOption.title}
            handleClick={handleCloseModal}
          />
          <Button title={modalOptions.enterChat.secondRow.secondOption.title} />
        </div>,
      ];

    // ----
    case modalOptions.createBoard:
      const handleCreateBoard = () => {
        setModalType(modalOptions.shareBoard);

        // $
        // TODO -> ADD LOGIC FOR CREATING A NEW ROOM
        const newRoom = {
          id: Math.floor(100000000 + Math.random() * 900000000),
          name: 'Board',
          path: [...uuidv4()].splice(0, 8).join('').toUpperCase(),
          columns: {
            TO_DO: {
              name: 'To Do',
              items: [],
            },
            IN_PROGRESS: {
              name: 'In Progress',
              items: [],
            },
            DONE: {
              name: 'Done',
              items: [],
            },
          },
          isConnected: false,
        };

        dispatch(setNewBoardRoom(newRoom));
      };

      const handleUseBoardCode = () => {
        setModalType(modalOptions.enterBoard);
      };

      return [
        modalOptions.createBoard.title,
        <Button
          title={modalOptions.createBoard.firstRow.title}
          handleClick={handleCreateBoard}
        />,
        <Button
          title={modalOptions.createBoard.secondRow.title}
          handleClick={handleUseBoardCode}
        />,
      ];

    case modalOptions.shareBoard:
      return [
        modalOptions.shareBoard.title,
        <RoomCode />,
        <Button
          title={modalOptions.shareBoard.secondRow.title}
          handleClick={handleCloseModal}
        />,
      ];

    case modalOptions.enterBoard:
      return [
        modalOptions.enterBoard.title,
        <Input />,
        <div className={styles['modal-row_inputActions']}>
          <Button
            title={modalOptions.enterBoard.secondRow.firstOption.title}
            handleClick={handleCloseModal}
          />
          <Button
            title={modalOptions.enterBoard.secondRow.secondOption.title}
          />
        </div>,
      ];
    default:
      return null;
  }
};

/**
 *
 * @param {Boolean} isShowing -> True if the modal is showing, false otherwise
 * @param {modalOptions} type -> The type of the displayed modal.
 * @param {String} code -> The code of the room.
 * @param {Function} setModalType -> The function that allows to change the modal type, setted on App.jsx
 * @param {Function} setIsShowing -> The function that allows to change the visibility of the modal, setted on App.jsx
 * @returns
 */
const Modal = ({ isShowing, type, code, setModalType, setIsShowing }) => {
  // Redux
  const dispatch = useDispatch();

  const [title, firstRow, secondRow] = useModalType(
    type,
    setModalType,
    setIsShowing,
    dispatch
  );

  if (!isShowing) {
    return null;
  }

  return (
    <div
      className={styles['modal-overlay']}
      onClick={() => setIsShowing((isShowing) => !isShowing)}
    >
      <div
        className={styles['modal-main']}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles['modal-container']}>
          <h2 className={styles['modal-title']}>{title}</h2>
          <div className={styles['modal-row']}>{firstRow}</div>
          <div className={styles['modal-row']}>{secondRow}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
