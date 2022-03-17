import React from 'react';
import styles from './Home.module.scss';

// Components
import { Layout } from '../../components';
import { WelcomeMessage } from './components';

// TODO -> if there are no rooms -> show the message
// TODO -> if there are rooms -> go to chats (or the option that has a room)
const Home = () => {
  return (
    <Layout>
      <WelcomeMessage />
    </Layout>
  );
};

export default Home;
