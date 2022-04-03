import React from 'react';

// Components
import BounceLoader from 'react-spinners/BounceLoader';

import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles['loader-container']}>
      <BounceLoader color={'#8884FF'} size={150} />
    </div>
  );
};

export default Loader;
