import React from 'react';
import styles from './RoomCard.module.scss';

// Router
import { routes } from '../../utils';
import { useNavigate } from 'react-router-dom';

// Components
import { IconContext } from 'react-icons';
import { BsChatLeftDots } from 'react-icons/bs';

const RoomCard = ({ id, name, path, isChatCard }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles['roomCard-container']}
      onClick={() =>
        navigate(`${isChatCard ? routes.chats.path : routes.boards.path}/${id}`)
      }
    >
      <IconContext.Provider value={{ size: '3.5rem' }}>
        <BsChatLeftDots />
      </IconContext.Provider>

      <p className={styles['roomCard-name']}>{name}</p>
    </div>
  );
};

export default RoomCard;
