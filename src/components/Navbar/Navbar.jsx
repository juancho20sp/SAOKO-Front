import React from 'react';
import styles from './Navbar.module.scss';

// Routes
import { routes } from '../../utils/';

// Components
import { BsChatDots } from 'react-icons/bs';
import { MdDashboard } from 'react-icons/md';
import { NavbarIcon } from './components';

const Navbar = () => {
  return (
    <aside className={styles['aside-main']}>
      <nav>
        <ul>
          <NavbarIcon
            icon={BsChatDots}
            text={`Chats`}
            path={routes.chats.path}
          />
          <NavbarIcon
            icon={MdDashboard}
            text={`Tableros`}
            path={routes.boards.path}
          />
        </ul>
      </nav>
    </aside>
  );
};

export default Navbar;
