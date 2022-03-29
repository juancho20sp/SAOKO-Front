import React from 'react';

// State management
import { useSelector } from 'react-redux';

// Navigation
import { routes } from '../../utils/';
import { useNavigate } from 'react-router-dom';

// Icons
import { IconContext } from 'react-icons';
import { BiUserCircle } from 'react-icons/bi';

import styles from './UserPreview.module.scss';

const handleClick = (navigate) => {
  navigate(routes.profile.path);
};

const UserPreview = () => {
  const navigate = useNavigate();

  // Redux
  const username = useSelector((state) => state.login.username);

  return (
    <div
      className={styles['userModule-container']}
      onClick={() => handleClick(navigate)}
    >
      <p className={styles['userModule-username']}>{username}</p>

      <IconContext.Provider value={{ size: '2.4rem' }}>
        <BiUserCircle />
      </IconContext.Provider>
    </div>
  );
};

export default UserPreview;
