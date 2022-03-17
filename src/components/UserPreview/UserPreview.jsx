import React from 'react';

// Router
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

  return (
    <div
      className={styles['userModule-container']}
      onClick={() => handleClick(navigate)}
    >
      <p className={styles['userModule-username']}>Diego triviño</p>

      <IconContext.Provider value={{ size: '2.4rem' }}>
        <BiUserCircle />
      </IconContext.Provider>
    </div>
  );
};

export default UserPreview;
