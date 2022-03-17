import React from 'react';
import styles from './NavbarIcon.module.scss';

// Router
import { NavLink } from 'react-router-dom';

// Components
import { IconContext } from 'react-icons';

const NavbarIcon = ({ text, icon, path }) => {
  return (
    <IconContext.Provider value={{ size: '2.3rem' }}>
      <li className={styles['navbarIcon-main']}>
        <NavLink to={path}>
          {icon()}

          <p className={styles['navbarIcon-text']}>{text}</p>
        </NavLink>
      </li>
    </IconContext.Provider>
  );
};

export default NavbarIcon;
