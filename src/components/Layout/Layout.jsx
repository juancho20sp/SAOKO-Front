import React from 'react';
import styles from './Layout.module.scss';

// Components
import { Navbar, Banner } from '../';

const Layout = ({ children }) => {
  return (
    <main className={styles['layout-main']}>
      <Navbar />

      <div className={styles['layout-container']}>
        <Banner />
        <div className={styles['layout-container__content']}>{children}</div>
      </div>
    </main>
  );
};

export default Layout;
