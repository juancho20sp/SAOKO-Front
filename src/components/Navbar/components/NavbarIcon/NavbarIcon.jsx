import React from 'react';
import styles from './NavbarIcon.module.scss';

// Router
import { NavLink } from 'react-router-dom';

// Components
import { IconContext } from 'react-icons';

const NavbarIcon = ({ text, icon, path, onClickFunction }) => {
  return (
    <IconContext.Provider value={{ size: '2.3rem' }}>
      <NavLink to={path}>
        <li className={styles['navbarIcon-main']} onClick={onClickFunction}>
          {icon()}

          <p className={styles['navbarIcon-text']}>{text}</p>
        </li>
      </NavLink>
    </IconContext.Provider>
  );
};

export default NavbarIcon;
