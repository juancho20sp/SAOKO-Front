import React from 'react';

// Components
import { Layout } from '../../components';
import { WelcomeMessage } from './components';

const Home = () => {
  return (
    <Layout>
      <WelcomeMessage />
    </Layout>
  );
};

export default Home;
