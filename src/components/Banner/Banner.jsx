import React from 'react';
import styles from './Banner.module.scss';

// Components
import { UserPreview } from '../';

const Banner = () => {
  return (
    <div className={styles['banner-main']}>
      <h3 className={styles['banner-title']}>Saoko</h3>
      <UserPreview />
    </div>
  );
};

export default Banner;
