import React from 'react';
import styles from './Navbar.module.scss';

// Routes
import { routes } from '../../utils/';

// Components
import { BsChatDots } from 'react-icons/bs';
import { MdDashboard, MdLogout } from 'react-icons/md';
import { NavbarIcon } from './components';

// Redux
import { useDispatch } from 'react-redux';
import { logout as reduxLogout } from '../../redux/slices/loginSlice';

// Hooks
import { useAccount } from '../../utils/hooks';

const Navbar = () => {
  const dispatch = useDispatch();
  const { logout } = useAccount();

  const handleLogout = () => {
    logout();
    dispatch(reduxLogout());
  };

  return (
    <aside className={styles['aside-main']}>
      <nav className={styles['aside-nav']}>
        <ul className={styles['aside-iconList']}>
          <div>
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
          </div>

          <NavbarIcon
            icon={MdLogout}
            text={`Cerrar Sesión`}
            path={routes.login.path}
            onClickFunction={handleLogout}
          ></NavbarIcon>
        </ul>
      </nav>
    </aside>
  );
};

export default Navbar;
