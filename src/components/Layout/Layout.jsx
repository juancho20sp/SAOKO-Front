import React from 'react';

import styles from './Layout.module.scss';

// Router
// import { routes } from '../../utils/routes/routes';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// // Components
import { Navbar, Banner, ProtectedRoute, Chats } from '../';
// import { WelcomeMessage } from './components';

const Layout = ({ children }) => {
  return (
    <main className={styles['layout-main']}>
      <Navbar />

      <div className={styles['layout-container']}>
        <Banner />
        {/* ROUTER AQUÍ */}
        {/* <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route exact path={routes.chats.path} element={<Chats />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
        <Route></Route> */}
        {/* <WelcomeMessage /> */}
        {children}
      </div>
    </main>
  );
};

export default Layout;
