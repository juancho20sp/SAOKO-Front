import React from 'react';
import styles from './ColumnContainer.module.scss';

const ColumnContainer = ({ title, children }) => {
  return (
    <div className={styles['boardRoom-columnContainer']}>
      <h2 className={styles['boardRoom-column_title']}>{title}</h2>
      {children}
    </div>
  );
};

export default ColumnContainer;
