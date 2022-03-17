import React from 'react';
import styles from './Modal.module.scss';

// Constants
import { modalOptions, modalOptionTypes } from '../../utils/modal/modal';

// Components
import { Button, RoomCode, Input } from './components';

const useModalType = (type, setModalType, setIsShowing) => {
  const handleCloseModal = () => {
    setIsShowing((isShowing) => !isShowing);
  };

  switch (type) {
    case modalOptions.createChat:
      const handleCreateChat = () => {
        setModalType(modalOptions.shareChat);
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
  const [title, firstRow, secondRow] = useModalType(
    type,
    setModalType,
    setIsShowing
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
